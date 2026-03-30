"use client";

import { useState } from "react";
import { useRental } from "../context/RentalContext";
import { X, CheckCircle, Loader2, Send, Phone, Mail, User, ShieldCheck, Building2, MapPin, Navigation } from "lucide-react";
import { format } from "date-fns";

export default function CheckoutModal() {
  const { 
    isCheckoutModalOpen, 
    setIsCheckoutModalOpen,
    cartItems,
    totalDays,
    deliveryDate,
    pickupDate,
    clearCart
  } = useRental();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    location: "",
    notes: ""
  });

  const [isLocating, setIsLocating] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  if (!isCheckoutModalOpen) return null;

  const handleGetLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Reverse geocoding using a free Nominatim API to get human-readable location
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=10`);
            const data = await res.json();
            const city = data.address?.city || data.address?.town || data.address?.county || "Current Location";
            setFormData(prev => ({ ...prev, location: city }));
          } catch (err) {
            console.error("Geocoding failed", err);
            setFormData(prev => ({ ...prev, location: `${position.coords.latitude}, ${position.coords.longitude}` }));
          } finally {
            setIsLocating(false);
          }
        },
        (error) => {
          console.error("Location error", error);
          alert("Could not get location. Please allow location access or type it manually.");
          setIsLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setIsLocating(false);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const itemTotal = totalDays > 0 ? (item.price * totalDays) : item.price;
    return acc + (itemTotal * item.quantity);
  }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: formData,
          cart: cartItems.map(i => ({ name: i.name, quantity: i.quantity, id: i.id })),
          total: subtotal.toFixed(2),
          dates: {
            start: deliveryDate ? format(deliveryDate, "yyyy-MM-dd") : "Not set",
            end: pickupDate ? format(pickupDate, "yyyy-MM-dd") : "Not set"
          }
        })
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setTimeout(() => {
          clearCart();
          setIsCheckoutModalOpen(false);
          setStatus("idle");
          setFormData({ name: "", email: "", phone: "", company: "", address: "", location: "", notes: "" });
        }, 5000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => status !== "loading" && setIsCheckoutModalOpen(false)}></div>
      
      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Success State */}
        {status === "success" ? (
          <div className="p-12 text-center flex flex-col items-center justify-center h-full animate-in fade-in zoom-in duration-300">
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 drop-shadow-sm">
               <CheckCircle className="w-10 h-10" />
             </div>
             <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Booking Request Sent!</h2>
             <p className="text-slate-600 text-lg font-medium max-w-md mx-auto leading-relaxed">
               Thank you, <span className="font-bold text-blue-600">{formData.name}</span>. Your request has been dispatched to our logistics team. We will call you within 30 minutes to confirm your setup.
             </p>
             <div className="mt-8 pt-8 border-t border-slate-100 italic text-slate-400 text-sm">
               Auto-closing in 5 seconds...
             </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-slate-900 px-8 py-8 text-white relative">
              <button 
                onClick={() => setIsCheckoutModalOpen(false)} 
                className="absolute top-6 right-6 w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <ShieldCheck className="w-7 h-7 text-white" />
                </div>
                <div>
                   <h2 className="text-2xl font-black uppercase tracking-tight leading-none">Confirm Booking</h2>
                   <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mt-1">Finalize your hardware request</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid sm:grid-cols-2 gap-6">
                   {/* Name */}
                   <div className="space-y-2">
                     <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                       <User className="w-3 h-3" /> Full Name
                     </label>
                     <input 
                       required
                       type="text"
                       placeholder="e.g., Rajesh Malhotra"
                       value={formData.name}
                       onChange={(e) => setFormData({...formData, name: e.target.value})}
                       className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-800 shadow-sm"
                     />
                   </div>

                   {/* Phone */}
                   <div className="space-y-2">
                     <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                       <Phone className="w-3 h-3" /> Contact Phone
                     </label>
                     <input 
                       required
                       type="tel"
                       placeholder="022-XXXXXXX / +91XXXXX"
                       value={formData.phone}
                       onChange={(e) => setFormData({...formData, phone: e.target.value})}
                       className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-800 shadow-sm"
                     />
                   </div>
                </div>

                {/* Email and Company */}
                <div className="grid sm:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                       <Mail className="w-3 h-3" /> Email Address
                     </label>
                     <input 
                       required
                       type="email"
                       placeholder="name@example.com"
                       value={formData.email}
                       onChange={(e) => setFormData({...formData, email: e.target.value})}
                       className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-800 shadow-sm"
                     />
                   </div>
                   
                   <div className="space-y-2">
                     <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                       <Building2 className="w-3 h-3" /> Company Name
                     </label>
                     <input 
                       required
                       type="text"
                       placeholder="Company or Event Name"
                       value={formData.company}
                       onChange={(e) => setFormData({...formData, company: e.target.value})}
                       className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-800 shadow-sm"
                     />
                   </div>
                </div>

                {/* Location Tool */}
                <div className="space-y-2">
                   <div className="flex items-center justify-between">
                     <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                       <Navigation className="w-3 h-3" /> Current Location / City
                     </label>
                     <button 
                       type="button" 
                       onClick={handleGetLocation}
                       disabled={isLocating}
                       className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors disabled:opacity-50"
                     >
                       <MapPin className="w-3 h-3" />
                       {isLocating ? "Locating..." : "Auto-Detect Location"}
                     </button>
                   </div>
                   <input 
                     required
                     type="text"
                     placeholder="Mumbai, Bangalore, etc."
                     value={formData.location}
                     onChange={(e) => setFormData({...formData, location: e.target.value})}
                     className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-800 shadow-sm"
                   />
                </div>

                {/* Address */}
                <div className="space-y-2">
                   <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                     <MapPin className="w-3 h-3" /> Complete Delivery Address
                   </label>
                   <textarea 
                     required
                     rows="2"
                     placeholder="Venue address, studio number, or site location..."
                     value={formData.address}
                     onChange={(e) => setFormData({...formData, address: e.target.value})}
                     className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-800 text-sm shadow-sm"
                   />
                </div>

                {/* Notes */}
                <div className="space-y-2">
                   <label className="text-xs font-black uppercase tracking-widest text-slate-500">Delivery Notes (Optional)</label>
                   <textarea 
                     rows="3"
                     placeholder="Specific entry instructions, event name, or building details..."
                     value={formData.notes}
                     onChange={(e) => setFormData({...formData, notes: e.target.value})}
                     className="w-full bg-white border border-slate-200 px-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-800 text-sm shadow-sm"
                   />
                </div>

                {/* Order Preview Summary */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                   <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-100 pb-2">Order Request Preview</h3>
                   <div className="flex justify-between items-center">
                      <div>
                         <span className="block font-black text-slate-800 text-lg">Loadout Summary</span>
                         <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                           {cartItems.length} Bundles • {totalDays} Continuous Days
                         </span>
                      </div>
                      <div className="text-right">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Grand Total:</span>
                         <span className="text-2xl font-black text-slate-900">₹{subtotal.toFixed(2)}</span>
                      </div>
                   </div>
                </div>
              </form>
            </div>

            {/* Sticky Footer */}
            <div className="p-6 bg-white border-t border-slate-200 flex gap-4">
               <button 
                  type="button"
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black uppercase tracking-widest text-sm rounded-xl transition-all"
               >
                 Cancel
               </button>
               <button 
                  form="checkout-form"
                  disabled={status === "loading" || !formData.name || !formData.phone || !formData.email}
                  className={`flex-[2] py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-md flex items-center justify-center gap-2
                    ${status === "loading" ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30'}`}
               >
                 {status === "loading" ? (
                   <>Processing <Loader2 className="w-4 h-4 animate-spin" /></>
                 ) : (
                   <>Confirm & Dispatch Request <Send className="w-4 h-4 ml-1" /></>
                 )}
               </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

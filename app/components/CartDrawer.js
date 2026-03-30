"use client";

import { useRental } from "../context/RentalContext";
import Image from "next/image";

const SUGGESTED_ACCESSORIES = [
  {
    id: "cs-earpiece",
    name: "Covert Earpiece V2",
    price: 3.50,
    imageUrl: "/scout-walkie.png"
  },
  {
    id: "cs-speaker-mic",
    name: "Heavy Duty Speaker Mic",
    price: 5.00,
    imageUrl: "/hero-walkie.png"
  }
];

export default function CartDrawer() {
  const { 
    isCartOpen, setIsCartOpen, 
    isCheckoutModalOpen, setIsCheckoutModalOpen,
    cartItems, updateQuantity, setQuantity, removeFromCart, addToCart,
    totalDays 
  } = useRental();

  // Calculate Subtotal
  const subtotal = cartItems.reduce((acc, item) => {
    const itemTotal = totalDays > 0 ? (item.price * totalDays) : item.price;
    return acc + (itemTotal * item.quantity);
  }, 0);

  // Filter out accessories that are already in the cart so we don't double pitch them
  const availableAccessories = SUGGESTED_ACCESSORIES.filter(
    acc => !cartItems.some(item => item.id === acc.id)
  );

  return (
    <>
      {/* Backdrop (Blur overlay) */}
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-out Drawer Panel */}
      <div className={`fixed right-0 top-0 h-full w-full sm:w-[500px] bg-white shadow-2xl z-[110] transform transition-transform duration-500 ease-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shadow-inner">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
             </div>
             <div>
               <h2 className="text-xl font-black uppercase tracking-widest text-slate-900 leading-none">Your Loadout</h2>
               <span className="text-xs font-bold text-slate-500 uppercase">{cartItems.length} Equipment Bundles</span>
             </div>
          </div>
          
          <button 
            onClick={() => setIsCartOpen(false)} 
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 space-y-8 bg-slate-50">
          
          {/* Cart Items List */}
          {cartItems.length === 0 ? (
            <div className="text-center py-16 px-4">
               <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                 <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
               </div>
               <h3 className="text-xl font-black text-slate-800 mb-2">No hardware secured yet.</h3>
               <p className="text-slate-500 text-sm font-medium">Head back to the catalog to build your communications loadout.</p>
               <button onClick={() => setIsCartOpen(false)} className="mt-8 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-slate-800 transition-colors">
                 Resume Shopping
               </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white border border-slate-200 p-4 rounded-2xl flex gap-4 shadow-sm relative group">
                  {/* Remove Button (Hover) */}
                  <button onClick={() => removeFromCart(item.id)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600 z-10">
                     <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>

                  <div className="w-20 h-20 rounded-xl bg-white flex items-center justify-center overflow-hidden shrink-0 border border-slate-200 shadow-inner">
                    <Image src={item.imageUrl || item.image} alt={item.name} width={80} height={80} className="w-full h-full object-contain p-2" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                     <div>
                        <h4 className="font-extrabold text-slate-900 text-sm leading-tight">{item.name}</h4>
                        <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                          {totalDays > 0 ? `${totalDays} Days Locked` : `₹${item.price.toFixed(2)} / Day`}
                        </div>
                     </div>
                     <div className="flex items-end justify-between">
                        {/* Quantity Manipulator */}
                        <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1 border border-slate-200 shadow-inner">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)} 
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-slate-500 border border-slate-200 shadow-sm hover:text-blue-600 hover:border-blue-500 transition-all font-bold"
                          >
                            -
                          </button>
                          
                          <input 
                            type="text" 
                            inputMode="numeric"
                            value={item.quantity}
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^0-9]/g, '');
                              if (val) setQuantity(item.id, val);
                            }}
                            className="w-10 bg-transparent text-center font-black text-slate-900 text-sm focus:outline-none"
                          />

                          <button 
                            onClick={() => updateQuantity(item.id, 1)} 
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-slate-500 border border-slate-200 shadow-sm hover:text-blue-600 hover:border-blue-500 transition-all font-bold"
                          >
                            +
                          </button>
                        </div>

                        {/* Item Total Price */}
                        <span className="font-black text-blue-600 text-lg">
                          ₹{(totalDays > 0 ? (item.price * totalDays * item.quantity) : (item.price * item.quantity)).toFixed(2)}
                        </span>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upsell / Accessory Suggestions */}
          {cartItems.length > 0 && availableAccessories.length > 0 && (
            <div className="mt-8 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                 <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" /></svg>
                 <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800">Complete Your Loadout</h3>
              </div>
              
              <div className="space-y-3">
                {availableAccessories.map(acc => (
                  <div key={acc.id} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between shadow-sm">
                     <div className="flex items-center gap-3">
                       <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-slate-200 overflow-hidden shrink-0">
                         <Image src={acc.imageUrl || acc.image} alt={acc.name} width={40} height={40} className="w-full h-full object-contain p-1" />
                       </div>
                       <div>
                         <h4 className="font-bold text-slate-900 text-xs">{acc.name}</h4>
                         <span className="text-blue-500 font-bold text-[10px] uppercase tracking-wider block">
                           {totalDays > 0 ? `+ ₹${(acc.price * totalDays).toFixed(2)} Total` : `+ ₹${acc.price.toFixed(2)} / Day`}
                         </span>
                       </div>
                     </div>
                     <button onClick={() => addToCart(acc)} className="text-xs font-bold uppercase hover:bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors">
                       Add
                     </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer: Summary & Checkout */}
        <div className="p-6 bg-white border-t border-slate-200 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
           <div className="flex justify-between items-center mb-4">
             <span className="text-slate-500 font-bold uppercase tracking-wider text-xs">Rental Subtotal</span>
             <div className="text-right">
                <span className="block text-2xl font-black text-slate-900 leading-none">₹{subtotal.toFixed(2)}</span>
                {totalDays === 0 ? (
                  <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-1 block">Date Selection Required!</span>
                ) : (
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">For {totalDays} Continuous Days</span>
                )}
             </div>
           </div>
           <button 
             disabled={cartItems.length === 0 || totalDays === 0}
             onClick={() => {
               setIsCheckoutModalOpen(true);
               setIsCartOpen(false);
             }}
             className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-md flex items-center justify-center gap-2
               ${cartItems.length > 0 && totalDays > 0 ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30 hover:-translate-y-0.5' : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300 shadow-none'}`}
           >
             Proceed to Booking <span className="text-lg leading-none">→</span>
           </button>
        </div>
      </div>
    </>
  );
}

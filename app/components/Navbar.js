"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import DatePickerModal from "./DatePickerModal";
import { useRental } from "../context/RentalContext";
import { Menu, X, ShoppingCart, CalendarDays } from "lucide-react";

export default function Navbar() {
  const { 
    deliveryDate, setDeliveryDate, 
    pickupDate, setPickupDate, 
    cartItems, setIsCartOpen,
    location, setLocation 
  } = useRental();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCustomCity, setIsCustomCity] = useState(false);
  const [customCityInput, setCustomCityInput] = useState("");
  const dropdownRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsCustomCity(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const locations = ["Mumbai", "Delhi", "Bangalore", "Kolkata"];

  const handleLocationSelect = (loc) => {
    setLocation(loc);
    setIsDropdownOpen(false);
  };

  const handleCustomCitySubmit = (e) => {
    e.preventDefault();
    if (customCityInput.trim()) {
      setLocation(customCityInput.trim());
      setIsDropdownOpen(false);
      setIsCustomCity(false);
    }
  };

  const handleDatesConfirmed = (start, end) => {
    setDeliveryDate(start);
    setPickupDate(end);
    setIsModalOpen(false);
  };

  const cartItemCount = cartItems.reduce((a, i) => a + i.quantity, 0);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
          
          {/* Main Top Row */}
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="relative h-10 w-40 md:h-12 md:w-48">
                <Image 
                  src="/logo/logo.png" 
                  alt="Champion Rentals" 
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Desktop Center: Date Picker Pill */}
            <div className="hidden lg:flex items-center bg-slate-100 border border-slate-200 rounded-full pl-6 p-1 shadow-sm shrink-0">
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 pr-4 border-r border-slate-300 hover:text-blue-600 transition-colors cursor-pointer group"
                >
                  <svg className="w-4 h-4 text-slate-600 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-bold text-slate-800 whitespace-nowrap min-w-[70px] text-left">
                    {location}
                  </span>
                  <svg className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Custom Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-[60] animate-in fade-in zoom-in-95 duration-200">
                    {!isCustomCity ? (
                      <>
                        <div className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Available Cities</div>
                        <div className="grid grid-cols-1 gap-1 px-2">
                          {locations.map((loc) => (
                            <button
                              key={loc}
                              onClick={() => handleLocationSelect(loc)}
                              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-between ${
                                location === loc ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              {loc}
                              {location === loc && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                            </button>
                          ))}
                        </div>
                        <div className="mx-4 my-2 border-t border-slate-100" />
                        <button 
                          onClick={() => setIsCustomCity(true)}
                          className="w-[calc(100%-16px)] mx-2 text-left px-3 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Other City...
                        </button>
                      </>
                    ) : (
                      <div className="px-4 py-3">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Enter Your City</span>
                          <button onClick={() => setIsCustomCity(false)} className="text-[10px] font-bold text-blue-500 hover:underline">Back</button>
                        </div>
                        <form onSubmit={handleCustomCitySubmit} className="space-y-3">
                          <input 
                            autoFocus
                            type="text"
                            placeholder="e.g. Pune, Chennai..."
                            value={customCityInput}
                            onChange={(e) => setCustomCityInput(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                          />
                          <button 
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all"
                          >
                            Confirm Location
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Delivery Date */}
              <div onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 border-r border-slate-300 hover:bg-slate-200/50 transition-colors cursor-pointer group h-full py-2">
                <CalendarDays className="w-4 h-4 text-slate-600" />
                <div className="text-sm font-medium text-blue-900 flex whitespace-nowrap cursor-pointer select-none">
                  Del: <span className="ml-1 font-bold">{deliveryDate ? format(deliveryDate, "do MMM") : "Select"}</span>
                </div>
              </div>
              
              {/* Pickup Date */}
              <div onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 hover:bg-slate-200/50 transition-colors cursor-pointer group h-full py-2">
                <CalendarDays className="w-4 h-4 text-slate-600" />
                <div className="text-sm font-medium text-blue-900 flex whitespace-nowrap cursor-pointer select-none">
                  Pick: <span className="ml-1 font-bold">{pickupDate ? format(pickupDate, "do MMM") : "Select"}</span>
                </div>
              </div>

              <button onClick={() => setIsModalOpen(true)} className="bg-slate-900 hover:bg-black text-white px-6 py-2 rounded-full font-bold text-sm tracking-wide transition-colors flex items-center gap-2 ml-2">
                Edit
              </button>
            </div>

            {/* Right Side: Links & Cart & Mobile Menu Toggle */}
            <div className="flex items-center gap-3 md:gap-6">
              {/* Desktop Links */}
              <div className="hidden lg:flex items-center gap-6 text-sm font-bold text-slate-600">
                <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
                <Link href="/products" className="hover:text-blue-500 transition-colors">Equipment</Link>
                <Link href="/products" className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full shadow-md transition-all font-bold uppercase tracking-wide text-xs">Rent Now</Link>
              </div>

              {/* Cart Icon (Visible on both) */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-600 transition-all"
                aria-label="Open Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-md">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button 
                className="lg:hidden p-2 text-slate-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Secondary Row: Compact Date Picker */}
          <div className="lg:hidden py-3 border-t border-slate-100">
             <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between shadow-sm active:bg-slate-100"
             >
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <CalendarDays className="w-4 h-4" />
                   </div>
                   <div className="text-left">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{location}</div>
                      <div className="text-sm font-black text-slate-800">
                         {deliveryDate && pickupDate 
                           ? `${format(deliveryDate, "MMM d")} - ${format(pickupDate, "MMM d")}`
                           : "Select Rental Dates"}
                      </div>
                   </div>
                </div>
                <div className="text-xs font-bold bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full uppercase">
                   {deliveryDate && pickupDate ? "Change" : "Add"}
                </div>
             </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-slate-100 py-4 space-y-2 pb-6 animate-in slide-in-from-top-2 duration-200">
                <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-base font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">Equipment Catalog</Link>
                <Link href="/rental-terms" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-base font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">Rental Terms</Link>
                <Link href="/support" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-base font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">Support & Contact</Link>
                
                {/* Mobile Location Selector */}
                <div className="mx-4 my-2 pt-4 border-t border-slate-100">
                   <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Your Delivery City</div>
                   {!isCustomCity ? (
                     <div className="grid grid-cols-2 gap-2">
                        {locations.map((loc) => (
                          <button
                            key={loc}
                            onClick={() => setLocation(loc)}
                            className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                              location === loc ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-400'
                            }`}
                          >
                            {loc}
                          </button>
                        ))}
                        <button 
                          onClick={() => setIsCustomCity(true)}
                          className="px-3 py-2.5 rounded-xl text-xs font-bold bg-slate-50 border border-slate-200 text-slate-500 hover:border-blue-400 flex items-center justify-center gap-1.5"
                        >
                          Other...
                        </button>
                     </div>
                   ) : (
                     <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                        <div className="flex items-center justify-between mb-3">
                           <span className="text-[10px] font-bold text-slate-500">Custom Location</span>
                           <button onClick={() => setIsCustomCity(false)} className="text-[10px] font-bold text-blue-600">Cancel</button>
                        </div>
                        <form onSubmit={handleCustomCitySubmit} className="flex gap-2">
                           <input 
                              type="text"
                              placeholder="City Name"
                              value={customCityInput}
                              onChange={(e) => setCustomCityInput(e.target.value)}
                              className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                           />
                           <button type="submit" className="bg-blue-600 text-white p-2 rounded-xl">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor font-bold">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                           </button>
                        </form>
                     </div>
                   )}
                </div>
                
                <div className="pt-4 px-4">
                   <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-md transition-all font-black uppercase tracking-widest text-sm">
                     Start Renting Now
                   </Link>
                </div>
            </div>
          )}

        </div>
      </nav>

      <DatePickerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onContinue={handleDatesConfirmed}
        initialStartDate={deliveryDate}
        initialEndDate={pickupDate}
      />
    </>
  );
}


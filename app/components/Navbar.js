"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import DatePickerModal from "./DatePickerModal";
import { useRental } from "../context/RentalContext";
import { Menu, X, ShoppingCart, CalendarDays } from "lucide-react";

export default function Navbar() {
  const { deliveryDate, setDeliveryDate, pickupDate, setPickupDate, cartItems, setIsCartOpen } = useRental();
  const [location, setLocation] = useState("Bangalore");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-sm group-hover:shadow-md transition-all">
                CS
              </div>
              <span className="text-lg md:text-xl font-bold tracking-tight uppercase tracking-widest text-slate-800">
                Champion <span className="text-slate-500 font-medium hidden sm:inline">Rentals</span>
              </span>
            </Link>

            {/* Desktop Center: Date Picker Pill */}
            <div className="hidden lg:flex items-center bg-slate-100 border border-slate-200 rounded-full pl-6 p-1 shadow-sm shrink-0">
              {/* Location */}
              <div className="flex items-center gap-2 pr-4 border-r border-slate-300">
                <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <select 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent text-sm font-semibold text-slate-800 outline-none cursor-pointer appearance-none"
                >
                  <option value="Bangalore">Bangalore</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="New York">New York</option>
                </select>
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
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-base font-bold text-slate-700 hover:bg-slate-50 rounded-xl">Home</Link>
                <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-base font-bold text-slate-700 hover:bg-slate-50 rounded-xl">Equipment Catalog</Link>
                <Link href="/rental-terms" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-base font-bold text-slate-700 hover:bg-slate-50 rounded-xl">Rental Terms</Link>
                <Link href="/support" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-base font-bold text-slate-700 hover:bg-slate-50 rounded-xl">Support & Contact</Link>
                
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


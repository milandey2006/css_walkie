"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import DatePickerModal from "./DatePickerModal";
import { useRental } from "../context/RentalContext";

export default function Navbar() {
  const { deliveryDate, setDeliveryDate, pickupDate, setPickupDate, cartItems, setIsCartOpen } = useRental();
  const [location, setLocation] = useState("Bangalore");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDatesConfirmed = (start, end) => {
    setDeliveryDate(start);
    setPickupDate(end);
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex flex-col md:flex-row items-center justify-between gap-4 py-2 md:py-0">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-sm group-hover:shadow-md transition-all">
              CS
            </div>
            <span className="text-xl font-bold tracking-tight uppercase tracking-widest text-slate-800">
              Champion <span className="text-slate-500 font-medium">Rentals</span>
            </span>
          </Link>
          
          {/* Rental Date Picker Pill (Central Element) */}
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-full pl-6 p-1 shadow-sm shrink-0">
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
              <svg className="w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
            
            {/* Delivery Date */}
            <div 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 border-r border-slate-300 hover:bg-slate-200/50 transition-colors cursor-pointer group h-full py-2"
            >
              <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="text-sm font-medium text-blue-900 flex whitespace-nowrap cursor-pointer select-none">
                Del: <span className="ml-1 font-bold">{deliveryDate ? format(deliveryDate, "do MMM") : "Select"}</span>
              </div>
            </div>
            
            {/* Pickup Date */}
            <div 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 hover:bg-slate-200/50 transition-colors cursor-pointer group h-full py-2"
            >
              <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="text-sm font-medium text-blue-900 flex whitespace-nowrap cursor-pointer select-none">
                Pick: <span className="ml-1 font-bold">{pickupDate ? format(pickupDate, "do MMM") : "Select"}</span>
              </div>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-slate-900 hover:bg-black text-white px-6 py-2 rounded-full font-bold text-sm tracking-wide transition-colors flex items-center gap-2 ml-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              Edit
            </button>
          </div>

          {/* Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-bold text-slate-600">
            <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
            <Link href="/products" className="hover:text-blue-500 transition-colors">Equipment</Link>
            <Link href="#" className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full shadow-md transition-all font-bold uppercase tracking-wide text-xs">Rent Now</Link>

            {/* Cart Icon Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-600 transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-md">
                  {cartItems.reduce((a, i) => a + i.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* The Date Picker Modal overlay */}
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

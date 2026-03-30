"use client";

import { useState, useEffect } from "react";
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isAfter, 
  isBefore, 
  differenceInDays 
} from "date-fns";

export default function DatePickerModal({ isOpen, onClose, onContinue, initialStartDate, initialEndDate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(initialStartDate || null);
  const [endDate, setEndDate] = useState(initialEndDate || null);

  useEffect(() => {
    if (isOpen) {
      if (initialStartDate) {
        setCurrentMonth(initialStartDate);
        setStartDate(initialStartDate);
        setEndDate(initialEndDate || null);
      } else {
        setCurrentMonth(new Date());
      }
    }
  }, [isOpen, initialStartDate, initialEndDate]);

  if (!isOpen) return null;

  // Change displayed months via arrows
  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // The right panel shows two months side by side
  const nextMonth = addMonths(currentMonth, 1);

  // Helper to generate the days array for a given month calendar
  const getDaysForMonth = (month) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const startDateGrid = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday start
    const endDateGrid = endOfWeek(monthEnd, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: startDateGrid, end: endDateGrid });
  };

  const daysFirstMonth = getDaysForMonth(currentMonth);
  const daysSecondMonth = getDaysForMonth(nextMonth);
  
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const handleDateClick = (day) => {
    // If selecting earlier than today, do nothing (assuming can't rent in past, but just simple logic here)
    if (startDate && endDate) {
      // Reset if both are selected
      setStartDate(day);
      setEndDate(null);
    } else if (startDate && !endDate) {
      // Set end date, but handle if it's before start date
      if (isBefore(day, startDate)) {
        setStartDate(day);
      } else {
        setEndDate(day);
      }
    } else {
      // Initial selection
      setStartDate(day);
    }
  };

  const isSelected = (day) => {
    if (startDate && isSameDay(day, startDate)) return true;
    if (endDate && isSameDay(day, endDate)) return true;
    return false;
  };

  const isInRange = (day) => {
    if (startDate && endDate) {
      return isAfter(day, startDate) && isBefore(day, endDate);
    }
    return false;
  };

  const totalDays = (startDate && endDate) ? differenceInDays(endDate, startDate) + 1 : 0;

  // Render a single calendar month
  const renderCalendarMonth = (monthTarget, days) => (
    <div className="flex-1 w-full min-w-[280px]">
      <div className="text-center font-bold text-slate-800 text-sm mb-4">
        {format(monthTarget, "MMMM yyyy")}
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-semibold text-slate-400 mb-2">
        {weekDays.map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-y-1 text-center">
        {days.map((day, idx) => {
          const isTargetMonth = isSameMonth(day, monthTarget);
          const selected = isSelected(day);
          const inRange = isInRange(day);
          const isStartNode = startDate && isSameDay(day, startDate);
          const isEndNode = endDate && isSameDay(day, endDate);
          
          return (
            <div key={idx} className={`relative flex items-center justify-center p-1 cursor-pointer select-none h-10`}>
              {/* Range background highlighter */}
              {inRange && <div className="absolute inset-y-1.5 inset-x-0 bg-blue-100/70" />}
              {isStartNode && endDate && !isSameDay(startDate, endDate) && <div className="absolute inset-y-1.5 left-1/2 right-0 bg-blue-100/70" />}
              {isEndNode && startDate && !isSameDay(startDate, endDate) && <div className="absolute inset-y-1.5 left-0 right-1/2 bg-blue-100/70" />}
              
              <div 
                onClick={() => handleDateClick(day)}
                className={`relative z-10 w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold transition-all
                  ${!isTargetMonth ? 'text-slate-300' : 'text-slate-700 hover:bg-slate-100'}
                  ${selected ? 'bg-blue-500 text-white shadow-md' : ''}
                `}
              >
                {format(day, "d")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-[1050px] md:h-[600px] lg:h-auto rounded-2xl md:rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[95vh] mt-10 md:mt-0">
        
        {/* Close Button Header overlay for mobile */}
        <button onClick={onClose} className="absolute top-4 right-4 z-[60] bg-white md:bg-transparent rounded-full p-2 text-slate-500 hover:text-slate-900 shadow-sm md:shadow-none transition-colors border border-slate-200 md:border-transparent">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Left Pane: Details & Forms */}
        <div className="w-full md:w-[320px] bg-slate-50 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col shrink-0 overflow-y-auto order-2 md:order-1 max-h-[40vh] md:max-h-full pb-24 md:pb-8">
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-6 hidden md:block">Select your Dates</h2>
            
            <div className="flex flex-row md:flex-col gap-4 mb-6">
              <div className="flex-1">
                <label className="text-xs font-bold text-slate-500 mb-1 block">Delivery Date</label>
                <div className="flex items-center gap-2 bg-white border border-slate-300 px-3 py-2.5 rounded-lg w-full text-xs sm:text-sm font-bold text-slate-800 shadow-sm">
                  <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span className="truncate">{startDate ? format(startDate, "MMM dd, yyyy") : "-- --, ----"}</span>
                </div>
              </div>
              <div className="flex-1">
                <label className="text-xs font-bold text-slate-500 mb-1 block">Pickup Date</label>
                <div className="flex items-center gap-2 bg-white border border-slate-300 px-3 py-2.5 rounded-lg w-full text-xs sm:text-sm font-bold text-slate-800 shadow-sm">
                  <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span className="truncate">{endDate ? format(endDate, "MMM dd, yyyy") : "-- --, ----"}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="bg-white border border-slate-300 rounded-xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-end gap-1">
                  <span className="text-3xl md:text-4xl font-black text-slate-800 leading-none">{totalDays > 0 ? String(totalDays).padStart(2, '0') : '--'}</span>
                  <span className="text-xs font-bold text-slate-400 mb-1">Days</span>
                </div>
                {startDate && endDate && (
                  <div className="text-right">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Chargeable Period:</span>
                     <span className="text-xs font-bold text-slate-800 flex items-center gap-1 justify-end">
                       <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                       {format(startDate, "MMM d")} - {format(endDate, "MMM d")}
                     </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 bg-blue-50/50 border border-blue-100 p-4 rounded-xl mb-6 hidden md:flex">
              <div className="text-blue-500 mt-0.5"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg></div>
              <p className="text-xs text-blue-900 leading-relaxed font-medium">Same-day dispatch between 3PM and 10PM. Pickup between 9AM to 1PM from your site.</p>
            </div>
          </div>
          
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 md:static md:bg-transparent md:border-t-0 md:p-0 z-[60]">
            <button 
              disabled={!startDate || !endDate}
              onClick={() => onContinue(startDate, endDate)}
              className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-md  ${startDate && endDate ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/30' : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300 shadow-none'}`}
            >
              Lock In Dates
            </button>
          </div>
        </div>

        {/* Right Pane: Dual Calendar */}
        <div className="flex-1 bg-white relative overflow-y-auto md:overflow-x-auto overflow-x-hidden order-1 md:order-2 h-[50vh] md:h-auto">
          
          {/* Calendar Controls */}
          <div className="sticky top-0 bg-white/90 backdrop-blur-md px-6 py-4 md:absolute md:top-8 md:px-8 border-b border-slate-100 md:border-b-0 w-full flex justify-between items-center z-[40]">
            <h2 className="text-xl font-black text-slate-800 md:hidden">Select Dates</h2>
            <div className="flex items-center gap-2 md:w-full md:justify-between ml-auto md:ml-0 pointer-events-none md:pr-4">
              <button onClick={handlePrevMonth} className="pointer-events-auto shrink-0 w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-500 transition-all bg-white shadow-sm hover:shadow-md">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={handleNextMonth} className="pointer-events-auto shrink-0 w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-500 transition-all bg-white shadow-sm hover:shadow-md">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 pt-6 md:pt-24 pb-12 px-6 md:px-8 max-w-full md:w-max">
            {renderCalendarMonth(currentMonth, daysFirstMonth)}
            {renderCalendarMonth(nextMonth, daysSecondMonth)}
          </div>
        </div>

      </div>
    </div>
  );
}

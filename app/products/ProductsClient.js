"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { useRental } from "../context/RentalContext";

const DESCRIPTION_LIMIT = 100; // characters shown before "View more"

// Individual card — has its own expand state so cards don't affect each other
function ProductCard({ product, totalDays, onAddToCart }) {
  const [expanded, setExpanded] = useState(false);
  const desc = product.description || "";
  const isTruncatable = desc.length > DESCRIPTION_LIMIT;
  const displayDesc = expanded || !isTruncatable ? desc : desc.slice(0, DESCRIPTION_LIMIT).trimEnd() + "…";

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-xl transition-all group flex flex-col h-full">

      {/* Image */}
      <div className="relative h-64 bg-slate-100 flex items-center justify-center p-6 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-2 rounded-2xl bg-gradient-to-t from-slate-900 to-slate-800 opacity-95 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/10 blur-[50px] rotate-12 scale-150" />
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 z-10 p-4"
            />
          ) : (
            <div className="z-10 flex flex-col items-center justify-center text-slate-500">
              <svg className="w-16 h-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-xs font-semibold">No Image</p>
            </div>
          )}
        </div>
        {product.badge && (
          <div className="absolute top-6 left-6 bg-blue-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded shadow-lg z-20">
            {product.badge}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">{product.name}</h3>

        {/* Price */}
        <div className="flex mb-4 items-end min-h-[44px]">
          {totalDays > 0 ? (
            <div className="flex flex-col">
              <div className="flex items-end">
                <span className="text-3xl font-black text-slate-800 leading-none">₹{(product.price * totalDays).toFixed(2)}</span>
                <span className="text-blue-500 font-bold ml-2 mb-1 text-xs uppercase tracking-widest">Total</span>
              </div>
              <span className="text-slate-500 font-medium text-xs mt-1 bg-slate-100 inline-block px-1.5 py-0.5 rounded">
                {totalDays} <span className="text-slate-400">Days</span> @ ₹{product.price?.toFixed(2)}/day
              </span>
            </div>
          ) : (
            <>
              <span className="text-3xl font-black text-slate-800 leading-none">₹{product.price?.toFixed(2)}</span>
              <span className="text-slate-500 font-bold ml-1 mb-1 text-sm leading-none">/ day</span>
            </>
          )}
        </div>

        {/* Description with View more / View less */}
        <div className="mb-6">
          <p className="text-slate-600 text-sm leading-relaxed font-medium">{displayDesc}</p>
          {isTruncatable && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-blue-500 hover:text-blue-700 transition-colors"
            >
              {expanded ? "View less" : "View more"}
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>

        {/* Specs */}
        {(product.range || product.durability) && (
          <div className="space-y-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-6 bg-slate-50 p-4 rounded-xl">
            {product.range && (
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span>Range</span> <span className="text-slate-800">{product.range}</span>
              </div>
            )}
            {product.durability && (
              <div className="flex justify-between pt-1">
                <span>Durab.</span> <span className="text-slate-800">{product.durability}</span>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => onAddToCart(product)}
          className="mt-auto w-full bg-slate-900 hover:bg-blue-500 text-white shadow-md py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Add to Rental Cart
        </button>
      </div>
    </div>
  );
}

export default function ProductsClient({ products }) {
  const { totalDays, addToCart } = useRental();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRange, setSelectedRange] = useState("All");
  const [selectedDurability, setSelectedDurability] = useState("All");

  // Build filter options dynamically from the products list
  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category).filter(Boolean))],
    [products]
  );
  const ranges = useMemo(
    () => ["All", ...new Set(products.map((p) => p.range).filter(Boolean))],
    [products]
  );
  const durabilities = useMemo(
    () => ["All", ...new Set(products.map((p) => p.durability).filter(Boolean))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchRange = selectedRange === "All" || product.range === selectedRange;
      const matchDurability = selectedDurability === "All" || product.durability === selectedDurability;
      return matchCategory && matchRange && matchDurability;
    });
  }, [products, selectedCategory, selectedRange, selectedDurability]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedRange("All");
    setSelectedDurability("All");
  };

  return (
    <div className="flex-1 bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white pb-24 min-h-screen">

      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:2rem_2rem]" />
        <div className="max-w-[1600px] mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900 mb-4">Rental Equipment</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
            Build your rental package. Select the exact comms equipment your operation requires, for as many days as you need.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 mt-6 md:mt-12 flex flex-col xl:flex-row gap-8 xl:gap-12">

        {/* Sidebar Filters */}
        <aside className="w-full xl:w-64 shrink-0">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-2 mb-6 w-full">Filters</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-6 xl:gap-8 xl:border-r border-slate-200 xl:pr-8">
            {/* Category */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Category</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border shadow-sm flex items-center justify-center transition-colors ${selectedCategory === cat ? "bg-blue-500 border-blue-500" : "border-slate-300 bg-white group-hover:border-slate-400"}`}>
                    {selectedCategory === cat && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <input type="radio" className="hidden" name="category" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} />
                  <span className={`text-sm font-semibold transition-colors ${selectedCategory === cat ? "text-slate-900" : "text-slate-600 group-hover:text-slate-800"}`}>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Range */}
          {ranges.length > 1 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Effective Range</h3>
              <div className="space-y-2">
                {ranges.map((range) => (
                  <label key={range} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border shadow-sm flex items-center justify-center transition-colors ${selectedRange === range ? "bg-blue-500 border-blue-500" : "border-slate-300 bg-white group-hover:border-slate-400"}`}>
                      {selectedRange === range && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <input type="radio" className="hidden" name="range" checked={selectedRange === range} onChange={() => setSelectedRange(range)} />
                    <span className={`text-sm font-semibold transition-colors ${selectedRange === range ? "text-slate-900" : "text-slate-600 group-hover:text-slate-800"}`}>{range}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Durability */}
          {durabilities.length > 1 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Durability Rating</h3>
              <div className="space-y-2">
                {durabilities.map((dur) => (
                  <label key={dur} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border shadow-sm flex items-center justify-center transition-colors ${selectedDurability === dur ? "bg-blue-500 border-blue-500" : "border-slate-300 bg-white group-hover:border-slate-400"}`}>
                      {selectedDurability === dur && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <input type="radio" className="hidden" name="durability" checked={selectedDurability === dur} onChange={() => setSelectedDurability(dur)} />
                    <span className={`text-sm font-semibold transition-colors ${selectedDurability === dur ? "text-slate-900" : "text-slate-600 group-hover:text-slate-800"}`}>{dur}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

            {(selectedCategory !== "All" || selectedRange !== "All" || selectedDurability !== "All") && (
              <button onClick={resetFilters} className="w-full py-2 px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-full uppercase tracking-wider transition-colors shadow-sm sm:col-span-3 xl:col-span-1 mt-2">
                Clear Filters
              </button>
            )}
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1 w-full">
          <div className="mb-6">
            <span className="text-slate-500 text-sm font-bold">
              {filteredProducts.length}{" "}
              <span className="uppercase text-xs tracking-widest text-slate-400">
                Result{filteredProducts.length !== 1 && "s"} Found
              </span>
            </span>
          </div>

          {/* No products in Sanity yet */}
          {products.length === 0 && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-16 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-400 mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">No rental products yet.</h3>
              <p className="text-slate-600 font-medium">
                Go to your Sanity Studio and add products under{" "}
                <span className="font-bold text-blue-600">🎙️ Rental Products (Walkie Talkie Site)</span>.
              </p>
            </div>
          )}

          {/* Filters returned no results */}
          {products.length > 0 && filteredProducts.length === 0 && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-16 text-center">
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">No hardware matches your parameters.</h3>
              <p className="text-slate-600 mb-8 font-medium">Adjust your tactical requirements to find available equipment.</p>
              <button onClick={resetFilters} className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl shadow-md text-sm font-bold uppercase tracking-widest transition-colors">
                Reset All Filters
              </button>
            </div>
          )}

          {/* Product Cards */}
          {filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  totalDays={totalDays}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

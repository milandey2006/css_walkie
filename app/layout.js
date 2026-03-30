import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Walkie Talkie Rentals in Mumbai & Across India | Champion Rentals",
  description: "Premium walkie-talkie and two-way radio rentals in Mumbai, Delhi, Bangalore and across India. Perfect for events, film shoots, construction, and security.",
};

import Navbar from "./components/Navbar";
import { RentalProvider } from "./context/RentalContext";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-slate-50`}
    >
      <body className="min-h-full flex flex-col text-slate-800 bg-slate-50 overflow-x-hidden">
        <RentalProvider>
          <Navbar />
          <CartDrawer />
          <CheckoutModal />
          {children}
        </RentalProvider>
      </body>
    </html>
  );
}

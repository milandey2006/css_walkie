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
  title: "Premium Walkie Talkie & CCTV Rentals | Champion Rentals India",
  description: "Elite two-way radio and high-end CCTV surveillance rentals across India. Reliable communication and security for events, film shoots, and construction projects.",
  icons: {
    icon: "/logo/logo.png",
    shortcut: "/logo/logo.png",
    apple: "/logo/logo.png",
  }
};

import Navbar from "./components/Navbar";
import { RentalProvider } from "./context/RentalContext";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import { client } from "../lib/sanity";

async function getAccessories() {
  try {
    const query = `
      *[
        (
          (_type == "rentalProduct" && category == "Accessories") ||
          (_type == "cctvProduct" && category in ["NVR / Recording", "POE Switch", "Storage (HDD)", "Cables & Wiring", "Accessories"])
        ) && inStock == true
      ] {
        _id,
        _type,
        category,
        name,
        "id": slug.current,
        "price": pricePerDay,
        "imageUrl": image.asset->url
      }
    `;
    return await client.fetch(query, {}, { cache: 'no-store' });
  } catch (err) {
    console.error("Sanity upsell fetch error:", err);
    return [];
  }
}

export default async function RootLayout({ children }) {
  const accessories = await getAccessories();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-slate-50`}
    >
      <body className="min-h-full flex flex-col text-slate-800 bg-slate-50 overflow-x-hidden">
        <RentalProvider initialAccessories={accessories}>
          <Navbar />
          <CartDrawer />
          <CheckoutModal />
          {children}
        </RentalProvider>
      </body>
    </html>
  );
}

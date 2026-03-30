import Link from 'next/link';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: "Rental Terms & Conditions | Champion Rentals",
  description: "Clear and strict rental policies covering liability, damages, late fees, and cancellations for Champion Walkie Talkie Rentals.",
};

export default function RentalTermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 px-10 py-12 text-white">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-semibold mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Rental Terms & Conditions</h1>
          </div>
          <p className="text-slate-400 text-lg">Clear-cut policies ensuring fairness, reliability, and equipment safety.</p>
        </div>

        {/* Content */}
        <div className="p-10 md:p-14 space-y-12 text-slate-700">
          
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">1. Equipment Care & Liability</h2>
            <div className="space-y-4 font-medium leading-relaxed">
              <p>
                From the moment of delivery until the equipment is safely returned to our team, the Renter assumes full financial and operational responsibility for all rented assets (including radios, batteries, antennas, earpieces, multi-chargers, and pelican cases).
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li>Equipment must not be physically modified, permanently marked, or subjected to unauthorized programming.</li>
                <li>Unless specifically renting &quot;Intrinsically Safe&quot; or &quot;Waterproof&quot; models, walkie-talkies must be protected from extreme heat, heavy rain, dust storms, and corrosive environments.</li>
                <li>Champion Rentals is not liable for operational failures resulting from end-user misuse or failure to properly charge the equipment.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 text-red-600">2. Loss & Damage Policy</h2>
            <div className="space-y-4 font-medium leading-relaxed">
              <p>We maintain a zero-tolerance policy for missing inventory to ensure the next client receives their full order.</p>
              <div className="bg-red-50 border border-red-100 p-6 rounded-xl">
                <h3 className="font-bold text-red-800 mb-2 truncate">The &quot;Full Retail Replacement&quot; Rule</h3>
                <p className="text-red-700 text-sm">
                  If any radio unit, multi-charger, or major accessory is permanently lost, stolen, or damaged beyond viable repair while in your possession, you will be billed the <strong>full, current retail replacement cost</strong> of that exact unit immediately. 
                </p>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 mt-4">
                <li>Minor damages (e.g., shattered screens, snapped antennas, broken belt clips) will be assessed upon return.</li>
                <li>Standard repair fees for minor damages will be directly deducted from your security deposit.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">3. Strict Late Return Penalties</h2>
            <div className="space-y-4 font-medium leading-relaxed">
              <p>
                Our logistical network relies on exact return times to sanitize, reprogram, and ship equipment to the next event. Late returns cause massive cascading delays.
              </p>
              <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl text-amber-800">
                <p className="font-bold">Late Penalty: 1.5x Daily Rate</p>
                <p className="text-sm mt-1">Equipment not returned (or made available for pickup) by the explicitly agreed-upon time will immediately incur a late fee equal to <strong>150% of the standard daily rental rate</strong> for every calendar day it is delayed.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">4. Payments & Security Deposit</h2>
            <div className="space-y-4 font-medium leading-relaxed text-slate-600">
              <p>A refundable security deposit—calculated based on the total value of the fleet being rented—is mandatory and must be cleared prior to dispatch.</p>
              <p>Once the rental period concludes, the fleet will undergo a rigorous 24-hour technical inspection at our facility. If all equipment is accounted for and working optimally, your full security deposit will be processed for refund within <strong>3-5 business days</strong>.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">5. Cancellation Policy</h2>
            <div className="space-y-4 font-medium leading-relaxed">
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 inline-block min-w-[120px]">48+ Hours:</span> 
                  <span>Full refund of all advance payments.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 inline-block min-w-[120px]">Within 24 Hours:</span> 
                  <span>50% cancellation fee applied to the total rental value.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 inline-block min-w-[120px]">Day of Dispatch:</span> 
                  <span>No refund. The logistical and programming work has already been executed.</span>
                </li>
              </ul>
            </div>
          </section>
          
          <div className="pt-8 border-t border-slate-200 text-center">
             <p className="text-sm text-slate-500 font-medium">By proceeding with a rental order from Champion Rentals, you automatically acknowledge and agree to these binding terms and conditions.</p>
          </div>

        </div>
      </div>
    </div>
  );
}

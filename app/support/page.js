import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin, MessageSquare, Clock } from 'lucide-react';

export const metadata = {
  title: "Support & Contact | Champion Rentals",
  description: "Get 24/7 support for your walkie talkie and two-way radio rentals. Contact Champion Rentals in Mumbai.",
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-semibold mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">How can we help?</h1>
          <p className="text-lg text-slate-600 font-medium">Our technical support and logistics team is ready to assist you 24/7.</p>
        </div>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          
          {/* Phone Card */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Phone className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Call Support</h2>
            <p className="text-slate-500 font-medium mb-4">Immediate dispatch & technical troubleshooting.</p>
            <a href="tel:02245717953" className="text-2xl font-extrabold text-blue-600 hover:text-blue-700 transition-colors">022-45717953</a>
          </div>

          {/* Email Card */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Email Us</h2>
            <p className="text-slate-500 font-medium mb-4">For bulk quotes, event planning, and general inquiries.</p>
            <a href="mailto:rental@championsecuritysystem.com" className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">rental@championsecuritysystem.com</a>
          </div>

        </div>

        {/* Address & Hours */}
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl text-white">
          <div className="grid md:grid-cols-2">
            <div className="p-10 md:p-12 space-y-8">
               <div>
                 <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                   <MapPin className="w-6 h-6 text-blue-400" /> Corporate Headquarters
                 </h3>
                 <p className="text-slate-400 leading-relaxed font-medium pl-9">
                   Champion Security System<br/>
                   Office-21 A GR Floor, New Apollo Estate<br/>
                   Old Nagardas Road Near SBI Bank<br/>
                   Andheri East Mumbai 400069, Maharashtra, India
                 </p>
               </div>
               <div>
                 <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                   <Clock className="w-6 h-6 text-blue-400" /> Operational Hours
                 </h3>
                 <p className="text-slate-400 font-medium pl-9">
                   <strong>Dispatch:</strong> 24/7 for active rentals<br/>
                   <strong>Mon-Fri:</strong> 10:00 AM - 6:00 PM<br/>
                   <strong>Saturday:</strong> 10:00 AM - 2:00 PM<br/>
                   <strong>Sunday:</strong> Closed
                 </p>
               </div>
            </div>
            {/* Aesthetic map placeholder block */}
            <div className="relative bg-slate-800 hidden md:block group overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Andheri+East,Mumbai&zoom=14&size=600x600&maptype=roadmap&style=feature:all|element:labels.text.fill|color:0xffffff&style=feature:all|element:labels.text.stroke|color:0x000000&style=feature:administrative|element:geometry.fill|color:0x000000&style=feature:administrative|element:geometry.stroke|color:0x144b53&style=feature:landscape|element:geometry|color:0x08304b&style=feature:poi|element:geometry|color:0x0c4152&style=feature:road.highway|element:geometry.fill|color:0x000000&style=feature:road.highway|element:geometry.stroke|color:0x0b434f&style=feature:road.arterial|element:geometry.fill|color:0x000000&style=feature:road.arterial|element:geometry.stroke|color:0x0b3d51&style=feature:road.local|element:geometry|color:0x000000&style=feature:transit|element:geometry|color:0x146474&style=feature:water|element:geometry|color:0x021019')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-500 mix-blend-luminosity"></div>
               <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

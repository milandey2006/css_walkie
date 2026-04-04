import Image from "next/image";
import Link from "next/link";
import { 
  CalendarDays, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  Camera, 
  HardHat, 
  Headset, 
  Radio, 
  Building2,
  CheckCircle2
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 bg-slate-50 text-slate-800 selection:bg-blue-500 selection:text-white font-sans overflow-x-hidden">
      {/* Hero Section */}
      <main className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-white mt-0">
        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-slate-100/50 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/50 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-[1600px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 z-10 lg:pl-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Elite Comms & CCTV Surveillance
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
              Premium Comms <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">& CCTV Rentals</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 max-w-xl leading-relaxed font-medium">
              Equip your operation with the industry's most robust tactical radios and advanced CCTV surveillance systems. High-end rentals delivered to <b>Mumbai</b>, Delhi, and nationwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/products" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider transition-all shadow-[0_10px_20px_rgba(59,130,246,0.2)] hover:shadow-[0_15px_30px_rgba(59,130,246,0.3)] group flex items-center justify-center gap-3">
                Build Your Package <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <button className="bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-xl font-bold transition-all shadow-sm">
                View Tech Specs
              </button>
            </div>
            <div className="pt-8 flex items-center gap-6 border-t border-slate-200 text-sm font-semibold text-slate-600 flex-wrap">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                Trusted by 500+ Corporations
              </div>
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300"></div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-500" />
                Secure & Enterprise Grade
              </div>
            </div>
          </div>

          <div className="relative z-10 lg:h-[700px] flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-slate-800 rounded-[3rem] shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-700">
               <div className="absolute inset-0 bg-blue-500/10 blur-[80px]"></div>
            </div>
            
            <Image 
              src="/hero-walkie.png"
              alt="Professional Tactical Equipment Rental"
              width={700}
              height={700}
              className="relative w-full h-auto object-contain max-h-[600px] drop-shadow-2xl animate-[pulse_10s_ease-in-out_infinite]"
              priority
            />
            
            {/* Floating Spec Badges */}
            <div className="absolute top-20 -left-6 bg-white/90 backdrop-blur-md border border-slate-200 p-4 rounded-xl shadow-xl hover:-translate-y-2 transition-transform">
              <div className="text-blue-600 font-extrabold text-2xl leading-none">Pan-India</div>
              <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1">Wide Deployment</div>
            </div>
            
            <div className="absolute bottom-24 -right-6 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-2xl hover:-translate-y-2 transition-transform">
              <div className="text-white font-extrabold text-xl leading-none flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                In Stock & Ready
              </div>
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-1">CCTV & Comms Hub</div>
            </div>
          </div>
        </div>
      </main>

      {/* How It Works Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">How Our Rentals Work</h2>
            <p className="text-slate-600 text-lg font-medium">Rent premium communication and surveillance gear in three simple steps. We handle the programming, charging, and logistics.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-0.5 bg-slate-200 z-0"></div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-4 group">
              <div className="w-20 h-20 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center shadow-lg group-hover:border-blue-100 group-hover:scale-110 transition-all">
                <CalendarDays className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold">1. Select Event Dates</h3>
              <p className="text-slate-600 font-medium px-4">Choose your rental period. Our calendar ensures real-time availability for long or short-term projects.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-4 group">
              <div className="w-20 h-20 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center shadow-lg group-hover:border-blue-100 group-hover:scale-110 transition-all">
                <Radio className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold">2. Choose Your Fleet</h3>
              <p className="text-slate-600 font-medium px-4">Select from our range of UHF/VHF, long-range, and intrinsically safe walkie talkies tailored to your needs.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-4 group">
              <div className="w-20 h-20 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center shadow-lg group-hover:border-blue-100 group-hover:scale-110 transition-all">
                <Truck className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold">3. Fast Nationwide Delivery</h3>
              <p className="text-slate-600 font-medium px-4">Receive your fully charged, pre-programmed Pelican cases anywhere in India, including express drop-offs in Mumbai.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Industries Trusting Our Solutions</h2>
              <p className="text-slate-600 text-lg font-medium">Reliable communication and security are critical. We provide specialized radio and CCTV rentals across various sectors in India.</p>
            </div>
            <Link href="/products" className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-2 group whitespace-nowrap">
              View All Equipment <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Event Management", icon: <Headset className="w-8 h-8"/>, desc: "Concerts, conferences, & weddings." },
              { title: "Film & Production", icon: <Camera className="w-8 h-8"/>, desc: "Silent operation & discrete headsets for sets." },
              { title: "Construction Sites", icon: <HardHat className="w-8 h-8"/>, desc: "Rugged, long-range VHF/UHF radios." },
              { title: "Security & Protection", icon: <ShieldCheck className="w-8 h-8"/>, desc: "Encrypted, instantly deployed comms." }
            ].map((industry, i) => (
              <div key={i} className="bg-slate-50 hover:bg-slate-100 p-8 rounded-3xl border border-slate-200 transition-colors group">
                <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                  {industry.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{industry.title}</h3>
                <p className="text-slate-600 font-medium">{industry.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">Why Rent With Champion?</h2>
            <p className="text-slate-600 text-lg font-medium">We deliver fully charged, pre-programmed, and sanitized equipment directly to your site. Zero maintenance overhead for you.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 px-4 lg:px-12">
            <div className="bg-white p-10 rounded-3xl border border-slate-200 hover:border-blue-200 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Truck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Just-In-Time Delivery</h3>
              <p className="text-slate-600 leading-relaxed font-medium">Specify your event dates in our navbar. We guarantee delivery 24 hours prior to your rental start date anywhere in Mumbai and major hubs across India.</p>
            </div>

            <div className="bg-white p-10 rounded-3xl border border-slate-200 hover:border-blue-200 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Radio className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Turnkey Programming</h3>
              <p className="text-slate-600 leading-relaxed font-medium">All fleets arrive pre-synced on private frequencies to avoid interference. Open the Pelican case and start communicating flawlessly with your team.</p>
            </div>

            <div className="bg-white p-10 rounded-3xl border border-slate-200 hover:border-blue-200 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">24/7 Field Support</h3>
              <p className="text-slate-600 leading-relaxed font-medium">If a unit fails for any reason during your rental period in Mumbai, we deploy a replacement unit instantly. Pan-India rentals receive overnight replacements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content & FAQ Block */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
             <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-6">Your Ultimate Guide to Walkie Talkie & CCTV Rentals in India</h2>
             <p className="text-xl text-slate-600 font-medium leading-relaxed">
               As India's leading unified tactical comms and security provider, Champion Rentals powers the largest events, film shoots, and construction projects with unmatched reliability and scale.
             </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 mb-20 max-w-6xl mx-auto">
            <div className="prose prose-lg prose-slate prose-headings:font-extrabold prose-a:text-blue-600">
              <h3 className="text-2xl text-slate-900 mb-4">Why Choose Us for Two-Way Radio Rental?</h3>
              <p>
                When organizing high-stakes operations, relying on cell phone networks is risky. By choosing a professional <strong>walkie talkie on rent in Mumbai</strong>, you enable zero-latency, push-to-talk capability for your core crew. Our fleet includes robust WPC-compliant and license-free models from industry leaders like Motorola, Baofeng, and Kenwood. 
              </p>
              <p>
                We eliminate the massive CAPEX of purchasing radios by offering flexible <strong>event radio rentals</strong>. Every Pelican case arrives with fully charged batteries, multi-unit charging docks, and surveillance earpieces so your team remains discrete and efficient.
              </p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm">
               <h3 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                 <MapPin className="w-6 h-6 text-blue-500"/> Areas We Serve
               </h3>
               <div className="space-y-6">
                 <div>
                   <h4 className="font-bold text-slate-800 text-lg mb-2">Targeted Mumbai Coverage</h4>
                   <p className="text-slate-600 font-medium">We guarantee priority same-day delivery to key hubs: <strong>Bandra Kurla Complex (BKC)</strong>, <strong>Andheri & Film City (Goregaon)</strong>, <strong>South Bombay (Colaba, Nariman Point)</strong>, and logistics centers across <strong>Navi Mumbai</strong> and <strong>Thane</strong>.</p>
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-800 text-lg mb-2">Pan-India Deployment</h4>
                   <p className="text-slate-600 font-medium">Require <strong>walkie talkie rentals in India</strong>? We offer overnight air-freight logistics to major metros including <strong>Delhi NCR, Bangalore, Pune, Hyderabad, and Chennai</strong>, supporting multi-city tours and massive infrastructure initiatives.</p>
                 </div>
               </div>
            </div>
          </div>

          {/* FAQ Grid for "People Also Ask" Optimization */}
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-extrabold text-slate-900 text-center mb-12">Frequently Asked Rental Questions</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-xl font-bold text-slate-900 mb-3 flex items-start gap-2">
                  <span className="text-blue-500">Q.</span> Do I need a license to rent walkie-talkies in India?
                </h4>
                <p className="text-slate-600 font-medium">No. Champion Rentals primarily provides license-free walkie talkies (operating on the pre-approved PMR446 frequency band in India), allowing your team to use them legally right out of the box without waiting for Department of Telecommunications approvals.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-xl font-bold text-slate-900 mb-3 flex items-start gap-2">
                  <span className="text-blue-500">Q.</span> What is the range of your rental walkie-talkies?
                </h4>
                <p className="text-slate-600 font-medium">Our fleet features high-powered long-range walkie talkies. For open outdoor events, you can expect ranges of 3-5 kilometers. For dense urban areas in Mumbai or indoors at large conference centers, our UHF radios easily penetrate walls safely bridging 1-2 kms.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-xl font-bold text-slate-900 mb-3 flex items-start gap-2">
                  <span className="text-blue-500">Q.</span> Are earpieces and chargers included in the rental cost?
                </h4>
                <p className="text-slate-600 font-medium">Absolutely. When searching for a <strong>walkie talkie with earpiece rental</strong>, know that our standard rental package includes discrete acoustic tube earpieces, extra batteries for long shifts, and a unified charging dock at no additional hidden cost.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-xl font-bold text-slate-900 mb-3 flex items-start gap-2">
                  <span className="text-blue-500">Q.</span> Can I rent walkie talkies for film shoots and discrete ops?
                </h4>
                <p className="text-slate-600 font-medium">Yes, film production units in Bandra and Film City are our regular clients. We provide specialized models with 'silent mode', durable belt clips, and high-fidelity noise-canceling headsets perfect for noisy construction sites and quiet sets alike.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden bg-slate-900 rounded-t-[4rem] mt-12 mx-4 lg:mx-8 mb-4">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-slate-800"></div>
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>

        <div className="relative max-w-4xl mx-auto px-6 text-center space-y-8 z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">Secure Your Fleet Today.</h2>
          <p className="text-xl text-slate-300 font-medium">Select your dates in the top bar and build your rental package in minutes for your next project in Mumbai or anywhere across India.</p>
          <div className="pt-6">
            <Link href="/products" className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest transition-all shadow-xl shadow-blue-900/40 text-lg inline-block hover:-translate-y-1">
              Browse Rental Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-16 pb-8 px-6 border-t border-slate-200 mt-12">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
                <Radio className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-slate-900 text-xl tracking-tight">Champion Rentals India</span>
            </div>
            <p className="text-slate-500 font-medium max-w-sm">
              India's premier tactical communication rental service, ensuring seamless operations for events, films, and security worldwide.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4 text-slate-500 font-medium text-sm border-l-2 border-blue-500 pl-4">
              <li className="flex items-start gap-3">
                <a href="tel:02245717953" className="hover:text-blue-600 transition-colors block">022-45717953</a>
              </li>
              <li className="flex items-start gap-3">
                <a href="mailto:rental@championsecuritysystem.com" className="hover:text-blue-600 transition-colors block">rental@championsecuritysystem.com</a>
              </li>
              <li className="flex items-start gap-3">
                <span className="block leading-relaxed">Office-21 A GR Floor, New Apollo Estate<br/>Old Nagardas Road Near SBI Bank<br/>Andheri East Mumbai 400069, MH, India</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3 text-slate-500 font-medium text-sm">
              <li><Link href="/products" className="hover:text-blue-600 transition-colors">Equipment Catalog</Link></li>
              <li><Link href="/support" className="hover:text-blue-600 transition-colors">24/7 Support</Link></li>
              <li><Link href="/rental-terms" className="hover:text-blue-600 transition-colors">Rental Terms</Link></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-[1600px] mx-auto pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-sm text-slate-400 font-medium">© {new Date().getFullYear()} Champion Security System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

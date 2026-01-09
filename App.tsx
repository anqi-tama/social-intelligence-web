
import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  BarChart3, 
  Zap, 
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Target,
  Sparkles,
  UtensilsCrossed,
  Check,
  BrainCircuit,
  Globe,
  MessageSquare,
  User,
  Loader2,
  Activity,
  Plus,
  Minus,
  Radio,
  Layers,
  LineChart,
  Command,
  Coffee
} from 'lucide-react';

// --- Types ---

interface NavLinkProps {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}

interface IndustryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

// --- Constants ---

const INDUSTRIES = [
  "Technology & SaaS", "Retail & E-commerce", "Hospitality & Tourism", 
  "Healthcare & Pharmaceuticals", "Financial Services & Banking", "Manufacturing", 
  "Education & EdTech", "Real Estate & Construction", "Energy & Utilities", 
  "Transportation & Logistics", "Entertainment & Media", "Food & Beverage", 
  "Agriculture", "Automotive", "Telecommunications", "Government & Public Sector", 
  "Professional Services", "Non-Profit & NGO", "Fashion & Apparel", 
  "Consumer Electronics", "Other"
];

const COUNTRY_CODES = [
  { code: "+62", name: "ID", flag: "🇮🇩" },
  { code: "+1", name: "US", flag: "🇺🇸" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
  { code: "+65", name: "SG", flag: "🇸🇬" },
];

const PLATFORMS = [
  { name: "TikTok", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/694987e9e496d9d53a959d58_X_Icon__4_-removebg-preview.png" },
  { name: "Instagram", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/6949875f067dc35f082f2550_X_Icon__1_-removebg-preview%20(1).png" },
  { name: "X", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/694987a060ad1141f0ff3e1d_X_Icon__3_-removebg-preview.png" },
  { name: "Facebook", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/6949880fcf06b747a8c0ac36_X_Icon__2_-removebg-preview.png" },
  { name: "Reddit", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/694d553dfa59b3a516e0acd1_Untitled_design__13_-removebg-preview.png" },
  { name: "YouTube", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/6949cced6cb032028e4131a9_X_Icon__8_-removebg-preview.png" },
  { name: "Detik.com", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/6949cb90f54efb73bed56c5d_X_Icon__7_-removebg-preview.png" },
  { name: "CNBC", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/694ce747655a37d8f6c4c256_Untitled_design__5_-removebg-preview.png" },
  { name: "LinkedIn", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/694cde8991a13a0bfec26c88_Untitled_design__2_-removebg-preview-removebg-preview.png" },
  { name: "Quora", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/694d4e72a03268968c0a0492_Untitled_design__9_-removebg-preview.png" },
  { name: "Kompas", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/694d5184ab14320b4214ea65_Untitled_design__10_-removebg-preview.png" },
  { name: "CNN", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/694d53d198c9a634df22df28_Untitled_design__12_-removebg-preview.png" }
];

const ROW_1 = [...PLATFORMS.slice(0, 6)];
const ROW_2 = [...PLATFORMS.slice(6, 12)];

// --- Helper Components ---

const NavLink: React.FC<NavLinkProps> = ({ onClick, active, children }) => (
  <button 
    onClick={onClick} 
    className={`transition-colors duration-200 text-sm font-medium ${active ? 'text-white' : 'text-[#6a6a6b] hover:text-white'}`}
  >
    {children}
  </button>
);

const IndustryCard: React.FC<IndustryCardProps> = ({ icon, title, description, features }) => (
  <div className="bg-[#0c0c0e]/50 border border-[#1b1b1d] p-8 rounded-3xl relative overflow-hidden group hover:border-[#2d2d30] transition-all duration-300">
    <div className="absolute top-0 left-8 w-12 h-[2px] bg-gradient-to-r from-purple-500/50 to-transparent"></div>
    <div className="mb-6 text-[#a1a1a1] group-hover:text-white transition-colors">{icon}</div>
    <h3 className="text-3xl font-bold mb-4 text-white">{title}</h3>
    <p className="text-[#6a6a6b] text-sm mb-8 leading-relaxed">{description}</p>
    <button className="w-full py-3 border border-[#1b1b1d] rounded-full text-white text-sm font-bold hover:bg-white hover:text-black transition-all mb-8">
      Explore More
    </button>
    <div className="w-full h-[1px] bg-[#1b1b1d] mb-8"></div>
    <div className="space-y-4">
      {features.map((f, i) => (
        <div key={i} className="flex items-center gap-3 text-xs text-[#a1a1a1]">
          <Check className="w-4 h-4 text-white" />
          {f}
        </div>
      ))}
    </div>
  </div>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#1b1b1d]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-white' : 'text-[#a1a1a1] group-hover:text-white'}`}>
          {question}
        </span>
        <div className={`p-1 rounded-full transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#1b1b1d]' : ''}`}>
          {isOpen ? <Minus className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 text-[#6a6a6b]" />}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-[#6a6a6b] leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'trends' | 'contact'>('home');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    industry: '',
    email: '',
    countryCode: '+62',
    phone: '',
    message: ''
  });

  const navigateTo = (page: 'home' | 'trends' | 'contact') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ name: '', company: '', industry: '', email: '', countryCode: '+62', phone: '', message: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white">
      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] pointer-events-none z-0"></div>

      {/* --- Navbar --- */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-[#1b1b1d] bg-[#070709]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-white to-[#a1a1a1] rounded-lg flex items-center justify-center font-bold text-[#070709] text-xl">S</div>
            <span className="font-heading font-bold text-xl tracking-tight uppercase">Social Intelligence</span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <NavLink onClick={() => navigateTo('home')} active={currentPage === 'home'}>Home</NavLink>
            <NavLink onClick={() => navigateTo('trends')} active={currentPage === 'trends'}>Industry Trends</NavLink>
            <NavLink onClick={() => navigateTo('contact')} active={currentPage === 'contact'}>Contact</NavLink>
            <button onClick={() => navigateTo('contact')} className="bg-[#1b1b1d] border border-[#2d2d30] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-all">Book Demo</button>
          </div>
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>

      {/* --- Success Modal --- */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#070709]/90 backdrop-blur-sm">
          <div className="bg-[#0c0c0e] border border-purple-500/30 p-12 rounded-[2.5rem] max-w-md w-full text-center space-y-6">
            <CheckCircle2 className="w-16 h-16 text-purple-500 mx-auto" />
            <h3 className="text-3xl font-black text-white">Message Sent!</h3>
            <p className="text-[#6a6a6b]">Thank you for reaching out. We've sent a copy to your email. Our team will contact you shortly.</p>
            <button onClick={() => setShowSuccess(false)} className="w-full py-4 bg-white text-black font-bold rounded-2xl">Close</button>
          </div>
        </div>
      )}

      {currentPage === 'home' ? (
        <main className="animate-in fade-in duration-700">
          {/* Hero Section */}
          <section className="pt-44 pb-24 px-6 relative">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#161618] border border-[#252527] rounded-full text-[#a1a1a1] text-xs font-medium">
                <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" /> Empowering 500+ global brands
              </div>
              <h1 className="text-6xl md:text-8xl font-black gradient-text leading-[1.1] tracking-tight">Stay informed and get ahead of the conversation</h1>
              <p className="text-lg md:text-xl text-[#6a6a6b] max-w-2xl mx-auto leading-relaxed">See every mention of your brand on TikTok, Instagram, X, news and review sites — in one dashboard. No gaps, no sampling.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button onClick={() => navigateTo('contact')} className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">Get Started</button>
                <button className="w-full sm:w-auto px-8 py-4 border border-[#2d2d30] text-white rounded-full font-bold hover:bg-[#161618]">Watch Demo</button>
              </div>
            </div>
          </section>

          {/* 1. Access Customer Insight */}
          <section className="py-32 px-6 border-t border-[#1b1b1d]">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-12">
                <div className="space-y-6">
                  <h2 className="text-5xl font-black text-white">Access Customer Insight</h2>
                  <p className="text-[#6a6a6b] text-lg">Learn from online conversations about your company. Get access to honest consumer feedback.</p>
                </div>
                <div className="space-y-8">
                  <div className="flex gap-6 items-start">
                    <div className="p-3 bg-[#161618] border border-[#252527] rounded-xl"><BarChart3 className="w-6 h-6 text-purple-400" /></div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Capture Authentic Customer Feedback</h4>
                      <p className="text-[#6a6a6b]">Access honest consumer insights from online conversations.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="p-3 bg-[#161618] border border-[#252527] rounded-xl"><Target className="w-6 h-6 text-blue-400" /></div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Know Customer Preferences</h4>
                      <p className="text-[#6a6a6b]">Pinpoint exactly what people like or dislike about your brand.</p>
                    </div>
                  </div>
                </div>
                <div className="pt-8 border-t border-[#1b1b1d] flex gap-4">
                  <div className="relative flex-1 group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a4a4b]" />
                    <input type="email" placeholder="john@brand.com" className="w-full bg-[#161618] border border-[#252527] rounded-xl pl-12 pr-6 py-4 text-white focus:outline-none focus:border-purple-500" />
                  </div>
                  <button className="px-8 py-4 bg-white text-black font-bold rounded-xl whitespace-nowrap hover:scale-105 transition-transform">Get Started</button>
                </div>
              </div>

              <div className="relative">
                <div className="bg-[#0c0c0e] border border-[#1b1b1d] p-8 rounded-[2rem] shadow-2xl space-y-8">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm font-bold uppercase tracking-widest text-[#a1a1a1]">Top Positive Drivers</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { rank: 1, text: "Kualitas Premium & Eksklusif", color: "from-purple-500/20" },
                      { rank: 2, text: "Layanan Pelanggan Responsif", color: "from-blue-500/20" },
                      { rank: 3, text: "Brand Image yang Kuat", color: "from-purple-500/20" },
                      { rank: 4, text: "Inovasi Berkelanjutan", color: "from-gray-500/10" }
                    ].map((item) => (
                      <div key={item.rank} className={`flex items-center gap-6 p-4 bg-gradient-to-r ${item.color} to-transparent border border-[#1b1b1d] rounded-2xl`}>
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center font-bold text-white text-sm">{item.rank}</div>
                        <span className="text-white font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Reputation Intelligence Marquee */}
          <section className="py-32 px-6 border-t border-[#1b1b1d] relative overflow-hidden">
            <div className="max-w-7xl mx-auto text-center space-y-16">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-[10px] font-bold uppercase tracking-widest">Global Coverage</div>
                <h2 className="text-5xl md:text-6xl font-black text-white">Reputation Intelligence at Scale</h2>
              </div>

              <div className="relative py-20 mask-fade">
                <div className="flex overflow-hidden mb-6">
                  <div className="animate-marquee flex gap-6 px-3">
                    {[...ROW_1, ...ROW_1, ...ROW_1].map((p, i) => (
                      <div key={i} className="bg-[#161618] border border-[#252527] p-6 rounded-2xl flex flex-col items-center justify-center gap-4 min-w-[160px] grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 group">
                        <img src={p.icon} alt={p.name} className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" />
                        <span className="text-xs text-white font-bold">{p.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex overflow-hidden">
                  <div className="animate-marquee-reverse flex gap-6 px-3">
                    {[...ROW_2, ...ROW_2, ...ROW_2].map((p, i) => (
                      <div key={i} className="bg-[#161618] border border-[#252527] p-6 rounded-2xl flex flex-col items-center justify-center gap-4 min-w-[160px] grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 group">
                        <img src={p.icon} alt={p.name} className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" />
                        <span className="text-xs text-white font-bold">{p.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-[#070709]/80 backdrop-blur-xl border border-purple-500/40 flex items-center justify-center text-center p-6 shadow-[0_0_80px_rgba(139,92,246,0.4)]">
                    <div className="space-y-1">
                      <div className="text-4xl md:text-6xl font-black text-white">25M+</div>
                      <div className="text-lg md:text-xl font-bold text-[#a1a1a1]">Sources</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Turn Insights Into Wins */}
          <section className="py-32 px-6 border-t border-[#1b1b1d]">
            <div className="max-w-7xl mx-auto space-y-20">
              <div className="text-center space-y-4">
                <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-[10px] font-bold uppercase tracking-widest">Workflow</div>
                <h2 className="text-5xl md:text-6xl font-black text-white">Turn Insights Into Wins</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { 
                    label: "Listen", 
                    desc: "Capture every online mention from 25M+ sources automatically.", 
                    icon: <Radio className="w-8 h-8" />,
                    illustration: <Activity className="w-16 h-16 text-blue-500" />,
                    accentColor: "blue"
                  },
                  { 
                    label: "Understand", 
                    desc: "Uncover authentic feelings, sarcasm, and key topics with AI precision.", 
                    icon: <BrainCircuit className="w-8 h-8" />,
                    illustration: <Layers className="w-16 h-16 text-purple-500" />,
                    accentColor: "purple"
                  },
                  { 
                    label: "Act", 
                    desc: "Instant alerts and AI-powered suggestions to guide your responses and engage smarter.", 
                    icon: <Zap className="w-8 h-8" />,
                    illustration: <LineChart className="w-16 h-16 text-yellow-500" />,
                    accentColor: "yellow"
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-[#0c0c0e] border border-[#1b1b1d] rounded-3xl overflow-hidden group hover:border-[#2d2d30] transition-all">
                    <div className="h-48 overflow-hidden bg-[#161618] relative flex items-center justify-center">
                      <div className={`absolute inset-0 opacity-10 bg-gradient-to-br from-${item.accentColor}-500/20 to-transparent`}></div>
                      <div className="relative z-10 text-white opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                        {React.cloneElement(item.illustration as React.ReactElement, { size: 64, strokeWidth: 1 })}
                      </div>
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-purple-500 to-transparent"></div>
                    </div>
                    
                    <div className="p-8 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="text-purple-500">{item.icon}</div>
                        <h4 className="text-2xl font-black text-white">{item.label}</h4>
                      </div>
                      <p className="text-[#6a6a6b] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. CTA */}
          <section className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-[#0c0c0e] border border-white/5 p-12 md:p-16 rounded-[2.5rem] flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
                <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-purple-600/5 blur-[120px] pointer-events-none rounded-full"></div>
                <div className="space-y-8 z-10 flex-1">
                  <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">Get Your Free <br/>Brand Analysis</h3>
                  <button onClick={() => navigateTo('contact')} className="px-10 py-5 bg-white text-black font-black rounded-full hover:scale-105 transition-transform">Get My Free Analysis</button>
                </div>
                <div className="flex-1 w-full lg:max-w-md z-10">
                  <div className="bg-[#161618] border border-[#252527] p-8 rounded-3xl space-y-6">
                    {[
                      "Hear the Full Conversation",
                      "Check Your Brand's Current Reputation",
                      "Find Opportunities in Your Mentions"
                    ].map((text, i) => (
                      <div key={i} className="flex items-center gap-4 text-white font-bold group">
                        <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors">
                          <Check className="w-4 h-4" />
                        </div>
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-32 px-6 border-t border-[#1b1b1d]">
            <div className="max-w-3xl mx-auto space-y-16">
              <div className="text-center space-y-4">
                <h3 className="text-4xl md:text-5xl font-black gradient-text">Frequently Asked Questions</h3>
                <p className="text-[#6a6a6b]">Learn how Social Intelligence helps you catch issues early.</p>
              </div>
              <div className="space-y-2">
                <FAQItem question="Apa itu Social Listening?" answer="Proses pemantauan percakapan online tentang brand Anda untuk mendapatkan wawasan strategis." />
                <FAQItem question="Berapa banyak sumber yang dipantau?" answer="Lebih dari 25 juta sumber global termasuk media sosial, berita, dan situs ulasan." />
              </div>
            </div>
          </section>
        </main>
      ) : currentPage === 'trends' ? (
        <main className="pt-32 pb-24 animate-in fade-in duration-700">
           <section className="px-6 py-12 text-center space-y-8 max-w-7xl mx-auto">
             <div className="inline-block px-4 py-1.5 bg-[#161618] border border-[#252527] rounded-full text-[#a1a1a1] text-xs font-bold uppercase tracking-widest">Industry Trends</div>
             <h2 className="text-5xl md:text-7xl font-black text-white max-w-4xl mx-auto leading-tight">Industry Insights</h2>
             <div className="grid md:grid-cols-3 gap-8 text-left mt-16">
               <IndustryCard icon={<Globe className="w-8 h-8" />} title="Retail" description="Analyze customer sentiment across e-commerce." features={["Customer Sentiment", "Pricing Trends"]} />
               <IndustryCard icon={<Coffee className="w-8 h-8" />} title="Hospitality" description="Real-time reviews for hotels and cafes." features={["Review Score", "Competitive Benchmarking"]} />
               <IndustryCard icon={<UtensilsCrossed className="w-8 h-8" />} title="Food & Bev" description="Viral food trends identification." features={["Recipe Trends", "Flavor Mapping"]} />
             </div>
           </section>
        </main>
      ) : (
        <main className="pt-32 pb-24 animate-in fade-in duration-700">
          <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid lg:grid-cols-2 gap-20 items-start">
              <div className="space-y-12">
                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">Let's Talk Growth.</h1>
                <p className="text-xl text-[#6a6a6b]">Custom proposals tailored to your enterprise's unique scale.</p>
              </div>
              <form onSubmit={handleSubmit} className="bg-[#0c0c0e] border border-[#1b1b1d] p-8 md:p-12 rounded-[2.5rem] space-y-6">
                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" className="w-full bg-[#161618] border border-[#252527] rounded-xl py-4 px-6 text-white focus:outline-none focus:border-purple-500" />
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="w-full bg-[#161618] border border-[#252527] rounded-xl py-4 px-6 text-white focus:outline-none focus:border-purple-500" />
                <textarea required name="message" value={formData.message} onChange={handleInputChange} rows={4} placeholder="Message" className="w-full bg-[#161618] border border-[#252527] rounded-xl py-4 px-6 text-white focus:outline-none focus:border-purple-500 resize-none"></textarea>
                <button disabled={isSubmitting} className="w-full py-5 bg-purple-600 text-white font-black rounded-2xl flex items-center justify-center gap-3">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : "Send Request"}
                </button>
              </form>
            </div>
          </section>
        </main>
      )}

      {/* --- Footer --- */}
      <footer className="py-24 px-6 bg-[#0c0c0e] border-t border-[#1b1b1d]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-[#6a6a6b]">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-black text-xl">S</div>
              <span className="text-white font-bold text-xl uppercase tracking-tighter">Social Intelligence</span>
            </div>
            <p className="max-w-sm">Next-gen social listening platform. Powered by high-fidelity AI.</p>
          </div>
          <div className="space-y-4">
            <h5 className="text-white font-bold">Navigation</h5>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigateTo('home')}>Home</button></li>
              <li><button onClick={() => navigateTo('trends')}>Trends</button></li>
              <li><button onClick={() => navigateTo('contact')}>Contact</button></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="text-white font-bold">Contact</h5>
            <div className="flex items-center gap-3 text-sm"><Mail className="w-4 h-4" /> support@socialintel.ai</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

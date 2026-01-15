import React, { useState, useEffect } from 'react';
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
  Coffee,
  ChevronRight,
  ChevronDown,
  Instagram,
  Twitter,
  Linkedin,
  ArrowUpRight,
  ShieldCheck,
  Search,
  Users,
  AlertCircle,
  TrendingUp,
  FileText,
  PieChart,
  Youtube,
  Facebook,
  Music2,
  Tv,
  HelpCircle,
  Newspaper,
  Cpu,
  AlertTriangle,
  Smile,
  Map,
  Database
} from 'lucide-react';

// --- Types ---

interface Source {
  name: string;
  icon: string;
  url: string;
}

// --- Constants ---

const LOGO_URL = "https://i.imgur.com/3BicB8f.png";

const FEATURES = [
  { title: "AI Power Suggestion", desc: "Get smart recommendations for your next strategic move.", icon: <Sparkles className="w-6 h-6" /> },
  { title: "Sarcasm & Emotion Detection", desc: "Our AI understands irony and complex human emotions.", icon: <BrainCircuit className="w-6 h-6" /> },
  { title: "Topic & Theme Clustering", desc: "Group millions of mentions into actionable themes automatically.", icon: <Layers className="w-6 h-6" /> },
  { title: "Enhanced User Experience", desc: "A dashboard designed for speed and clarity.", icon: <Command className="w-6 h-6" /> },
  { title: "Key Metrics Dashboard", desc: "Track SOV, sentiment, and reach in real-time.", icon: <PieChart className="w-6 h-6" /> },
  { title: "Instant Alert & Anomaly", desc: "Know the second your brand starts trending unusually.", icon: <AlertCircle className="w-6 h-6" /> },
  { title: "Competitor Tracking", desc: "Monitor your rivals as closely as your own brand.", icon: <Target className="w-6 h-6" /> },
  { title: "Influencer Identification", desc: "Find the real voices driving your industry conversation.", icon: <Users className="w-6 h-6" /> },
  { title: "Advanced Sentiment Analyst", desc: "Deep-dive into qualitative nuances beyond simple +/-.", icon: <Activity className="w-6 h-6" /> }
];

const FAQS = [
  { q: "What Matric Do You Provide?", a: "We provide Share of Voice (SOV), Sentiment Analysis, Reach, Engagement Rate, and Topic Clustering metrics." },
  { q: "Does Social Intelligence Collect Historical Data?", a: "Yes, we can fetch up to 12 months of historical data depending on your plan." },
  { q: "How Does It Works?", a: "We scan 25M+ sources in real-time, process them through our Gemini-powered AI, and deliver insights to your dashboard." },
  { q: "How Accurate is Your Sentiment And Emotion Analyst?", a: "Our AI models achieve 92%+ accuracy, specifically tuned for sarcasm and local Indonesian slang." },
  { q: "Can I track competitor?", a: "Absolutely. You can set up side-by-side tracking for up to 50 competitors." },
  { q: "Is there a free trial?", a: "We offer a free Personalized Brand Analysis report during your initial demo call." }
];

const SOURCES_TOP: Source[] = [
  { name: "Facebook", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/6949880fcf06b747a8c0ac36_X_Icon__2_-removebg-preview.png", url: "https://facebook.com" },
  { name: "Reddit", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/694d553dfa59b3a516e0acd1_Untitled_design__13_-removebg-preview.png", url: "https://reddit.com" },
  { name: "YouTube", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/6949cced6cb032028e4131a9_X_Icon__8_-removebg-preview.png", url: "https://youtube.com" },
  { name: "TikTok", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/694987e9e496d9d53a959d58_X_Icon__4_-removebg-preview.png", url: "https://tiktok.com" },
  { name: "Instagram", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/6949875f067dc35f082f2550_X_Icon__1_-removebg-preview%20(1).png", url: "https://instagram.com" },
  { name: "X", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/694987a060ad1141f0ff3e1d_X_Icon__3_-removebg-preview.png", url: "https://x.com" },
];

const SOURCES_BOTTOM: Source[] = [
  { name: "LinkedIn", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/694cde8991a13a0bfec26c88_Untitled_design__2_-removebg-preview-removebg-preview.png", url: "https://linkedin.com" },
  { name: "Kompas", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/694d5184ab14320b4214ea65_Untitled_design__10_-removebg-preview.png", url: "https://kompas.com" },
  { name: "CNN", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/694d53d198c9a634df22df28_Untitled_design__12_-removebg-preview.png", url: "https://cnn.com" },
  { name: "Detik.com", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/6949cb90f54efb73bed56c5d_X_Icon__7_-removebg-preview.png", url: "https://detik.com" },
  { name: "CNBC", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/694ce747655a37d8f6c4c256_Untitled_design__5_-removebg-preview.png", url: "https://cnbc.com" },
  { name: "Quora", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/694d4e72a03268968c0a0492_Untitled_design__9_-removebg-preview.png", url: "https://quora.com" },
];

// --- Sub-components ---

const AnnouncementBar = () => (
  <div className="bg-gradient-to-r from-purple-700 to-indigo-900 text-white text-center py-2.5 px-4 text-[10px] md:text-xs font-bold tracking-widest uppercase relative z-[70]">
    <div className="flex items-center justify-center gap-4">
      <span className="bg-white/20 px-2 py-0.5 rounded-full text-[9px] flex-shrink-0">Case Study</span>
      <span>Discover our latest Wardah Brand Growth Pivot analysis.</span>
      <a 
        href="https://imm-studycase.vercel.app/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="underline hover:text-white/80 inline-flex items-center gap-1 whitespace-nowrap flex-shrink-0"
      >
        Read Now <ChevronRight className="w-3 h-3 flex-shrink-0" />
      </a>
    </div>
  </div>
);

const MegaMenu = ({ isOpen, onClose, navigateTo }: { isOpen: boolean; onClose: () => void; navigateTo: (p: any) => void }) => {
  if (!isOpen) return null;
  return (
    <div 
      className="absolute top-full left-0 w-full bg-[#070709] border-b border-[#1b1b1d] p-12 grid grid-cols-4 gap-12 animate-in slide-in-from-top-4 duration-300 z-50 shadow-2xl"
      onMouseLeave={onClose}
    >
      <div className="space-y-6">
        <h4 className="text-purple-500 font-bold text-xs uppercase tracking-widest">Solutions</h4>
        <ul className="space-y-4">
          {["Brand Intelligence", "Crisis Management", "Competitor Tracking", "Market Research"].map(item => (
            <li key={item} className="group cursor-pointer">
              <div className="text-white font-bold group-hover:text-purple-400 transition-colors flex items-center gap-2">{item} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100" /></div>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-6">
        <h4 className="text-purple-500 font-bold text-xs uppercase tracking-widest">Industry Trends</h4>
        <ul className="space-y-4">
          {["Retail & E-commerce", "Hospitality", "Healthcare", "Financial Services"].map(item => (
            <li key={item} className="text-[#a1a1a1] hover:text-white cursor-pointer text-sm transition-colors" onClick={() => navigateTo('trends')}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="space-y-6">
        <h4 className="text-purple-500 font-bold text-xs uppercase tracking-widest">Resources</h4>
        <ul className="space-y-4">
          {["Intelligence Reports", "Case Studies", "Blog", "Documentation"].map(item => (
            <li key={item} className="text-[#a1a1a1] hover:text-white cursor-pointer text-sm transition-colors">{item}</li>
          ))}
        </ul>
      </div>
      <div className="bg-gradient-to-br from-[#161618] to-[#0c0c0e] p-8 rounded-3xl border border-[#252527] space-y-4">
        <Sparkles className="text-purple-500 w-8 h-8" />
        <h4 className="text-white font-bold text-lg">Featured Insights</h4>
        <p className="text-[#6a6a6b] text-xs leading-relaxed">Wardah 2025 Growth Pivot: Movement + Glow Performance Analysis.</p>
        <a href="https://imm-studycase.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-purple-400 text-xs font-black uppercase flex items-center gap-2 hover:text-purple-300 transition-colors">READ CASE STUDY <ChevronRight className="w-3 h-3" /></a>
      </div>
    </div>
  );
};

const Breadcrumbs = ({ current }: { current: string }) => {
  const labels: Record<string, string> = { home: 'Home', trends: 'Industry Trends', contact: 'Contact' };
  return (
    <div className="max-w-7xl mx-auto px-6 pt-36 pb-4 flex items-center gap-2 text-[9px] uppercase font-bold tracking-[0.2em] text-[#4a4a4b]">
      <span className="hover:text-white cursor-pointer transition-colors" onClick={() => window.location.reload()}>Social Intelligence</span>
      <ChevronRight className="w-3 h-3" />
      <span className="text-purple-500">{labels[current]}</span>
    </div>
  );
};

// Moved outside and explicitly typed as React.FC to fix 'key' prop issue in JSX maps
const SourceCard: React.FC<{ source: Source }> = ({ source }) => (
  <a 
    href={source.url} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="w-40 h-32 md:w-48 md:h-40 bg-[#121214] border border-[#1b1b1d] rounded-2xl flex flex-col items-center justify-center gap-4 mx-2 md:mx-4 shrink-0 transition-all hover:border-purple-500/50 hover:bg-[#18181b] hover:scale-105 active:scale-95 cursor-pointer group"
  >
    <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
      <img 
        src={source.icon} 
        alt={source.name} 
        className="w-full h-full object-contain filter brightness-125" 
        loading="lazy"
      />
    </div>
    <span className="text-[10px] md:text-xs font-bold text-[#6a6a6b] uppercase tracking-widest group-hover:text-white transition-colors text-center px-4">{source.name}</span>
  </a>
);

// --- Main App ---

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'trends' | 'contact'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCaseIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const navigateTo = (page: 'home' | 'trends' | 'contact') => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    setIsMegaMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white selection:bg-purple-500 selection:text-white font-['Inter']">
      
      {/* --- Fixed Header Wrapper --- */}
      <header className="fixed top-0 left-0 w-full z-50 flex flex-col">
        <AnnouncementBar />
        <nav className="w-full border-b border-[#1b1b1d] bg-[#070709]">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo('home')}>
              <img src={LOGO_URL} alt="Social Intelligence Logo" className="h-10 md:h-12 w-auto object-contain" />
            </div>

            <div className="hidden md:flex items-center gap-10">
              <button onClick={() => navigateTo('home')} className={`text-xs font-bold uppercase tracking-widest ${currentPage === 'home' ? 'text-white' : 'text-[#6a6a6b] hover:text-white'}`}>Home</button>
              <button onMouseEnter={() => setIsMegaMenuOpen(true)} className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${currentPage === 'trends' ? 'text-white' : 'text-[#6a6a6b] hover:text-white'}`}>Industry Trends <ChevronDown className="w-3 h-3" /></button>
              <button onClick={() => navigateTo('contact')} className={`text-xs font-bold uppercase tracking-widest ${currentPage === 'contact' ? 'text-white' : 'text-[#6a6a6b] hover:text-white'}`}>Contact</button>
              <button onClick={() => navigateTo('contact')} className="bg-white text-black px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all">Book Demo</button>
            </div>

            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
          <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} navigateTo={navigateTo} />
        </nav>
      </header>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#070709] z-[100] p-12 flex flex-col gap-10 animate-in fade-in duration-300">
          <div className="flex justify-between items-center">
            <img src={LOGO_URL} alt="Social Intelligence Logo" className="h-10 w-auto object-contain cursor-pointer" onClick={() => navigateTo('home')} />
            <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8" /></button>
          </div>
          <div className="flex flex-col gap-8 text-4xl font-black">
            <button onClick={() => navigateTo('home')}>Home</button>
            <button onClick={() => navigateTo('trends')}>Trends</button>
            <button onClick={() => navigateTo('contact')}>Contact</button>
          </div>
          <button className="mt-auto bg-purple-600 py-6 rounded-3xl font-black text-xl">Book Demo</button>
        </div>
      )}

      {/* Breadcrumbs */}
      <Breadcrumbs current={currentPage} />

      {currentPage === 'home' ? (
        <main className="animate-in fade-in duration-1000">
          {/* --- Hero Section --- */}
          <section className="pt-16 pb-32 px-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
              <div className="w-full h-full bg-gradient-to-l from-purple-500/20 to-transparent"></div>
            </div>
            
            <div className="max-w-6xl mx-auto text-center space-y-12">
              <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tighter gradient-text">
                Stay informed and get ahead of the conversation
              </h1>
              <div className="max-w-3xl mx-auto space-y-8">
                <p className="text-xl text-[#6a6a6b] leading-relaxed">
                  See every mention of your brand on TikTok, Instagram Stories, X, YouTube comments, Reddit, news and review sites — in one dashboard. No gaps, no sampling, no surprise overages.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button onClick={() => navigateTo('contact')} className="w-full sm:w-auto px-12 py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">Book Demo</button>
                  <button onClick={() => navigateTo('contact')} className="w-full sm:w-auto px-12 py-5 border border-white/10 bg-white/5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">Contact Us</button>
                </div>
              </div>
            </div>
          </section>

          {/* --- Reputation Intelligence at Scale (Marquee sources) --- */}
          <section className="py-32 relative overflow-hidden border-t border-[#1b1b1d]">
            <div className="max-w-7xl mx-auto px-6 mb-24">
              <h2 className="text-5xl md:text-6xl font-black text-center text-white tracking-tighter">Reputation Intelligence at Scale</h2>
            </div>

            {/* Central 25M+ Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
              <div className="w-48 h-48 md:w-64 md:h-64 bg-black rounded-full border-4 border-purple-500/30 flex flex-col items-center justify-center shadow-[0_0_80px_rgba(168,85,247,0.3)] animate-pulse">
                <span className="text-4xl md:text-6xl font-black text-white">25M+</span>
                <span className="text-xs md:text-sm font-bold text-[#a1a1a1] uppercase tracking-[0.3em]">Sources</span>
              </div>
            </div>

            {/* Marquee Rows */}
            <div className="space-y-6 md:space-y-10 relative opacity-40 hover:opacity-100 transition-opacity">
              <div className="mask-fade overflow-hidden">
                <div className="animate-marquee py-2">
                  {[...SOURCES_TOP, ...SOURCES_TOP, ...SOURCES_TOP].map((s, i) => (
                    <SourceCard key={`top-${i}`} source={s} />
                  ))}
                </div>
              </div>

              <div className="mask-fade overflow-hidden">
                <div className="animate-marquee-reverse py-2">
                  {[...SOURCES_BOTTOM, ...SOURCES_BOTTOM, ...SOURCES_BOTTOM].map((s, i) => (
                    <SourceCard key={`bottom-${i}`} source={s} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* --- About / Access Customer Insight --- */}
          <section className="py-32 px-6 border-t border-[#1b1b1d]">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10">
                <div className="space-y-4">
                  <div className="text-purple-500 font-bold text-xs uppercase tracking-widest">About Section</div>
                  <h2 className="text-5xl font-black text-white">Access Customer Insight</h2>
                  <p className="text-lg text-[#6a6a6b] leading-relaxed">Learn from online conversations about your company. Get access to honest consumer feedback and understand why users choose you over competitors.</p>
                </div>
                
                {/* Swipeable Case Card */}
                <div className="relative h-72 overflow-hidden">
                  <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${currentCaseIndex === 0 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                    <div className="bg-[#161618] border border-[#252527] p-10 rounded-[2.5rem] h-full relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity"><TrendingUp className="w-32 h-32" /></div>
                       <h4 className="text-2xl font-bold text-white mb-4">UGM Case Example</h4>
                       <p className="text-sm text-[#a1a1a1] leading-relaxed mb-8">How a leading educational institution optimized their public reputation by analyzing sentiment across student communities in real-time.</p>
                       <a 
                        href="https://imm-studycase.vercel.app/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-purple-900/20"
                       >
                         READ NOW <ArrowUpRight className="w-4 h-4" />
                       </a>
                    </div>
                  </div>
                  <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${currentCaseIndex === 1 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                    <div className="bg-[#161618] border border-purple-500/30 p-10 rounded-[2.5rem] h-full relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity"><Sparkles className="w-32 h-32" /></div>
                       <h4 className="text-2xl font-bold text-white mb-4">WARDAH Case Example</h4>
                       <p className="text-sm text-[#a1a1a1] leading-relaxed mb-6">Discovery our latest Wardah Brand Growth Pivot analysis. Understanding consumer movement and glow performance signals.</p>
                       <a 
                        href="https://imm-studycase.vercel.app/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-purple-900/20"
                       >
                         READ NOW <ArrowUpRight className="w-4 h-4" />
                       </a>
                    </div>
                  </div>
                </div>
                
                {/* Swipe Indicators */}
                <div className="flex gap-2 justify-center lg:justify-start">
                  <button onClick={() => setCurrentCaseIndex(0)} className={`w-8 h-1 rounded-full transition-all ${currentCaseIndex === 0 ? 'bg-purple-500' : 'bg-[#252527]'}`}></button>
                  <button onClick={() => setCurrentCaseIndex(1)} className={`w-8 h-1 rounded-full transition-all ${currentCaseIndex === 1 ? 'bg-purple-500' : 'bg-[#252527]'}`}></button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-purple-600/20 blur-[120px] rounded-full"></div>
                <div className="relative bg-[#0c0c0e] border border-white/5 p-12 rounded-[3rem] shadow-2xl">
                   <div className="flex items-center gap-3 mb-8">
                     <Sparkles className="w-6 h-6 text-purple-500" />
                     <h3 className="text-2xl font-bold">AI Power Suggestion</h3>
                   </div>
                   <div className="space-y-4">
                     {[
                       { text: "Identify sarcasm in brand mentions", icon: <Smile className="w-5 h-5" /> },
                       { text: "Emotion mapping for product launches", icon: <Map className="w-5 h-5" /> },
                       { text: "Real-time crisis alert system", icon: <AlertTriangle className="w-5 h-5" /> },
                       { text: "Automated thematic clustering", icon: <Database className="w-5 h-5" /> }
                     ].map((item, idx) => (
                       <div key={idx} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl group hover:border-purple-500/50 transition-colors">
                         <div className="bg-purple-500/10 p-2 rounded-lg text-purple-400">
                           {item.icon}
                         </div>
                         <span className="text-sm font-medium">{item.text}</span>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- Features Section --- */}
          <section className="py-32 px-6 border-t border-[#1b1b1d]">
            <div className="max-w-7xl mx-auto space-y-20">
              <div className="text-center space-y-4">
                <h2 className="text-5xl font-black">Powerful Features</h2>
                <p className="text-[#6a6a6b]">Full suite of reputation intelligence tools built for growth.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {FEATURES.map((f, i) => (
                  <div key={i} className="p-10 bg-[#0c0c0e] border border-[#1b1b1d] rounded-3xl space-y-6 group hover:border-purple-500/50 transition-all hover:-translate-y-2">
                    <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-purple-500">{f.icon}</div>
                    <h4 className="text-xl font-bold text-white">{f.title}</h4>
                    <p className="text-sm text-[#6a6a6b] leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* --- Benefits Section: Stats --- */}
          <section className="py-32 px-6 bg-gradient-to-b from-transparent to-[#0c0c0e]">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white/5 border border-white/10 p-16 md:p-24 rounded-[4rem] text-center space-y-12 relative overflow-hidden">
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full"></div>
                <div className="space-y-6 relative z-10">
                  <h2 className="text-5xl md:text-7xl font-black">Analytics at Scale</h2>
                  <p className="text-xl text-[#a1a1a1] max-w-3xl mx-auto">Turn every digital signal into a strategic win. Scale your response capability without scaling your headcount.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                   {[
                     { label: "25M+", sub: "Sources Scanned" },
                     { label: "92%", sub: "AI Accuracy" },
                     { label: "Real-time", sub: "Latency" },
                     { label: "24/7", sub: "Monitoring" }
                   ].map(stat => (
                     <div key={stat.label} className="space-y-2">
                       <div className="text-4xl font-black text-white">{stat.label}</div>
                       <div className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">{stat.sub}</div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </section>

          {/* --- FAQ Section --- */}
          <section className="py-32 px-6 border-t border-[#1b1b1d]">
            <div className="max-w-4xl mx-auto space-y-16">
              <h2 className="text-5xl font-black text-center">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {FAQS.map((faq, i) => (
                  <div key={i} className="border-b border-[#1b1b1d]">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full py-8 flex items-center justify-between text-left group"
                    >
                      <span className={`text-lg font-bold transition-colors ${activeFaq === i ? 'text-purple-400' : 'text-white'}`}>{faq.q}</span>
                      <div className={`transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`}>
                        <ChevronDown className="w-6 h-6 text-[#4a4a4b]" />
                      </div>
                    </button>
                    {activeFaq === i && (
                      <div className="pb-8 animate-in slide-in-from-top-2 duration-300">
                        <p className="text-[#6a6a6b] leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* --- CTA: Brand Analysis --- */}
          <section className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-purple-600 p-16 md:p-24 rounded-[4rem] flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10"><BrainCircuit className="w-96 h-96" /></div>
                <div className="space-y-6 z-10 text-center lg:text-left">
                  <h2 className="text-5xl md:text-6xl font-black text-white">Get Your Free <br/>Brand Analysis</h2>
                  <p className="text-white/80 text-lg max-w-xl">Find out what people are saying about you right now with our complementary baseline report.</p>
                </div>
                <div className="z-10 w-full lg:w-auto">
                  <button onClick={() => navigateTo('contact')} className="w-full lg:w-auto px-12 py-6 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">Get My Free Analysis</button>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : currentPage === 'trends' ? (
        <main className="animate-in fade-in duration-1000">
          <section className="pt-16 pb-32 px-6">
            <div className="max-w-7xl mx-auto space-y-24">
               <div className="text-center space-y-6">
                  <h1 className="text-6xl font-black">Social Listening Trend <br/>Across Industries</h1>
                  <p className="text-[#6a6a6b] max-w-2xl mx-auto">Explore the data that drives modern brand strategy in South East Asia.</p>
               </div>
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {["Retail", "F&B", "Automotive", "Banking", "Beauty", "Tech"].map(cat => (
                    <div key={cat} className="p-12 bg-[#0c0c0e] border border-[#1b1b1d] rounded-3xl group hover:border-purple-500 transition-colors">
                      <TrendingUp className="w-10 h-10 text-purple-500 mb-8" />
                      <h4 className="text-2xl font-bold mb-4">{cat} Analysis</h4>
                      <p className="text-sm text-[#6a6a6b] mb-8">Quarterly insights on sentiment volume and emerging trends in the {cat} sector.</p>
                      <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-purple-400">View Trends <ChevronRight className="w-4 h-4" /></button>
                    </div>
                  ))}
               </div>
            </div>
          </section>
        </main>
      ) : (
        <main className="animate-in fade-in duration-1000">
          <section className="pt-16 pb-32 px-6">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">
              <div className="space-y-12">
                <h1 className="text-7xl font-black">Contact Us.</h1>
                <p className="text-xl text-[#6a6a6b]">Let's discuss how Social Intelligence can elevate your brand's data strategy.</p>
                <div className="space-y-6 pt-12">
                   <div className="flex items-center gap-6 text-[#a1a1a1] hover:text-white transition-colors cursor-pointer"><Mail className="w-6 h-6 text-purple-500" /> halo@socialintelligence.ai</div>
                   <div className="flex items-center gap-6 text-[#a1a1a1] hover:text-white transition-colors cursor-pointer"><Phone className="w-6 h-6 text-purple-500" /> +62 21 5000 8000</div>
                   <div className="flex items-center gap-6 text-[#a1a1a1] hover:text-white transition-colors cursor-pointer"><MapPin className="w-6 h-6 text-purple-500" /> SCBD, Jakarta, Indonesia</div>
                </div>
              </div>
              <form className="bg-[#0c0c0e] border border-[#1b1b1d] p-12 rounded-[3rem] space-y-6">
                <input type="text" placeholder="Full Name" className="w-full bg-[#161618] border border-[#252527] rounded-2xl p-5 text-white focus:outline-none focus:border-purple-500" />
                <input type="email" placeholder="Company Email" className="w-full bg-[#161618] border border-[#252527] rounded-2xl p-5 text-white focus:outline-none focus:border-purple-500" />
                <select className="w-full bg-[#161618] border border-[#252527] rounded-2xl p-5 text-[#a1a1a1] focus:outline-none focus:border-purple-500">
                  <option>Select Industry</option>
                  <option>Retail</option>
                  <option>F&B</option>
                  <option>Technology</option>
                </select>
                <textarea rows={4} placeholder="Your Message" className="w-full bg-[#161618] border border-[#252527] rounded-2xl p-5 text-white focus:outline-none focus:border-purple-500 resize-none"></textarea>
                <button className="w-full py-6 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all">Send Inquiry</button>
              </form>
            </div>
          </section>
        </main>
      )}

      {/* --- Footer --- */}
      <footer className="bg-[#0c0c0e] border-t border-[#1b1b1d] pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2 space-y-10">
            <div className="flex items-center gap-3">
               <img src={LOGO_URL} alt="Social Intelligence Logo" className="h-10 md:h-12 w-auto object-contain cursor-pointer" onClick={() => navigateTo('home')} />
            </div>
            <p className="text-[#6a6a6b] max-w-sm leading-relaxed">
              Leading the next generation of social listening. Based in Jakarta, empowering brands across South East Asia with high-fidelity sentiment analysis.
            </p>
            <div className="flex items-center gap-8">
              <Instagram className="w-6 h-6 text-[#4a4a4b] hover:text-white cursor-pointer" />
              <Twitter className="w-6 h-6 text-[#4a4a4b] hover:text-white cursor-pointer" />
              <Linkedin className="w-6 h-6 text-[#4a4a4b] hover:text-white cursor-pointer" />
            </div>
          </div>
          
          <div className="space-y-6">
            <h5 className="text-white font-bold text-xs uppercase tracking-widest">Company</h5>
            <ul className="space-y-4 text-sm text-[#6a6a6b]">
              <li className="hover:text-white cursor-pointer" onClick={() => navigateTo('home')}>About Us</li>
              <li className="hover:text-white cursor-pointer">Case Studies</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer" onClick={() => navigateTo('contact')}>Contact</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h5 className="text-white font-bold text-xs uppercase tracking-widest">Office Info</h5>
            <div className="space-y-4 text-sm text-[#6a6a6b]">
              <p>Jakarta, Indonesia<br/>Sudirman Central Business District</p>
              <p>halo@socialintelligence.ai</p>
              <p>+62 21 5000 8000</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-10 border-t border-[#1b1b1d] flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4a4a4b]">
          <p>© 2026 socialintelligence.ai</p>
          <div className="flex gap-10">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Use</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
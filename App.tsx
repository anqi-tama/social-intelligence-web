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
  Youtube as YoutubeIcon, 
  Facebook, 
  Music2, 
  Tv, 
  HelpCircle, 
  Newspaper, 
  Cpu, 
  AlertTriangle, 
  Smile, 
  Map, 
  Database, 
  Flame, 
  Award, 
  Trophy, 
  Info,
  ArrowLeft,
  Calendar,
  Clock,
  Share2
} from 'lucide-react';

// --- Types ---

interface Source {
  name: string;
  icon: string;
  url: string;
}

type PageType = 'home' | 'trends' | 'contact' | 'retail-blog';

// --- Constants ---

const LOGO_URL = "https://i.imgur.com/TQs8vF0.png";

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
  { q: "Does Readline Collect Historical Data?", a: "Yes, we can fetch up to 12 months of historical data depending on your plan." },
  { q: "How Does It Works?", a: "We scan 25M+ sources in real-time, process them through our Gemini-powered AI, and deliver insights to your dashboard." },
  { q: "How Accuracy is Your Sentiment And Emotion Analyst?", a: "Our AI models achieve 92%+ accuracy, specifically tuned for sarcasm and local Indonesian slang." },
  { q: "Can I track competitor?", a: "Absolutely. You can set up side-by-side tracking for up to 50 competitors." },
  { q: "Is there a free trial?", a: "We offer a free Personalized Brand Analysis report during your initial demo call." }
];

const SOURCES_TOP: Source[] = [
  { name: "Facebook", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/6949880fcf06b747a8c0ac36_X_Icon__2_-removebg-preview.png", url: "https://facebook.com" },
  { name: "Reddit", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/694d553dfa59b3a516e0acd1_Untitled_design__13_-removebg-preview.png", url: "https://reddit.com" },
  { name: "TikTok", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/694987e9e496d9d53a959d58_X_Icon__4_-removebg-preview.png", url: "https://tiktok.com" },
  { name: "Instagram", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/6949875f067dc35f082f2550_X_Icon__1_-removebg-preview%20(1).png", url: "https://instagram.com" },
  { name: "X", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/694987a060ad1141f0ff3e1d_X_Icon__3_-removebg-preview.png", url: "https://x.com" },
];

const SOURCES_BOTTOM: Source[] = [
  { name: "LinkedIn", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/694cde8991a13a0bfec26c88_Untitled_design__2_-removebg-preview-removebg-preview.png", url: "https://linkedin.com" },
  { name: "Kompas", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/694d5184ab14320b4214ea65_Untitled_design__10_-removebg-preview.png", url: "https://kompas.com" },
  { name: "CNN", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/694d53d198c9a634df22df28_Untitled_design__12_-removebg-preview.png", url: "https://cnn.com" },
  { name: "CNBC", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/694ce747655a37d8f6c4c256_Untitled_design__5_-removebg-preview.png", url: "https://cnbc.com" },
  { name: "Quora", icon: "https://cdn.prod.website-files.com/693645fac59cc49511b119e3/694d4e72a03268968c0a0492_Untitled_design__9_-removebg-preview.png", url: "https://quora.com" },
];

// --- Sub-components ---

const AnnouncementBar = () => (
  <div className="bg-gradient-to-r from-red-600 to-red-900 text-white text-center py-2.5 px-4 text-[10px] md:text-xs font-bold tracking-widest uppercase relative z-[70]">
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

const DashboardPreview = () => (
  <div className="w-full max-w-6xl mx-auto p-6 md:p-8 bg-[#0c0c0e] rounded-3xl border border-[#1b1b1d] shadow-2xl overflow-hidden text-white font-sans">
    {/* Top Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[
        { label: "Social Mentions (Nov)", val: "30,450", sub: "Target: 28k–32k", badge: "On Track", badgeColor: "bg-emerald-500/10 text-emerald-400" },
        { label: "Web Search Mentions", val: "1,900+", sub: "Potential SEO/SEM", badge: "Growing", badgeColor: "bg-red-500/10 text-red-400" },
        { label: "Earned Media Value", val: "US$12.6M", sub: "Target: US$11.8M+", badge: "High Value", badgeColor: "bg-blue-500/10 text-blue-400" },
        { label: "Sales Velocity (MoM)", val: "+28%", sub: "Driven by Sunscreen", badge: "Exceeded", badgeColor: "bg-emerald-500/10 text-emerald-400" },
      ].map((card, i) => (
        <div key={i} className="bg-[#161618] p-5 rounded-xl border border-[#252527] shadow-sm">
          <div className="text-[11px] font-semibold text-gray-500 mb-2 uppercase tracking-tight">{card.label}</div>
          <div className="text-3xl font-black mb-1">{card.val}</div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-[10px] text-gray-500 font-medium">{card.sub}</span>
            <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${card.badgeColor}`}>{card.badge}</span>
          </div>
        </div>
      ))}
    </div>

    {/* Bottom Section */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-[#161618] p-6 rounded-2xl border border-[#252527] shadow-sm text-left">
        <div className="flex items-center justify-between mb-8">
          <h4 className="text-lg font-bold">Analysis Comparison</h4>
          <Info className="w-4 h-4 text-gray-600" />
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10 text-center">
             <div className="text-xl font-black text-emerald-400">94%</div>
             <div className="text-[9px] font-black text-emerald-400/80 uppercase tracking-widest mt-1">POS. SENTIMENT</div>
          </div>
          <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/10 text-center">
             <div className="text-xl font-black text-red-400">+10</div>
             <div className="text-[9px] font-black text-red-400/80 uppercase tracking-widest mt-1">GROWTH PTS</div>
          </div>
          <div className="bg-rose-500/5 p-4 rounded-xl border border-rose-500/10 text-center">
             <div className="text-[13px] font-black text-rose-400">"Sold Out Everywhere"</div>
             <div className="text-[9px] font-black text-rose-400/80 uppercase tracking-widest mt-1">TOP CHALLENGE</div>
          </div>
        </div>

        {/* Mock Chart */}
        <div className="relative h-64 flex items-end justify-around border-b border-[#252527] pb-2">
           <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-gray-600 font-medium">
             <span>28</span><span>21</span><span>14</span><span>7</span><span>0</span>
           </div>
           
           <div className="flex flex-col items-center gap-2 group">
              <div className="flex gap-1 items-end h-40">
                <div className="w-10 bg-emerald-700/60 rounded-t-sm h-full shadow-sm"></div>
                <div className="w-10 bg-emerald-500 rounded-t-sm h-[85%] shadow-sm"></div>
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">Ramadan Baseline</span>
           </div>

           <div className="flex flex-col items-center gap-2">
              <div className="flex gap-1 items-end h-56">
                <div className="w-10 bg-red-700/60 rounded-t-sm h-[80%] shadow-sm"></div>
                <div className="w-10 bg-red-500 rounded-t-sm h-full shadow-sm"></div>
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">Nov Viral Pivot</span>
           </div>
        </div>
      </div>

      <div className="space-y-6 text-left">
        <div className="bg-red-500/5 p-6 rounded-2xl border border-red-500/10">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-4 h-4 text-red-400" />
            <h5 className="text-sm font-black text-red-400 uppercase tracking-tight">Awards & Recognition</h5>
          </div>
          <div className="space-y-4">
            <div className="bg-[#161618] p-4 rounded-xl flex items-center gap-4 border border-[#252527] shadow-sm">
               <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-400"><Award className="w-5 h-5" /></div>
               <div>
                 <div className="text-xs font-black text-gray-200">MMA Smarties 2025</div>
                 <div className="text-[10px] font-medium text-gray-500">Brand of the Year</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MegaMenu = ({ isOpen, onClose, navigateTo }: { isOpen: boolean; onClose: () => void; navigateTo: (p: PageType) => void }) => {
  if (!isOpen) return null;
  return (
    <div 
      className="absolute top-full left-0 w-full bg-[#070709] border-b border-[#1b1b1d] p-12 grid grid-cols-4 gap-12 animate-in slide-in-from-top-4 duration-300 z-50 shadow-2xl"
      onMouseLeave={onClose}
    >
      <div className="space-y-6">
        <h4 className="text-red-500 font-bold text-xs uppercase tracking-widest">Solutions</h4>
        <ul className="space-y-4">
          {["Brand Intelligence", "Crisis Management", "Competitor Tracking", "Market Research"].map(item => (
            <li key={item} className="group cursor-pointer">
              <div className="text-white font-bold group-hover:text-red-400 transition-colors flex items-center gap-2">{item} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100" /></div>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-6">
        <h4 className="text-red-500 font-bold text-xs uppercase tracking-widest">Industry Trends</h4>
        <ul className="space-y-4">
          <li className="text-[#a1a1a1] hover:text-white cursor-pointer text-sm transition-colors font-bold" onClick={() => navigateTo('retail-blog')}>Retail & E-commerce (Case Study)</li>
          {["Hospitality", "Healthcare", "Financial Services"].map(item => (
            <li key={item} className="text-[#a1a1a1] hover:text-white cursor-pointer text-sm transition-colors" onClick={() => navigateTo('trends')}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="space-y-6">
        <h4 className="text-red-500 font-bold text-xs uppercase tracking-widest">Resources</h4>
        <ul className="space-y-4">
          {["Intelligence Reports", "Case Studies", "Documentation"].map(item => (
            <li key={item} className="text-[#a1a1a1] hover:text-white cursor-pointer text-sm transition-colors">{item}</li>
          ))}
        </ul>
      </div>
      <div className="bg-gradient-to-br from-[#161618] to-[#0c0c0e] p-8 rounded-3xl border border-[#252527] space-y-4">
        <Sparkles className="text-red-500 w-8 h-8" />
        <h4 className="text-white font-bold text-lg">Featured Insights</h4>
        <p className="text-[#6a6a6b] text-xs leading-relaxed">Wardah 2025 Growth Pivot: Movement + Glow Performance Analysis.</p>
        <button onClick={() => navigateTo('retail-blog')} className="text-red-400 text-xs font-black uppercase flex items-center gap-2 hover:text-red-300 transition-colors">READ CASE STUDY <ChevronRight className="w-3 h-3" /></button>
      </div>
    </div>
  );
};

const Breadcrumbs = ({ current }: { current: PageType }) => {
  const labels: Record<PageType, string> = { home: 'Home', trends: 'Industry Trends', contact: 'Contact', 'retail-blog': 'Retail & E-commerce Case Study' };
  return (
    <div className="w-full bg-[#070709] border-b border-[#1b1b1d] relative z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-[9px] uppercase font-bold tracking-[0.2em] text-[#4a4a4b]">
        <span className="hover:text-white cursor-pointer transition-colors" onClick={() => window.location.reload()}>READLINE</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-red-500">{labels[current]}</span>
      </div>
    </div>
  );
};

const SourceCard: React.FC<{ source: Source }> = ({ source }) => (
  <a 
    href={source.url} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="w-40 h-32 md:w-48 md:h-40 bg-[#121214] border border-[#1b1b1d] rounded-2xl flex flex-col items-center justify-center gap-4 mx-2 md:mx-4 shrink-0 transition-all hover:border-red-500/50 hover:bg-[#18181b] hover:scale-105 active:scale-95 cursor-pointer group"
  >
    <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
      <img 
        src={source.icon} 
        alt={source.name} 
        className="w-full h-full object-contain filter brightness-0 invert" 
        loading="lazy"
      />
    </div>
    <span className="text-[10px] md:text-xs font-bold text-[#6a6a6b] uppercase tracking-widest group-hover:text-white transition-colors text-center px-4">{source.name}</span>
  </a>
);

// --- Retail Blog Component ---

const RetailBlogPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto px-6 py-12 space-y-24 text-left font-['Inter']">
      <button onClick={onBack} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-500 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </button>

      {/* Hero Section */}
      <section className="space-y-12">
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-[10px] font-bold text-red-400 uppercase tracking-widest">
            <span className="bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">Case Study</span>
            <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> Published 2025</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight max-w-5xl">
            Wardah and the Psychology of Ramadan: How a Beauty Brand Became a Cultural Ritual
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 text-lg leading-relaxed text-[#a1a1a1]">
          <div className="lg:col-span-2 space-y-8">
            <p className="text-white font-medium text-xl border-l-4 border-red-500 pl-6 py-2">
              As one of the biggest skincare and makeup brands in Indonesia and even in Southeast Asia, Wardah understands one crucial truth: in the world’s largest Muslim country, religion doesn’t just influence life. It shapes it.
            </p>
            <p>
              This is why, for many Indonesian Muslim women, the real question isn't "Is this product good?" or even "Is this safe?" It's: "Is it okay for me to wear this?" Not socially okay. Religiously okay. Approved not just by doctors or influencers, but by God. And without clear guidance, makeup feels morally ambiguous: am I caring for myself, or crossing a spiritual line?
            </p>
            <p>
              Wardah steps into that gap. By making beauty explicitly halal and wrapping it in religious language, Ramadan rituals, and moral storytelling, it removes the doubt. It offers not emotional comfort, but <strong>moral clearance</strong>.
            </p>
            <p>
              In a market where products increasingly look alike in quality, price, and trendiness, something else decides who wins: meaning.
            </p>
            <p>
              Wardah attached itself to a very specific one: <br/>
              <strong>"The beauty brand for women trying to be better Muslims."</strong>
            </p>
            <p>
              Not just halal-certified. Values-aligned. That single shift transforms makeup from something cosmetic into something spiritually safe. Wardah doesn’t just sell products it sells <strong>moral reassurance</strong>.
            </p>
          </div>
          <div className="space-y-6">
            <div className="bg-[#161618] p-8 rounded-[2.5rem] border border-[#252527] h-fit">
              <h4 className="text-white font-black uppercase tracking-tight text-sm mb-6 flex items-center gap-2">
                <Activity className="w-4 h-4 text-red-500" /> Strategy Insight
              </h4>
              <p className="text-sm italic text-[#6a6a6b]">
                "Wardah doesn't just sell products; it sells moral reassurance."
              </p>
              <div className="mt-8 p-4 bg-red-500/5 rounded-2xl border border-red-500/10">
                <span className="text-[10px] font-black text-red-400 uppercase block mb-2">Primary Goal</span>
                <span className="text-white font-bold text-sm">Value Alignment over Trends</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Ramadan is Strongest Season */}
      <section className="space-y-12">
        <h2 className="text-4xl font-black text-white">Why Ramadan is Wardah’s strongest season</h2>
        <div className="grid lg:grid-cols-2 gap-12 text-[#a1a1a1] leading-relaxed text-lg">
          <div className="space-y-6">
            <p>
              Every year, Ramadan becomes Wardah’s biggest moment. Not because they shout louder than other brands. But because they turn Ramadan into their <strong>cultural home turf</strong>.
            </p>
            <p>
              While many brands treat Ramadan as a seasonal promotion, Wardah treats it as a <strong>memory-building season</strong>. A time when people are more reflective, more emotionally open, and more sensitive to their spiritual identity.
            </p>
            <p>
              Because they understand one thing: during Ramadan, beauty is not the battlefield. <strong>Emotion is.</strong>
            </p>
            <p>
              This is the question Wardah really asks: <br/>
              <em>“What does it feel like to be a Muslim woman during Ramadan?”</em>
            </p>
            <p>
              In this month, many women are not trying to be more trendy or more expressive. They are trying to be more:
            </p>
            <ul className="list-disc pl-8 space-y-2">
              <li>pure</li>
              <li>disciplined</li>
              <li>spiritually aligned</li>
              <li>responsible as daughters, mothers, and wives</li>
            </ul>
          </div>
          <div className="space-y-6">
            <p>
              Wardah places itself right inside that emotional state. That is why their Ramadan campaigns feel different. They don’t feel like ads. They feel like part of the month itself.
            </p>
            <p>
              The proof is in what persists. In 2023, Wardah's #BersamaLebihBermakna campaign reached 40 million Indonesians. Online sales nearly doubled. But the more telling metric was behavioral: <strong>regular usage</strong> — women reaching for Wardah not because they saw an ad, but out of habit increased by 10 percentage points and remained elevated a full month after Ramadan ended.
            </p>
            <p>
              The habit outlasted the holy month. The ritual became routine.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Timeline Section */}
      <section className="space-y-8">
        <h3 className="text-2xl font-black text-white uppercase tracking-widest text-center">Ramadhan Campaign Timeline</h3>
        <div className="relative group">
          <img 
            src="https://cdn.prod.website-files.com/693645fac59cc49511b119e3/69498a44b7d60232400e9603_Untitled_design-removebg-preview.png" 
            alt="Wardah Ramadhan Campaign Timeline" 
            className="w-full h-auto rounded-[3rem] shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 rounded-[3rem] border border-white/5 pointer-events-none"></div>
        </div>
      </section>

      {/* Zia Campaign Detail */}
      <section className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 text-[#a1a1a1] text-lg leading-relaxed">
          <h2 className="text-4xl font-black text-white">Two years later, the approach remains unchanged only sharper</h2>
          <p>
            In Ramadan 2025, Wardah launched <em>Menangkan Langkah Kebaikan</em> (Win the Steps of Kindness), a campaign following Zia, a young woman who asks her mother to remove her hijab. The narrative explores self-discovery while staying true to faith—a story that resonated deeply with Wardah's core audience.
          </p>
          <p>
            The campaign did not chase hard sales. It told a story. On Instagram, reels surpassed 5.6 million views. The short film on YouTube drew 84,000 views and comments like: <em>"I'd keep watching if Wardah keeps producing meaningful series like this"</em>.
          </p>
          <p>
            This is not a promotional spike. This is structural loyalty. Wardah does not merely transact during Ramadan; it <strong>encodes itself</strong> into women's daily practice year after year.
          </p>
        </div>
        <div className="relative group">
          <img 
            src="https://cdn.prod.website-files.com/693645fac59cc49511b119e3/69498a96cc07817452d3a771_Untitled_design__1_-removebg-preview.png" 
            alt="Menangkan Langkah Kebaikan Impact Chart" 
            className="w-full h-auto rounded-[3rem] shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </div>
      </section>

      {/* Why continuity matters more than trends */}
      <section className="space-y-12">
        <h2 className="text-4xl font-black text-white">Why continuity matters more than trends</h2>
        <div className="grid lg:grid-cols-2 gap-12 text-[#a1a1a1] text-lg leading-relaxed">
          <div className="space-y-6">
            <p>
              Wardah does not chase what is fashionable each year. They build continuity. Look at their campaign taglines across five years:
            </p>
            <div className="space-y-4 font-bold text-white bg-white/5 p-8 rounded-3xl border border-white/10">
              <p>2021 → #LangkahBaikmuBerarti — <span className="text-[#a1a1a1]">Your Good Steps Matter</span></p>
              <p>2022 → #BergerakHidupkanHarapan — <span className="text-[#a1a1a1]">Move to Bring Hope to Life</span></p>
              <p>2023 → #BersamaLebihBermakna — <span className="text-[#a1a1a1]">Together is More Meaningful</span></p>
              <p>2024 → #TeruskanLangkahBaikmu — <span className="text-[#a1a1a1]">Continue Your Good Steps</span></p>
              <p>2025 → #MenangkanLangkahKebaikan — <span className="text-[#a1a1a1]">Win the Steps of Kindness</span></p>
            </div>
          </div>
          <div className="space-y-6">
            <p>
              At first glance, these appear distinct. Different words. Different creative executions. But beneath the surface, a single thread binds them together. The words, never spoken in any tagline yet present in all of them: <strong>Good Steps</strong>.
            </p>
            <p>
              Using those words, Wardah has spent five Ramadans teaching Indonesian women that those two words belong to them. Not as a slogan.
            </p>
          </div>
        </div>
      </section>

      {/* Final Conclusion Section */}
      <section className="max-w-4xl mx-auto space-y-12 py-16 bg-white/5 rounded-[4rem] p-12 border border-white/10">
        <h2 className="text-4xl font-black text-center text-white">Why Ramadan Belongs to Wardah</h2>
        <div className="space-y-8 text-lg text-[#a1a1a1] leading-relaxed">
          <p>
            Wardah does not win Ramadan because they spend the most. They do not win because they have the most influencers, the loudest activations, or the most aggressive sales push. None of that explains why their campaigns never feel like ads, or why women continue reaching for Wardah long after Eid moon is sighted.
          </p>
          <p>
            They win because they return every Ramadan with the consistent messages and let time do the rest. Five years. Five taglines. One thread. Not a new message each season, but the same message deepened: <em>you are becoming better, and we have accompanied you through every attempt.</em>
          </p>
          <p>
            The words change slightly. The meaning does not. And after half a decade of repetition, those words are no longer a slogan. They are a shared vocabulary between brand and consumer, a linguistic home that women return to each Ramadan the way they return to familiar prayers.
          </p>
          <p>
            <strong>This is how marketing becomes tradition.</strong>
          </p>
          <p>
            Not through virality. Not through reach. Through reappearance so consistent, so faithful to its own thesis, that it eventually ceases to be perceived as commercial speech. It becomes simply <strong>what Ramadan feels like.</strong>
          </p>
          <p>
            And when a brand becomes part of a religious tradition, it stops being a choice. It becomes a companion. Not evaluated, not compared, not reconsidered each year. Just present.
          </p>
        </div>
        <div className="pt-12 text-center">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-2 px-10 py-5 border border-red-500/20 bg-red-500/10 text-red-500 rounded-full font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
            Return to Top
          </button>
        </div>
      </section>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
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

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    setIsMegaMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white selection:bg-red-500 selection:text-white font-['Inter']">
      
      <header className="fixed top-0 left-0 w-full z-50 flex flex-col">
        <AnnouncementBar />
        <nav className="w-full border-b border-[#1b1b1d] bg-[#070709]">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo('home')}>
              <img src={LOGO_URL} alt="READLINE Logo" className="h-10 md:h-12 w-auto object-contain" />
            </div>

            <div className="hidden md:flex items-center gap-10">
              <button onClick={() => navigateTo('home')} className={`text-xs font-bold uppercase tracking-widest ${currentPage === 'home' ? 'text-white' : 'text-[#6a6a6b] hover:text-white'}`}>Home</button>
              <button onMouseEnter={() => setIsMegaMenuOpen(true)} className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${currentPage === 'trends' || currentPage === 'retail-blog' ? 'text-white' : 'text-[#6a6a6b] hover:text-white'}`}>Industry Trends <ChevronDown className="w-3 h-3" /></button>
              <button onClick={() => navigateTo('contact')} className={`text-xs font-bold uppercase tracking-widest ${currentPage === 'contact' ? 'text-white' : 'text-[#6a6a6b] hover:text-white'}`}>Contact</button>
              <button onClick={() => navigateTo('contact')} className="bg-white text-black px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">Book Demo</button>
            </div>

            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
          <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} navigateTo={navigateTo} />
        </nav>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#070709] z-[100] p-12 flex flex-col gap-10 animate-in fade-in duration-300">
          <div className="flex justify-between items-center">
            <img src={LOGO_URL} alt="READLINE Logo" className="h-10 w-auto object-contain cursor-pointer" onClick={() => navigateTo('home')} />
            <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8" /></button>
          </div>
          <div className="flex flex-col gap-8 text-4xl font-black">
            <button onClick={() => navigateTo('home')}>Home</button>
            <button onClick={() => navigateTo('trends')}>Trends</button>
            <button onClick={() => navigateTo('retail-blog')}>Retail Analysis</button>
            <button onClick={() => navigateTo('contact')}>Contact</button>
          </div>
          <button className="mt-auto bg-red-600 py-6 rounded-3xl font-black text-xl">Book Demo</button>
        </div>
      )}

      {/* Spacer to push content below the fixed header (Announcement Bar + Nav) */}
      <div className="h-[120px] md:h-[130px]" />

      <Breadcrumbs current={currentPage} />

      {currentPage === 'home' ? (
        <main className="animate-in fade-in duration-1000">
          <section className="pt-16 pb-32 px-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
              <div className="w-full h-full bg-gradient-to-l from-red-500/20 to-transparent"></div>
            </div>
            
            <div className="max-w-6xl mx-auto text-center space-y-12">
              <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter gradient-text">
                From Noise to Signal
              </h1>
              <div className="max-w-5xl mx-auto space-y-8">
                <p className="text-xl text-[#6a6a6b] leading-relaxed">
                  Track every brand mention across TikTok, Instagram, Threads, Facebook, X, YouTube, Reddit, news, reviews & more—in one dashboard. See where the conversation is heading next. No gaps, no sampling, no surprise overages
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button onClick={() => navigateTo('contact')} className="w-full sm:w-auto px-12 py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">Book Demo</button>
                  <button onClick={() => navigateTo('contact')} className="w-full sm:w-auto px-12 py-5 border border-white/10 bg-white/5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">Contact Us</button>
                </div>

                <DashboardPreview />

                <div className="text-[10px] font-bold text-red-400 uppercase tracking-[0.3em] mt-8">
                  Wardah brand performance during November 2025
                </div>
              </div>
            </div>
          </section>

          <section className="py-32 relative overflow-hidden border-t border-[#1b1b1d]">
            <div className="max-w-7xl mx-auto px-6 mb-24">
              <h2 className="text-5xl md:text-7xl font-black text-center text-white tracking-tighter">Reputation Intelligence at Scale</h2>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
              <div className="w-48 h-48 md:w-64 md:h-64 bg-black rounded-full border-4 border-red-500/30 flex flex-col items-center justify-center shadow-[0_0_80px_rgba(239,68,68,0.3)] animate-pulse">
                <span className="text-4xl md:text-6xl font-black text-white">25M+</span>
                <span className="text-xs md:text-sm font-bold text-[#a1a1a1] uppercase tracking-[0.3em]">Sources</span>
              </div>
            </div>

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

          <section className="py-32 px-6 border-t border-[#1b1b1d]">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10">
                <div className="space-y-4 text-left">
                  <div className="text-red-500 font-bold text-xs uppercase tracking-widest">About Section</div>
                  <h2 className="text-5xl font-black text-white">Access Customer Insight</h2>
                  <p className="text-lg text-[#6a6a6b] leading-relaxed">Learn from online conversations about your company. Get access to honest consumer feedback and understand why users choose you over competitors.</p>
                </div>
                
                <div className="relative h-72 overflow-hidden text-left">
                  <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${currentCaseIndex === 0 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                    <div className="bg-[#161618] border border-[#252527] p-10 rounded-[2.5rem] h-full relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity"><TrendingUp className="w-32 h-32" /></div>
                       <h4 className="text-2xl font-bold text-white mb-4">UGM Case Example</h4>
                       <p className="text-sm text-[#a1a1a1] leading-relaxed mb-8">How a leading educational institution optimized their public reputation by analyzing sentiment across student communities in real-time.</p>
                       <a 
                        href="https://imm-studycase.vercel.app/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-red-900/20"
                       >
                         READ NOW <ArrowUpRight className="w-4 h-4" />
                       </a>
                    </div>
                  </div>
                  <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${currentCaseIndex === 1 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                    <div className="bg-[#161618] border border-red-500/30 p-10 rounded-[2.5rem] h-full relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity"><Sparkles className="w-32 h-32" /></div>
                       <h4 className="text-2xl font-bold text-white mb-4">WARDAH Case Example</h4>
                       <p className="text-sm text-[#a1a1a1] leading-relaxed mb-6">Discovery our latest Wardah Brand Growth Pivot analysis. Understanding consumer movement and glow performance signals.</p>
                       <button 
                        onClick={() => navigateTo('retail-blog')}
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-red-900/20"
                       >
                         READ NOW <ArrowUpRight className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 justify-center lg:justify-start">
                  <button onClick={() => setCurrentCaseIndex(0)} className={`w-8 h-1 rounded-full transition-all ${currentCaseIndex === 0 ? 'bg-red-500' : 'bg-[#252527]'}`}></button>
                  <button onClick={() => setCurrentCaseIndex(1)} className={`w-8 h-1 rounded-full transition-all ${currentCaseIndex === 1 ? 'bg-red-500' : 'bg-[#252527]'}`}></button>
                </div>
              </div>

              <div className="relative text-left">
                <div className="absolute inset-0 bg-red-600/20 blur-[120px] rounded-full"></div>
                <div className="relative bg-[#0c0c0e] border border-white/5 p-12 rounded-[3rem] shadow-2xl">
                   <div className="flex items-center gap-3 mb-8">
                     <Sparkles className="w-6 h-6 text-red-500" />
                     <h3 className="text-2xl font-bold">AI Power Suggestion</h3>
                   </div>
                   <div className="space-y-4">
                     {[
                       { text: "Identify sarcasm in brand mentions", icon: <Smile className="w-5 h-5" /> },
                       { text: "Emotion mapping for product launches", icon: <Map className="w-5 h-5" /> },
                       { text: "Real-time crisis alert system", icon: <AlertTriangle className="w-5 h-5" /> },
                       { text: "Automated thematic clustering", icon: <Database className="w-5 h-5" /> }
                     ].map((item, idx) => (
                       <div key={idx} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl group hover:border-red-500/50 transition-colors">
                         <div className="bg-red-500/10 p-2 rounded-lg text-red-400">
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

          <section className="py-32 px-6 border-t border-[#1b1b1d]">
            <div className="max-w-7xl mx-auto space-y-20">
              <div className="text-center space-y-4">
                <h2 className="text-5xl font-black">Powerful Features</h2>
                <p className="text-[#6a6a6b]">Full suite of reputation intelligence tools built for growth.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                {FEATURES.map((f, i) => (
                  <div key={i} className="p-10 bg-[#0c0c0e] border border-[#1b1b1d] rounded-3xl space-y-6 group hover:border-red-500/50 transition-all hover:-translate-y-2">
                    <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center text-red-500">{f.icon}</div>
                    <h4 className="text-xl font-bold text-white">{f.title}</h4>
                    <p className="text-sm text-[#6a6a6b] leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-32 px-6 bg-gradient-to-b from-transparent to-[#0c0c0e]">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white/5 border border-white/10 p-16 md:p-24 rounded-[4rem] text-center space-y-12 relative overflow-hidden">
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-red-500/20 blur-[100px] rounded-full"></div>
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
                       <div className="text-[10px] font-bold text-red-400 uppercase tracking-widest">{stat.sub}</div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-32 px-6 border-t border-[#1b1b1d]">
            <div className="max-w-4xl mx-auto space-y-16">
              <h2 className="text-5xl font-black text-center">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {FAQS.map((faq, i) => (
                  <div key={i} className="border-b border-[#1b1b1d] text-left">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full py-8 flex items-center justify-between text-left group"
                    >
                      <span className={`text-lg font-bold transition-colors ${activeFaq === i ? 'text-red-400' : 'text-white'}`}>{faq.q}</span>
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

          <section className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-gradient-to-br from-red-600 to-red-800 p-16 md:p-24 rounded-[4rem] flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden text-left">
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
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                  <div className="p-12 bg-[#0c0c0e] border border-red-500/30 rounded-3xl group hover:border-red-500 transition-colors cursor-pointer" onClick={() => navigateTo('retail-blog')}>
                    <TrendingUp className="w-10 h-10 text-red-500 mb-8" />
                    <h4 className="text-2xl font-bold mb-4">Retail Analysis</h4>
                    <p className="text-sm text-[#6a6a6b] mb-8">Case Study: Wardah and the Psychology of Ramadan. Understanding brand rituals.</p>
                    <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-400">View Deep Dive <ChevronRight className="w-4 h-4" /></button>
                  </div>
                  {["F&B", "Automotive", "Banking", "Beauty", "Tech"].map(cat => (
                    <div key={cat} className="p-12 bg-[#0c0c0e] border border-[#1b1b1d] rounded-3xl group hover:border-red-500 transition-colors">
                      <TrendingUp className="w-10 h-10 text-red-500 mb-8" />
                      <h4 className="text-2xl font-bold mb-4">{cat} Analysis</h4>
                      <p className="text-sm text-[#6a6a6b] mb-8">Quarterly insights on sentiment volume and emerging trends in the {cat} sector.</p>
                      <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-400">View Trends <ChevronRight className="w-4 h-4" /></button>
                    </div>
                  ))}
               </div>
            </div>
          </section>
        </main>
      ) : currentPage === 'retail-blog' ? (
        <RetailBlogPage onBack={() => navigateTo('home')} />
      ) : (
        <main className="animate-in fade-in duration-1000">
          <section className="pt-16 pb-32 px-6">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 text-left">
              <div className="space-y-12">
                <h1 className="text-7xl font-black">Contact Us.</h1>
                <p className="text-xl text-[#6a6a6b]">Let's discuss how READLINE can elevate your brand's data strategy.</p>
                <div className="space-y-6 pt-12">
                   <a href="mailto:halo@thereadline.com" className="flex items-center gap-6 text-[#a1a1a1] hover:text-white transition-colors cursor-pointer"><Mail className="w-6 h-6 text-red-500" /> halo@thereadline.com</a>
                   <a href="https://wa.me/628992939911" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 text-[#a1a1a1] hover:text-white transition-colors cursor-pointer"><Phone className="w-6 h-6 text-red-500" /> WhatsApp Us</a>
                   <div className="flex items-center gap-6 text-[#a1a1a1] hover:text-white transition-colors cursor-pointer"><MapPin className="w-6 h-6 text-red-500" /> Menara Salemba, Jalan Salemba Raya No. 5A 10440 Jakarta Jakarta</div>
                </div>
              </div>
              <form className="bg-[#0c0c0e] border border-[#1b1b1d] p-12 rounded-[3rem] space-y-6">
                <input type="text" placeholder="Full Name" className="w-full bg-[#161618] border border-[#252527] rounded-2xl p-5 text-white focus:outline-none focus:border-red-500" />
                <input type="email" placeholder="Company Email" className="w-full bg-[#161618] border border-[#252527] rounded-2xl p-5 text-white focus:outline-none focus:border-red-500" />
                <select className="w-full bg-[#161618] border border-[#252527] rounded-2xl p-5 text-[#a1a1a1] focus:outline-none focus:border-red-500">
                  <option>Select Industry</option>
                  <option>Retail</option>
                  <option>F&B</option>
                  <option>Technology</option>
                </select>
                <textarea rows={4} placeholder="Your Message" className="w-full bg-[#161618] border border-[#252527] rounded-2xl p-5 text-white focus:outline-none focus:border-red-500 resize-none"></textarea>
                <button className="w-full py-6 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">Send Inquiry</button>
              </form>
            </div>
          </section>
        </main>
      )}

      <footer className="bg-[#0c0c0e] border-t border-[#1b1b1d] pt-32 pb-16 px-6 text-left">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2 space-y-10">
            <div className="flex items-center gap-3">
               <img src={LOGO_URL} alt="READLINE Logo" className="h-10 md:h-12 w-auto object-contain cursor-pointer" onClick={() => navigateTo('home')} />
            </div>
            <p className="text-[#6a6a6b] max-sm leading-relaxed">
              Based in Jakarta, The Readline helps brands capture real conversations and understand what’s actually shifting sentiment. 
            </p>
            <div className="flex items-center gap-8">
              <a href="https://www.instagram.com/thereadlineid?igsh=eTY2enJjcXdhamUz" target="_blank" rel="noopener noreferrer"><Instagram className="w-6 h-6 text-[#4a4a4b] hover:text-white cursor-pointer" /></a>
              <a href="https://x.com/thereadlineid" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#4a4a4b] hover:text-white cursor-pointer transition-colors" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
              <a href="https://www.linkedin.com/showcase/read-line-id" target="_blank" rel="noopener noreferrer"><Linkedin className="w-6 h-6 text-[#4a4a4b] hover:text-white cursor-pointer" /></a>
            </div>
          </div>
          
          <div className="space-y-6">
            <h5 className="text-white font-bold text-xs uppercase tracking-widest">Company</h5>
            <ul className="space-y-4 text-sm text-[#6a6a6b]">
              <li className="hover:text-white cursor-pointer" onClick={() => navigateTo('home')}>About Us</li>
              <li className="hover:text-white cursor-pointer" onClick={() => navigateTo('retail-blog')}>Case Studies</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer" onClick={() => navigateTo('contact')}>Contact</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h5 className="text-white font-bold text-xs uppercase tracking-widest">Office Info</h5>
            <div className="space-y-4 text-sm text-[#6a6a6b]">
              <p>Menara Salemba, Jalan Salemba Raya No. 5A 10440 Jakarta Jakarta</p>
              <a href="mailto:halo@thereadline.com" className="block hover:text-white transition-colors">halo@thereadline.com</a>
              <a href="https://wa.me/628992939911" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">WhatsApp Us</a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-10 border-t border-[#1b1b1d] flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4a4a4b]">
          <p>© 2026 Thereadline.com</p>
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
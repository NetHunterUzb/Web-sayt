import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  Terminal, 
  Cpu, 
  Globe, 
  MessageSquare, 
  BookOpen, 
  Download, 
  Github, 
  ChevronRight, 
  Menu, 
  X,
  Wifi,
  Lock,
  Zap,
  Smartphone,
  Search,
  ArrowRight,
  Send
} from "lucide-react";
import SecurityAssistant from './components/SecurityAssistant';
import ToolCard from './components/ToolCard';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tools = [
    {
      title: "NetHunter Installer",
      description: "Android qurilmalari uchun Kali NetHunter-ni oson o'rnatish skripti.",
      category: "Installation",
      status: "stable" as const,
      url: "https://github.com/nethunter-uz/installer"
    },
    {
      title: "Uz-WiFi-Audit",
      description: "O'zbekistondagi WiFi tarmoqlarini audit qilish uchun maxsus vositalar to'plami.",
      category: "Wireless",
      status: "beta" as const,
      url: "https://github.com/nethunter-uz/wifi-audit"
    },
    {
      title: "Termux-Setup",
      description: "NetHunter va Termux muhitini mukammal sozlash uchun avtomatlashtirilgan skript.",
      category: "Environment",
      status: "stable" as const,
      url: "https://github.com/nethunter-uz/termux-setup"
    },
    {
      title: "Vuln-Scanner",
      description: "Mahalliy tarmoqlardagi zaifliklarni aniqlash uchun tezkor skaner.",
      category: "Scanning",
      status: "experimental" as const
    }
  ];

  const navItems = [
    { id: 'home', label: 'Asosiy', icon: <Globe size={18} /> },
    { id: 'tools', label: 'Asboblar', icon: <Terminal size={18} /> },
    { id: 'guides', label: 'Qo\'llanmalar', icon: <BookOpen size={18} /> },
    { id: 'community', label: 'Hamjamiyat', icon: <MessageSquare size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-cyber-bg selection:bg-cyber-accent selection:text-black">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cyber-bg/80 backdrop-blur-md border-b border-cyber-border py-3' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="p-2 bg-cyber-accent rounded-lg group-hover:rotate-12 transition-transform">
              <Shield className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">
              NETHUNTER <span className="text-cyber-accent">UZ</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 bg-cyber-card/50 border border-cyber-border p-1 rounded-full">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  activeTab === item.id 
                    ? 'bg-cyber-accent text-black shadow-[0_0_15px_rgba(0,255,65,0.3)]' 
                    : 'text-cyber-text-dim hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://t.me/nethunter_uz" 
              target="_blank" 
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-all text-sm font-medium"
            >
              <Send size={16} />
              Telegram
            </a>
            <button 
              className="md:hidden p-2 text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-cyber-bg pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
                  className={`flex items-center gap-4 p-4 rounded-xl border ${
                    activeTab === item.id 
                      ? 'bg-cyber-accent/10 border-cyber-accent text-cyber-accent' 
                      : 'bg-cyber-card border-cyber-border text-white'
                  }`}
                >
                  {item.icon}
                  <span className="text-lg font-semibold">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-32">
        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-accent/10 border border-cyber-accent/20 rounded-full text-cyber-accent text-xs font-mono tracking-widest uppercase"
            >
              <Zap size={14} />
              O'zbekistonning eng yirik xavfsizlik hamjamiyati
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white"
            >
              ANDROID <span className="text-cyber-accent">XAVFSIZLIK</span> <br />
              LABORATORIYASI.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-cyber-text-dim max-w-xl leading-relaxed"
            >
              Kali NetHunter-ni o'rganing, yangi vositalarni kashf eting va 
              O'zbekistondagi axborot xavfsizligi mutaxassislari bilan tajriba almashing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button className="px-8 py-4 bg-cyber-accent text-black font-bold rounded-xl hover:shadow-[0_0_30px_rgba(0,255,65,0.4)] transition-all flex items-center gap-2">
                <Download size={20} />
                Yuklab Olish
              </button>
              <button className="px-8 py-4 bg-cyber-card border border-cyber-border text-white font-bold rounded-xl hover:bg-white/5 transition-all flex items-center gap-2">
                <Github size={20} />
                GitHub Repozitoriy
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-cyber-border"
            >
              <div>
                <div className="text-2xl font-bold text-white">5K+</div>
                <div className="text-xs text-cyber-text-dim uppercase tracking-widest font-mono">A'zolar</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">100+</div>
                <div className="text-xs text-cyber-text-dim uppercase tracking-widest font-mono">Loyihalar</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-xs text-cyber-text-dim uppercase tracking-widest font-mono">Yordam</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Terminal Mockup */}
            <div className="bg-[#0c0d0f] rounded-2xl border border-cyber-border shadow-2xl overflow-hidden aspect-video lg:aspect-square flex flex-col">
              <div className="bg-cyber-card px-4 py-3 border-b border-cyber-border flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-[10px] font-mono text-cyber-text-dim uppercase tracking-widest">
                  root@nethunter-uz: ~
                </div>
                <div className="w-10" />
              </div>
              <div className="flex-1 p-6 font-mono text-sm space-y-2 overflow-hidden">
                <div className="flex gap-2">
                  <span className="text-cyber-accent">➜</span>
                  <span className="text-white">nethunter --version</span>
                </div>
                <div className="text-cyber-text-dim">Kali NetHunter v2024.1 (Uzbekistan Edition)</div>
                <div className="flex gap-2 pt-2">
                  <span className="text-cyber-accent">➜</span>
                  <span className="text-white">check-status</span>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase text-cyber-text-dim">Kernel</div>
                    <div className="text-cyber-accent">Custom 5.10.x-NH</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase text-cyber-text-dim">WiFi Injection</div>
                    <div className="text-cyber-accent">Enabled</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase text-cyber-text-dim">HID Attacks</div>
                    <div className="text-cyber-accent">Ready</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase text-cyber-text-dim">Bluetooth</div>
                    <div className="text-cyber-accent">Active</div>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <span className="text-cyber-accent">➜</span>
                  <span className="text-white animate-pulse">_</span>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -bottom-6 -left-6 bg-cyber-card border border-cyber-border p-4 rounded-xl shadow-xl flex items-center gap-4 animate-bounce duration-[3000ms]">
              <div className="p-2 bg-cyber-accent/20 rounded-lg">
                <Smartphone className="text-cyber-accent" />
              </div>
              <div>
                <div className="text-xs text-cyber-text-dim uppercase font-mono">Device Status</div>
                <div className="text-sm font-bold text-white">Rooted & Ready</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-cyber-card border border-cyber-border rounded-2xl space-y-4 hover:border-cyber-accent/30 transition-colors">
            <div className="w-12 h-12 bg-cyber-accent/10 rounded-xl flex items-center justify-center">
              <Wifi className="text-cyber-accent" />
            </div>
            <h3 className="text-xl font-bold text-white">Simsiz Audit</h3>
            <p className="text-cyber-text-dim text-sm leading-relaxed">
              WiFi tarmoqlarini tahlil qilish va xavfsizlikni tekshirish uchun barcha zarur vositalar.
            </p>
          </div>
          <div className="p-8 bg-cyber-card border border-cyber-border rounded-2xl space-y-4 hover:border-cyber-accent/30 transition-colors">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <Lock className="text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Pen-Testing</h3>
            <p className="text-cyber-text-dim text-sm leading-relaxed">
              Tizimlardagi zaifliklarni aniqlash va ularni bartaraf etish bo'yicha amaliy qo'llanmalar.
            </p>
          </div>
          <div className="p-8 bg-cyber-card border border-cyber-border rounded-2xl space-y-4 hover:border-cyber-accent/30 transition-colors">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
              <Cpu className="text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Maxsus Kernel</h3>
            <p className="text-cyber-text-dim text-sm leading-relaxed">
              Android qurilmalar uchun WiFi Injection va HID hujumlarini qo'llab-quvvatlovchi yadrolar.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white tracking-tight">
                Asboblar <span className="text-cyber-accent">Repozitoriyasi</span>
              </h2>
              <p className="text-cyber-text-dim max-w-xl">
                Hamjamiyatimiz tomonidan ishlab chiqilgan va saralangan eng foydali xavfsizlik vositalari.
              </p>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyber-text-dim w-4 h-4" />
              <input 
                type="text" 
                placeholder="Qidirish..." 
                className="bg-cyber-card border border-cyber-border rounded-xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-cyber-accent transition-colors w-full md:w-64"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, i) => (
              <ToolCard 
                key={i} 
                title={tool.title}
                description={tool.description}
                category={tool.category}
                status={tool.status}
                url={tool.url}
              />
            ))}
          </div>
        </section>

        {/* AI Assistant & Guides Split */}
        <section className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white tracking-tight">
                O'rganish <span className="text-cyber-accent">Markazi</span>
              </h2>
              <p className="text-cyber-text-dim">
                NetHunter-ni noldan boshlab professional darajagacha o'rganing.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                { title: "NetHunter-ni o'rnatish (Root bilan)", time: "15 min", level: "Boshlang'ich" },
                { title: "Root-siz NetHunter (Termux orqali)", time: "10 min", level: "Boshlang'ich" },
                { title: "WiFi Injection-ni sozlash", time: "20 min", level: "O'rta" },
                { title: "HID hujumlarini amalga oshirish", time: "25 min", level: "Yuqori" },
              ].map((guide, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 10 }}
                  className="p-5 bg-cyber-card border border-cyber-border rounded-xl flex items-center justify-between group cursor-pointer hover:border-cyber-accent/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-cyber-bg border border-cyber-border rounded-lg flex items-center justify-center text-cyber-accent font-mono font-bold">
                      0{i + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-cyber-accent transition-colors">{guide.title}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] text-cyber-text-dim uppercase tracking-widest">{guide.time}</span>
                        <span className="w-1 h-1 bg-cyber-border rounded-full" />
                        <span className="text-[10px] text-cyber-accent uppercase tracking-widest">{guide.level}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="text-cyber-text-dim group-hover:text-cyber-accent transition-colors" />
                </motion.div>
              ))}
            </div>
            
            <button className="w-full py-4 border border-dashed border-cyber-border rounded-xl text-cyber-text-dim hover:text-cyber-accent hover:border-cyber-accent/50 transition-all text-sm font-medium">
              Barcha qo'llanmalarni ko'rish
            </button>
          </div>

          <div className="lg:col-span-2 sticky top-32">
            <SecurityAssistant />
          </div>
        </section>

        {/* Community Section */}
        <section className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyber-accent/20 via-transparent to-blue-500/20 opacity-30" />
          <div className="relative p-12 md:p-20 bg-cyber-card border border-cyber-border flex flex-col items-center text-center space-y-8">
            <div className="p-4 bg-cyber-accent/10 rounded-2xl">
              <MessageSquare className="w-12 h-12 text-cyber-accent" />
            </div>
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Hamjamiyatga <span className="text-cyber-accent">Qo'shiling</span>
              </h2>
              <p className="text-lg text-cyber-text-dim">
                Savollaringiz bormi? Yoki tajribangizni baham ko'rmoqchimisiz? 
                O'zbekistondagi eng faol xavfsizlik hamjamiyatiga qo'shiling.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://t.me/nethunter_uz" 
                target="_blank"
                className="px-8 py-4 bg-blue-500 text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all flex items-center gap-2"
              >
                <Send size={20} />
                Telegram Guruh
              </a>
              <a 
                href="https://t.me/nethunteruz_channel" 
                target="_blank"
                className="px-8 py-4 bg-white/5 border border-cyber-border text-white font-bold rounded-xl hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <Globe size={20} />
                Kanalga A'zo Bo'lish
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-cyber-border py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-cyber-accent" />
              <span className="text-xl font-bold tracking-tighter text-white">
                NETHUNTER <span className="text-cyber-accent">UZ</span>
              </span>
            </div>
            <p className="text-sm text-cyber-text-dim leading-relaxed">
              O'zbekistondagi Kali NetHunter va axborot xavfsizligi bo'yicha 
              mustaqil hamjamiyat va resurs markazi.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-cyber-card border border-cyber-border rounded-lg text-cyber-text-dim hover:text-cyber-accent transition-colors">
                <Github size={18} />
              </a>
              <a href="#" className="p-2 bg-cyber-card border border-cyber-border rounded-lg text-cyber-text-dim hover:text-cyber-accent transition-colors">
                <Send size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Resurslar</h4>
            <ul className="space-y-4 text-sm text-cyber-text-dim">
              <li><a href="#" className="hover:text-cyber-accent transition-colors">NetHunter Yuklab Olish</a></li>
              <li><a href="#" className="hover:text-cyber-accent transition-colors">Asboblar Repozitoriyasi</a></li>
              <li><a href="#" className="hover:text-cyber-accent transition-colors">O'rnatish Qo'llanmasi</a></li>
              <li><a href="#" className="hover:text-cyber-accent transition-colors">Kernel Arxivlari</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Hamjamiyat</h4>
            <ul className="space-y-4 text-sm text-cyber-text-dim">
              <li><a href="#" className="hover:text-cyber-accent transition-colors">Telegram Guruh</a></li>
              <li><a href="#" className="hover:text-cyber-accent transition-colors">Telegram Kanal</a></li>
              <li><a href="#" className="hover:text-cyber-accent transition-colors">Forum (Yaqinda)</a></li>
              <li><a href="#" className="hover:text-cyber-accent transition-colors">Hamkorlik</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Ogohlantirish</h4>
            <p className="text-[10px] text-cyber-text-dim leading-relaxed uppercase tracking-wider">
              Ushbu saytdagi barcha ma'lumotlar faqat ta'lim va xavfsizlikni tekshirish maqsadida taqdim etilgan. 
              Noqonuniy harakatlar uchun sayt ma'muriyati javobgar emas.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-cyber-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cyber-text-dim font-mono">
            © 2026 NETHUNTER UZBEKISTAN. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6 text-xs text-cyber-text-dim font-mono">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyber-accent rounded-full animate-pulse" />
              SYSTEM STATUS: OPTIMAL
            </span>
            <span>v2.4.0-STABLE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

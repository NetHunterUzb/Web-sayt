import { ReactNode } from 'react';
import { motion } from "motion/react";
import { ExternalLink, Terminal, Download, ShieldCheck } from "lucide-react";

interface ToolCardProps {
  key?: any;
  title: string;
  description: string;
  category: string;
  status: 'stable' | 'beta' | 'experimental';
  url?: string;
  icon?: ReactNode;
}

export default function ToolCard({ title, description, category, status, url, icon }: ToolCardProps) {
  const statusColors = {
    stable: 'text-cyber-accent border-cyber-accent/30 bg-cyber-accent/5',
    beta: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
    experimental: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5'
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-cyber-card border border-cyber-border rounded-xl p-5 hover:border-cyber-accent/50 transition-all duration-300 overflow-hidden"
    >
      {/* Decorative background element */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyber-accent/5 rounded-full blur-2xl group-hover:bg-cyber-accent/10 transition-all" />
      
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 bg-cyber-bg border border-cyber-border rounded-lg group-hover:border-cyber-accent/30 transition-colors">
          {icon || <Terminal className="w-5 h-5 text-cyber-accent" />}
        </div>
        <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${statusColors[status]}`}>
          {status}
        </span>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white group-hover:text-cyber-accent transition-colors">
          {title}
        </h3>
        <p className="text-sm text-cyber-text-dim leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-cyber-border flex items-center justify-between">
        <span className="text-[10px] font-mono text-cyber-text-dim uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck size={12} className="text-cyber-accent" />
          {category}
        </span>
        
        <a
          href={url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium text-cyber-accent hover:underline"
        >
          {url ? 'Ko\'rish' : 'Yaqinda'}
          <ExternalLink size={12} />
        </a>
      </div>
    </motion.div>
  );
}

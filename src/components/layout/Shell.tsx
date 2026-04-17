import React from 'react';
import { 
  LayoutDashboard, 
  Microscope, 
  History, 
  BrainCircuit, 
  BookOpen, 
  Settings,
  ShieldCheck,
  User
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { View } from '../../types';

interface ShellProps {
  children: React.ReactNode;
  currentView: View;
  onViewChange: (view: View) => void;
}

export default function Shell({ children, currentView, onViewChange }: ShellProps) {
  const navItems = [
    { id: 'landing', label: 'Home', icon: LayoutDashboard, hidden: true },
    { id: 'history', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analysis', label: 'MRI Analysis', icon: Microscope },
    { id: 'processing', label: 'Active Process', icon: BrainCircuit, hidden: currentView !== 'processing' },
    { id: 'results', label: 'Current Results', icon: ShieldCheck, hidden: currentView !== 'results' },
    { id: 'insights', label: 'Model Insights', icon: BrainCircuit },
    { id: 'docs', label: 'Documentation', icon: BookOpen },
  ];

  return (
    <div className="flex min-h-screen bg-surface p-3 gap-3">
      {/* Sidebar */}
      <aside className={cn(
        "hidden lg:flex flex-col w-[280px] bg-surface-container shrink-0 border border-outline rounded-xl transition-all duration-500 overflow-hidden",
        currentView === 'landing' && "w-0 border-none p-0 opacity-0"
      )}>
        <div className="p-6 border-b border-outline">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-primary rounded flex items-center justify-center shadow-[0_0_10px_rgba(0,242,255,0.4)]">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            </div>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-on-surface">NeuroSeg</h2>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          {navItems.filter(item => !item.hidden).map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as View)}
              className={cn(
                "flex items-center w-full gap-4 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-lg group",
                currentView === item.id 
                  ? "bg-primary/10 text-primary border border-primary/20 shadow-[inset_0_0_10px_rgba(0,242,255,0.05)]" 
                  : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
              )}
            >
              <item.icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", currentView === item.id ? "text-primary cyber-glow" : "text-on-surface-variant")} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-outline">
          <div className="p-4 bg-surface-container-high rounded-xl border border-outline">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant">Model Status</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-secondary rounded-full animate-pulse" />
                <div className="w-1 h-1 bg-secondary rounded-full animate-pulse delay-75" />
              </div>
            </div>
            <p className="text-[10px] font-mono text-primary/80">TransUNet_v2.1 :: HYBRID</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-3 min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-[60px] bg-surface-container border border-outline rounded-xl flex items-center justify-between px-6 shrink-0 shadow-lg">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onViewChange('landing')}>
              <BrainCircuit className="w-5 h-5 text-primary cyber-glow group-hover:scale-110 transition-transform" />
              <h1 className="text-sm font-black uppercase tracking-[0.3em] text-on-surface">
                Diagnostic <span className="text-primary font-light">Suite</span>
              </h1>
            </div>
            
            <div className="hidden xl:flex items-center gap-4 pl-6 border-l border-outline">
              <div className="text-[10px] font-mono text-on-surface-variant">CASE_ID: <span className="text-on-surface">BRA-2023-0882</span></div>
              <div className="text-[10px] font-mono text-on-surface-variant">MODALITY: <span className="text-on-surface">T1CE, FLAIR, T2</span></div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-[10px] font-black tracking-widest text-secondary uppercase">Analysis Active</span>
            </div>
            
            <div className="flex items-center gap-4 pl-6 border-l border-outline">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-on-surface leading-none mb-1 uppercase">Dr. Shjan Abdul</p>
                <p className="text-[9px] font-mono text-on-surface-variant uppercase">Neurologist</p>
              </div>
              <div className="w-8 h-8 rounded border border-primary/30 p-0.5 overflow-hidden bg-primary/10">
                <img 
                  src="https://picsum.photos/seed/doc/100/100" 
                  alt="Doctor" 
                  className="w-full h-full object-cover filter grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </header>

        {/* View Content */}
        <main className="flex-1 bg-surface-container/30 border border-outline rounded-xl overflow-y-auto custom-scrollbar relative">
          {children}
        </main>

        {/* Footer */}
        <footer className="h-[60px] bg-surface-container border border-outline rounded-xl flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-[10px] font-mono text-on-surface-variant uppercase">
              <ShieldCheck className="w-3 h-3 text-secondary" />
              HIPAA Compliant Session
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="h-1 w-12 bg-outline rounded-full overflow-hidden">
                <div className="h-full w-[80%] bg-primary" />
              </div>
              <span className="text-[9px] font-mono text-on-surface-variant">STORAGE: 14.2GB / 20GB</span>
            </div>
          </div>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
            <button className="hover:text-primary transition-colors">Audit Logs</button>
            <button className="hover:text-primary transition-colors">Specs</button>
          </div>
        </footer>
      </div>
    </div>
  );
}

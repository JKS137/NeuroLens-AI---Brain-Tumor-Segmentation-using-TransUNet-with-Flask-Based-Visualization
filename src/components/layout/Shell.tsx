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
    <div className="flex min-h-screen bg-surface selection:bg-primary-fixed selection:text-primary transition-colors duration-500">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 fixed left-0 top-0 h-screen bg-surface-container-low/70 backdrop-blur-xl border-r border-outline-variant/10 z-50">
        <div className="p-8">
          <h2 className="text-lg font-black uppercase tracking-widest text-primary font-headline">Clinical Precision</h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {navItems.filter(item => !item.hidden).map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as View)}
              className={cn(
                "flex items-center w-full gap-3 px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg group",
                currentView === item.id 
                  ? "bg-white/50 text-primary border-l-4 border-primary shadow-sm" 
                  : "text-on-surface-variant hover:bg-white/30 hover:translate-x-1"
              )}
            >
              <item.icon className={cn("w-5 h-5", currentView === item.id ? "text-primary" : "text-outline")} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="p-4 bg-primary rounded-2xl text-white shadow-lg shadow-primary/20">
            <p className="text-[10px] uppercase font-bold opacity-70 mb-1 tracking-widest">Compute Load</p>
            <div className="flex items-end justify-between">
              <span className="text-xl font-bold">88%</span>
              <BrainCircuit className="w-5 h-5 opacity-50" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={cn("flex-1 flex flex-col transition-all duration-500", currentView !== 'landing' && "lg:ml-64")}>
        {/* Header */}
        <header className="sticky top-0 z-40 w-full bg-surface/80 backdrop-blur-md border-b border-outline-variant/5 shadow-sm">
          <div className="flex items-center justify-between px-6 py-3 mx-auto max-w-7xl">
            <div className="flex items-center gap-4">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => onViewChange('landing')}
              >
                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
                  <BrainCircuit className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-primary font-headline tracking-tight">NeuroLens AI</h1>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex gap-6 items-center">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full animate-pulse flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  SYSTEM ACTIVE
                </span>
                <nav className="flex gap-4">
                  <button className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Archive</button>
                  <button className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Patients</button>
                </nav>
              </div>
              <div className="flex items-center gap-3 border-l border-outline-variant/20 pl-6">
                <button className="p-2 text-outline hover:text-primary transition-colors cursor-pointer">
                  <Settings className="w-5 h-5" />
                </button>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container/20">
                  <img 
                    src="https://picsum.photos/seed/doctor/200/200" 
                    alt="Clinician" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* View Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="py-6 border-t border-outline-variant/5 bg-surface-container-low/30">
          <div className="px-6 mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] uppercase tracking-widest text-outline font-medium">
            <p>© 2024 Precision Lens Medical AI. All data HIPAA compliant.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-primary transition-colors">Privacy Protocol</a>
              <a href="#" className="hover:text-primary transition-colors">FDA Compliance</a>
              <a href="#" className="hover:text-primary transition-colors">Technical Specs</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

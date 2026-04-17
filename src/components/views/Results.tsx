import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Activity, 
  Layers, 
  Info, 
  Download, 
  Share2, 
  BrainCircuit, 
  ChevronRight,
  Maximize2,
  ShieldCheck,
  Settings
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { AnalysisResult } from '../../types';
import { cn } from '../../lib/utils';

interface ResultsProps {
  result: AnalysisResult;
  onReset: () => void;
}

export default function Results({ result, onReset }: ResultsProps) {
  const chartData = [
    { name: 'Dice Score', value: result.metrics.diceScore * 100, color: '#00f2ff' },
    { name: 'IoU Score', value: result.metrics.iou * 100, color: '#39ff14' },
    { name: 'Relativity', value: 82, color: '#8892b0' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-12">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-secondary mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Analysis Complete</span>
          </div>
          <h2 className="text-4xl font-black text-on-surface font-headline tracking-tighter uppercase mb-2">Diagnostic <span className="text-primary italic">Intelligence</span></h2>
          <div className="flex items-center gap-4 text-[10px] font-mono text-on-surface-variant">
            <span>UID / {result.scanId}</span>
            <span className="w-1 h-1 rounded-full bg-outline" />
            <span>INF_LATENCY / {result.metrics.inferenceMs}MS</span>
          </div>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-3 bg-surface-container border border-outline rounded text-[11px] font-black uppercase tracking-widest text-on-surface-variant hover:border-primary hover:text-primary transition-all">
            Export NIfTI
          </button>
          <button className="flex-1 md:flex-none px-8 py-3 bg-primary text-surface font-black uppercase tracking-[0.2em] rounded shadow-[0_0_20px_rgba(0,242,255,0.3)] hover:scale-105 active:scale-95 transition-all text-[11px]">
            Push to PACS
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Visualizer Placeholder */}
        <div className="lg:col-span-8 space-y-8">
          <div className="aspect-video rounded-lg scan-viewport overflow-hidden relative group cyber-border">
            {/* Simulation of a medical visualizer */}
            <div className="absolute inset-0 brain-radial opacity-40 mix-blend-screen" />
            <img 
              src="https://picsum.photos/seed/brain-seg/1200/800" 
              alt="Segmentation Overlay"
              className="w-full h-full object-cover opacity-60 mix-blend-overlay grayscale contrast-125"
              referrerPolicy="no-referrer"
            />
            {/* Visualizer UI Overlay */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
              <div className="flex justify-between items-start">
                <div className="glass-panel px-4 py-2 rounded border-primary/20 flex flex-col pointer-events-auto">
                  <span className="text-[9px] font-black tracking-widest text-primary uppercase">Prediction: Overlay</span>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xl font-mono text-on-surface cyber-glow">SLICE 88</span>
                    <span className="text-[9px] text-on-surface-variant font-mono">/ 256</span>
                  </div>
                </div>
                <div className="flex gap-2 pointer-events-auto">
                    <div className="w-8 h-8 rounded border border-outline bg-black/50 flex items-center justify-center text-on-surface hover:text-primary transition-colors cursor-pointer"><Maximize2 className="w-4 h-4" /></div>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div className="space-y-3 pointer-events-auto">
                  <div className="flex gap-3">
                    <div className="flex items-center gap-2 group cursor-pointer">
                      <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_#39ff14]" />
                      <span className="text-[10px] font-black text-on-surface-variant group-hover:text-secondary uppercase">Tumor Core</span>
                    </div>
                    <div className="flex items-center gap-2 group cursor-pointer">
                      <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#00f2ff]" />
                      <span className="text-[10px] font-black text-on-surface-variant group-hover:text-primary uppercase">Edema</span>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 glass-panel border-outline/10 text-[10px] font-mono text-primary animate-pulse uppercase">
                  TransUNet V2.1 Process
                </div>
              </div>
            </div>
            
            {/* Crosshair Simulation */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-primary" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'Dice Score (WT)', value: result.metrics.diceScore.toFixed(4), icon: ShieldCheck },
              { label: 'Volumetric Mass', value: `${result.metrics.volumeCm3} cm³`, icon: Layers },
              { label: 'IoU Score', value: result.metrics.iou.toFixed(4), icon: Activity },
            ].map((stat, i) => (
              <div key={i} className="bg-surface-container p-6 rounded-lg border border-outline hover:border-primary/50 transition-all group">
                <div className="text-[10px] uppercase font-bold tracking-[0.1em] text-on-surface-variant mb-4 group-hover:text-primary transition-colors">{stat.label}</div>
                <div className="text-3xl font-mono text-primary cyber-glow">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Analytics & Notes */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-surface-container p-8 rounded-lg border border-outline shadow-xl">
            <h3 className="text-sm font-black uppercase tracking-widest text-on-surface mb-8 flex items-center gap-3">
              <Activity className="w-4 h-4 text-primary cyber-glow" />
              Segmentation Layers
            </h3>
            
            <div className="h-48 mb-10">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: -20, right: 20 }}>
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis type="category" dataKey="name" fontSize={10} fontWeight={800} tick={{ fill: '#8892b0' }} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#050608', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', color: '#e0e6ed' }}
                  />
                  <Bar dataKey="value" radius={[0, 2, 2, 0]} barSize={12}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-6">
              <div className="p-5 bg-surface-container-high border border-outline rounded">
                <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest mb-3">
                  <Info className="w-3 h-3" />
                  Clinical Findings
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed font-body italic">
                  "{result.findings}"
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant">Active Modalities</span>
                <div className="flex gap-2">
                  {['T1', 'T1CE', 'FLAIR', 'T2'].map(m => (
                    <span key={m} className="px-2 py-1 bg-primary/10 text-primary text-[9px] font-black rounded border border-primary/20">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-surface-container-high border border-outline rounded-lg flex flex-col h-fit">
            <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Layer Controls</span>
                <Settings className="w-4 h-4 text-outline" />
            </div>
            
            <div className="space-y-3 mb-10">
                {[
                    { name: 'Whole Tumor', color: 'secondary' },
                    { name: 'Tumor Core', color: 'tertiary' },
                    { name: 'Enhancing', color: 'primary' },
                ].map((l, i) => (
                    <div key={i} className={cn(
                        "flex items-center justify-between p-3 rounded border border-transparent transition-all cursor-pointer",
                        i === 0 ? "border-primary/30 bg-primary/5" : "hover:border-outline hover:bg-white/5"
                    )}>
                        <div className="flex items-center gap-3">
                            <div className={cn("w-2 h-2 rounded-full shadow-lg", 
                                l.color === 'primary' ? 'bg-primary shadow-primary/40' : 
                                l.color === 'secondary' ? 'bg-secondary shadow-secondary/40' : 'bg-tertiary shadow-tertiary/40'
                            )} />
                            <span className="text-xs font-bold text-on-surface-variant">{l.name}</span>
                        </div>
                        <input type="checkbox" defaultChecked={i < 2} className="accent-primary" />
                    </div>
                ))}
            </div>

            <button
              onClick={onReset}
              className="w-full py-4 border border-outline text-on-surface-variant text-[10px] font-black uppercase tracking-widest rounded hover:bg-tertiary/10 hover:text-tertiary hover:border-tertiary/30 transition-all"
            >
              Clear Analysis Buffer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

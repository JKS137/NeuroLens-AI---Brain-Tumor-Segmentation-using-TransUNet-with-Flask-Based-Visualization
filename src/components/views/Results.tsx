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
  Maximize2
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
    { name: 'Dice Score', value: result.metrics.diceScore * 100, color: '#003f87' },
    { name: 'IoU Score', value: result.metrics.iou * 100, color: '#0056b3' },
    { name: 'Contrast', value: 88, color: '#4c5e84' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 text-emerald-600 mb-2">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span className="text-xs font-black uppercase tracking-widest">Inference Complete</span>
          </div>
          <h2 className="text-3xl font-black text-primary font-headline tracking-tighter">Diagnostic Report</h2>
          <p className="text-on-surface-variant text-sm font-mono mt-1">ID: {result.scanId} • PROCESSED AT: {new Date(result.timestamp).toLocaleString()}</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-3 bg-white border border-outline-variant/20 rounded-xl font-bold text-sm text-on-surface flex items-center justify-center gap-2 hover:bg-surface-container-low transition-all">
            <Download className="w-4 h-4" /> Export NIfTI
          </button>
          <button className="flex-1 md:flex-none px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all">
            <Share2 className="w-4 h-4" /> Push to PACS
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Visualizer Placeholder */}
        <div className="lg:col-span-8 space-y-6">
          <div className="aspect-square md:aspect-video rounded-3xl bg-black overflow-hidden relative group border-4 border-surface-container-highest shadow-2xl">
            {/* Simulation of a medical visualizer */}
            <img 
              src="https://picsum.photos/seed/brain-seg/1200/800" 
              alt="Segmentation Overlay"
              className="w-full h-full object-cover opacity-60 mix-blend-screen"
              referrerPolicy="no-referrer"
            />
            {/* Visualizer UI Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-red-500 text-white text-[9px] font-black uppercase rounded shadow-sm">Tumor Core</span>
                  <span className="px-2 py-1 bg-yellow-500 text-white text-[9px] font-black uppercase rounded shadow-sm">Edema</span>
                  <span className="px-2 py-1 bg-green-500 text-white text-[9px] font-black uppercase rounded shadow-sm">Necrotic</span>
                </div>
                <div className="flex items-center gap-4 text-white/50 text-xs font-mono">
                  <span>SLICE: 142 / 240</span>
                  <span>ZOOM: 2.5X</span>
                </div>
              </div>
              <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all">
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
            
            <div className="absolute top-6 left-6 p-4 glass-panel border border-white/10 rounded-2xl flex items-center gap-4 shadow-xl">
              <BrainCircuit className="w-6 h-6 text-primary" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary leading-none">AI Confidence</p>
                <p className="text-lg font-bold text-on-surface">98.4%</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Volumetric Mass', value: `${result.metrics.volumeCm3} cm³`, icon: Layers },
              { label: 'Latency', value: `${result.metrics.inferenceMs} ms`, icon: Activity },
              { label: 'Architecture', value: 'TransUNet Hybrid', icon: BrainCircuit },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-outline-variant/10 shadow-sm">
                <div className="flex items-center gap-3 mb-3 text-outline">
                  <stat.icon className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-widest leading-none">{stat.label}</span>
                </div>
                <div className="text-xl font-black text-primary">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Analytics & Notes */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
            <h3 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Performance Metrics
            </h3>
            
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: -20, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e8eff7" />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis type="category" dataKey="name" fontSize={12} fontWeight={600} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: '#f6faff' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/5">
                <div className="flex items-center gap-2 text-primary font-bold text-sm mb-1">
                  <Info className="w-4 h-4" />
                  Clinical Insight
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {result.findings}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
            <h4 className="text-sm font-black uppercase tracking-widest text-primary mb-4">Patient History</h4>
            <div className="space-y-3">
              {[
                { date: 'Dec 12, 2023', change: '+2.4%' },
                { date: 'Oct 05, 2023', change: '-1.1%' },
              ].map((h, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/50 rounded-xl hover:bg-white transition-colors cursor-pointer group">
                  <span className="text-xs font-medium text-on-surface-variant">{h.date}</span>
                  <div className="flex items-center gap-2">
                    <span className={cn("text-[10px] font-black", h.change.startsWith('+') ? 'text-tertiary' : 'text-emerald-600')}>
                      V: {h.change}
                    </span>
                    <ChevronRight className="w-4 h-4 text-outline group-hover:text-primary transition-colors" />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 text-xs font-black uppercase text-primary border border-primary/20 rounded-xl hover:bg-primary/10 transition-colors">
              Compare All Scans
            </button>
          </div>

          <button
            onClick={onReset}
            className="w-full py-5 bg-surface-container-highest text-on-surface-variant font-bold rounded-2xl hover:bg-surface-container-high transition-all"
          >
            Nuke Analysis & Reset
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { Microscope, ArrowRight, ShieldCheck, Zap, BrainCircuit, Activity, Layers } from 'lucide-react';
import { View } from '../../types';

interface LandingProps {
  onAnalyzeClick: () => void;
}

export default function Landing({ onAnalyzeClick }: LandingProps) {
  return (
    <div className="flex flex-col bg-surface">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-40 md:pb-48 hero-gradient">
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10 z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] border border-primary/20">
              <Zap className="w-3 h-3" />
              Intelligence Core v2.1
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-on-surface font-headline tracking-tighter leading-[0.85] uppercase">
              Hybrid <br/>
              Neural <br/>
              <span className="text-primary cyber-glow">Analysis</span>
            </h2>
            <p className="text-sm text-on-surface-variant max-w-md leading-relaxed font-mono uppercase tracking-wide opacity-80">
              [SYSTEM_LOG] :: Deploying TransUNet hybrid architecture for sub-millimeter volumetric segmentation. Combining local CNN features with global vision transformer context.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <button 
                onClick={onAnalyzeClick}
                className="px-10 py-5 bg-primary text-surface font-black uppercase tracking-[0.2em] rounded shadow-[0_0_30px_rgba(0,242,255,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group text-[11px]"
              >
                Launch Suite
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-5 bg-surface-container border border-outline text-on-surface font-black uppercase tracking-[0.2em] rounded hover:border-primary transition-all text-[11px]">
                Technical Specs
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full animate-pulse" />
            <div className="relative rounded-lg overflow-hidden border border-outline shadow-2xl bg-black group aspect-square">
              <div className="absolute inset-0 brain-radial opacity-40 mix-blend-screen" />
              <img 
                src="https://picsum.photos/seed/mri-scan/800/800?grayscale" 
                alt="MRI Analysis" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[4s] contrast-125 saturate-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent flex flex-col justify-end p-10">
                <div className="glass-panel p-6 rounded border-outline/20 flex items-center justify-between border-l-4 border-l-primary">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_#39ff14] animate-pulse" />
                    <div>
                      <p className="text-primary text-[9px] uppercase font-black tracking-widest leading-none mb-1">Active Architecture</p>
                      <p className="text-on-surface text-xs font-mono font-bold">TRANS-UNET_HYBRID_CORE</p>
                    </div>
                  </div>
                  <BrainCircuit className="text-primary/20 w-8 h-8" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
            <div className="space-y-4">
               <span className="text-secondary text-[10px] font-black uppercase tracking-[0.4em]">Engineered Specs</span>
               <h3 className="text-4xl font-black text-on-surface uppercase tracking-tight">Precision Diagnostics</h3>
            </div>
            <p className="text-on-surface-variant max-w-sm text-xs font-mono tracking-tight leading-relaxed">System-optimized for radiological workflows and sub-second inference speed.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Hybrid Encoding",
                desc: "Powered by TransUNet, combining local CNN textures with global Transformer context.",
                icon: BrainCircuit,
                tags: ["Transformer", "CNN"]
              },
              {
                title: "Volumetric Mapping",
                desc: "3D voxel reconstruction for precise tumor volume tracking and longitudinal study.",
                icon: Layers,
                tags: ["3D ROI", "DICE"]
              },
              {
                title: "Edge Inference",
                desc: "Sub-150ms inference times providing real-time sub-millimeter clinical precision.",
                icon: Zap,
                tags: ["M1/RTX", "LATENCY"]
              }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-surface-container p-10 rounded-lg border border-outline hover:border-primary/50 hover:-translate-y-1 transition-all group"
              >
                <div className="w-12 h-12 bg-primary/5 rounded border border-primary/20 flex items-center justify-center mb-8 text-primary group-hover:bg-primary group-hover:text-surface transition-all">
                  <f.icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-black text-on-surface uppercase tracking-widest mb-4 group-hover:text-primary transition-colors">{f.title}</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-10 font-medium">
                  "{f.desc}"
                </p>
                <div className="flex gap-2">
                  {f.tags.map(t => (
                    <span key={t} className="px-2 py-1 bg-surface-container-high border border-outline rounded text-[9px] font-black text-on-surface-variant uppercase">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-surface border-y border-outline overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-on-surface-variant flex items-center gap-3">
               <div className="w-10 h-px bg-outline" />
               Join Clinical Beta
            </span>
            <h4 className="text-5xl font-black text-on-surface uppercase tracking-tighter">Ready to Analyze?</h4>
          </div>
          <button 
            onClick={onAnalyzeClick}
            className="group px-12 py-6 bg-transparent border-2 border-primary text-primary font-black uppercase tracking-[0.3em] text-xs rounded hover:bg-primary hover:text-surface transition-all shadow-[0_0_40px_rgba(0,242,255,0.1)] active:scale-95"
          >
            Access Dashboard
          </button>
        </div>
      </section>
    </div>
  );
}


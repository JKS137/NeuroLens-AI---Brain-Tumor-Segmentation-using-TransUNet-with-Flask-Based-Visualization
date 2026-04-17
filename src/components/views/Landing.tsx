import React from 'react';
import { motion } from 'motion/react';
import { Microscope, ArrowRight, ShieldCheck, Zap, BrainCircuit, Activity } from 'lucide-react';
import { View } from '../../types';

interface LandingProps {
  onAnalyzeClick: () => void;
}

export default function Landing({ onAnalyzeClick }: LandingProps) {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 md:pt-32 md:pb-48">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary-container/20">
              <Zap className="w-3 h-3" />
              Clinical Precision 2.0
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold text-primary font-headline tracking-tighter leading-[0.9] md:leading-[1]">
              AI-Powered <br/>
              Brain Tumor <br/>
              <span className="text-on-surface-variant italic">Segmentation</span>
            </h2>
            <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed font-body">
              Leveraging the TransUNet hybrid architecture to provide ultra-high precision volumetric analysis. Transform MRI slices into actionable clinical insights with sub-millimeter accuracy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={onAnalyzeClick}
                className="px-8 py-4 hero-gradient text-white font-bold rounded-xl shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <Microscope className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Start Analysis
              </button>
              <button className="px-8 py-4 bg-surface-container-highest text-primary font-bold rounded-xl hover:bg-surface-container-high transition-all">
                Technical Blueprint
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary-container opacity-10 rounded-full blur-3xl animate-pulse" />
            <div className="relative rounded-3xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,63,135,0.2)] bg-on-background group">
              <img 
                src="https://picsum.photos/seed/mri-scan/800/800?grayscale" 
                alt="MRI Analysis" 
                className="w-full h-auto opacity-70 group-hover:scale-105 transition-transform duration-[2s]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-8">
                <div className="glass-panel p-6 rounded-2xl border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                    <div>
                      <p className="text-white text-[10px] uppercase font-bold tracking-widest opacity-70">Active Model</p>
                      <p className="text-white text-sm font-bold">TransUNet Hybrid Encoder</p>
                    </div>
                  </div>
                  <Activity className="text-white/30 w-10 h-10" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-surface-container-low/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center">
            <h3 className="text-3xl font-extrabold text-primary font-headline mb-4">Precision Diagnostics</h3>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Advanced features engineered for radiological excellence and diagnostic speed.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Deep Learning Model",
                desc: "Powered by TransUNet, combining local CNN textures with global Transformer context.",
                icon: BrainCircuit,
                tags: ["Transformer", "U-Net"]
              },
              {
                title: "Multi-modal Support",
                desc: "Full processing for T1, T1c, T2, and FLAIR modalities for detailed tumor profiling.",
                icon: Microscope,
                tags: ["T1", "FLAIR", "T2"]
              },
              {
                title: "Real-time Volumetrics",
                desc: "Sub-second inference times providing sub-millimeter volumetric precision.",
                icon: Zap,
                tags: ["GPU-Accel", "140ms"]
              }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-3xl border border-outline-variant/10 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-primary-container/10 rounded-2xl flex items-center justify-center mb-8 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <f.icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-on-surface mb-4">{f.title}</h4>
                <p className="text-on-surface-variant leading-relaxed mb-8">{f.desc}</p>
                <div className="flex gap-2">
                  {f.tags.map(t => (
                    <span key={t} className="px-3 py-1 bg-surface-container rounded text-[10px] font-bold text-primary uppercase">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          <div className="space-y-4">
            <span className="text-sm font-black uppercase tracking-[0.3em] opacity-50">Diagnostic flow</span>
            <h4 className="text-4xl font-bold font-headline">Ready to integrate into your workflow?</h4>
          </div>
          <button 
            onClick={onAnalyzeClick}
            className="bg-white text-primary px-10 py-5 rounded-2xl font-bold hover:scale-105 transition-all flex items-center gap-3 shadow-2xl"
          >
            Open Dashboard
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}

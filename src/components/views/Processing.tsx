import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrainCircuit, Cpu, Zap, Microscope, Search, CheckCircle2, Loader2 } from 'lucide-react';

export default function Processing() {
  const [step, setStep] = useState(0);
  const steps = [
    { label: 'Normalizing Intensities', icon: Zap },
    { label: 'Registering Modalities', icon: Microscope },
    { label: 'Patch Extraction', icon: Search },
    { label: 'TransUNet Inference', icon: BrainCircuit },
    { label: 'Reconstructing Volumetrics', icon: Cpu },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(s => (s < steps.length - 1 ? s + 1 : s));
    }, 1500);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-12 max-w-2xl mx-auto">
      <div className="relative mb-16">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="relative w-48 h-48 rounded-full border-4 border-dashed border-primary/30 flex items-center justify-center"
        >
          <div className="w-40 h-40 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <BrainCircuit className="w-16 h-16 text-primary" />
        </div>
      </div>

      <div className="w-full space-y-8 text-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-primary font-headline tracking-tighter">Analyzing Neural Structures</h2>
          <p className="text-on-surface-variant font-medium">Please wait while our hybrid transformer model processes the multi-modal scans.</p>
        </div>

        <div className="space-y-4">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center">
                {i < step ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : i === step ? (
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                ) : (
                  <s.icon className="w-4 h-4 text-outline" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-sm font-bold ${i <= step ? 'text-on-surface' : 'text-outline/50'}`}>
                    {s.label}
                  </span>
                  {i === step && <span className="text-[10px] font-black text-primary animate-pulse uppercase">Active</span>}
                </div>
                <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: i < step ? '100%' : i === step ? '60%' : '0%' }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-outline-variant/10">
          <div className="flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-outline">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              NVIDIA A100 Active
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              HIPAA SECURE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

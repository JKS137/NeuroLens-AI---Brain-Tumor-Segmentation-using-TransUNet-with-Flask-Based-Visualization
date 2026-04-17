import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrainCircuit, Cpu, Zap, Microscope, Search, CheckCircle2, Loader2, Activity } from 'lucide-react';
import { cn } from '../../lib/utils';

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
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-12 max-w-2xl mx-auto space-y-16">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full scale-150 animate-pulse" />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="relative w-56 h-56 rounded-full border border-dashed border-primary/20 flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin [animation-duration:3s]" />
          <div className="absolute inset-4 rounded-full border border-secondary/30 border-b-transparent animate-spin [animation-duration:5s] [animation-direction:reverse]" />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <BrainCircuit className="w-20 h-20 text-primary cyber-glow" />
        </div>
      </div>

      <div className="w-full space-y-12 text-center">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-secondary mb-2 uppercase tracking-[0.4em] font-black text-[10px]">
            <Activity className="w-3 h-3" />
            Active Compute
          </div>
          <h2 className="text-4xl font-black text-on-surface uppercase tracking-tight font-headline">Neural <span className="text-primary cyber-glow italic">Architect</span></h2>
          <p className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest leading-relaxed max-w-md mx-auto opacity-70">
            [SYS] :: Hybrid TransUNet core parsing 3D tensor data. Global context attention mapping active.
          </p>
        </div>

        <div className="space-y-4 text-left">
          {steps.map((s, i) => (
            <div key={i} className="group flex items-center gap-6 p-4 rounded bg-surface-container/30 border border-transparent transition-all">
              <div className={cn(
                "flex-shrink-0 w-10 h-10 rounded border flex items-center justify-center transition-all",
                i < step ? "bg-secondary/10 border-secondary text-secondary" : 
                i === step ? "bg-primary/5 border-primary text-primary animate-pulse" : 
                "bg-black/20 border-outline/5 text-outline/20"
              )}>
                {i < step ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : i === step ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <s.icon className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-end">
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    i <= step ? "text-on-surface" : "text-on-surface-variant opacity-30"
                  )}>
                    {s.label}
                  </span>
                  {i === step && <span className="text-[9px] font-mono text-primary animate-pulse uppercase">Processing...</span>}
                </div>
                <div className="h-1 w-full bg-black/40 rounded-full overflow-hidden border border-outline/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: i < step ? '100%' : i === step ? '65%' : '0%' }}
                    className={cn(
                        "h-full",
                        i < step ? "bg-secondary shadow-[0_0_10px_#39ff14]" : "bg-primary shadow-[0_0_10px_#00f2ff]"
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-10 border-t border-outline">
          <div className="flex flex-wrap items-center justify-center gap-8 text-[9px] font-mono font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              NVIDIA_A100_LOAD: 92%
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              IO_THROUGHPUT: 4.2GB/S
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              ENCRYPTION: SHAKE-256
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, File, X, AlertCircle, Scan, ArrowRight, ShieldCheck, Microscope } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AnalysisProps {
  onProcess: (files: File[]) => void;
}

export default function Analysis({ onProcess }: AnalysisProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Validate file types (nii, nii.gz, or standard medical imaging placeholders)
    const validFiles = acceptedFiles.filter(f => 
      f.name.endsWith('.nii') || 
      f.name.endsWith('.nii.gz') || 
      f.type.includes('image/')
    );

    if (validFiles.length < acceptedFiles.length) {
      setError("FILE_REJECTION_ERROR :: System only accepts .nii / .gz neuroimaging standards.");
    } else {
      setError(null);
    }

    setFiles((prev: File[]) => [...prev, ...validFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/octet-stream': ['.nii', '.nii.gz'],
      'image/*': ['.jpg', '.jpeg', '.png', '.dcm']
    }
  } as any);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-7xl mx-auto px-10 py-16">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side: Upload Zone */}
        <div className="flex-1 space-y-10">
          <div className="space-y-4">
             <div className="flex items-center gap-2 text-primary">
                <div className="w-1 h-1 rounded-full bg-primary shadow-[0_0_10px_rgba(0,242,255,1)]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Scan Intake Pipeline</span>
             </div>
             <h2 className="text-5xl font-black text-on-surface uppercase tracking-tighter">Neuro <span className="text-primary italic">Inbound</span></h2>
             <p className="text-xs text-on-surface-variant font-mono max-w-lg leading-relaxed uppercase opacity-70">
                [INPUT_BUFFER] :: Waiting for NIfTI/DICOM multi-modal data. The hybrid TransUNet core requires T1, T1CE, T2, and FLAIR for full 3D volumetric segmentation.
             </p>
          </div>

          <div 
            {...getRootProps()} 
            className={cn(
              "relative border border-outline rounded-lg p-12 transition-all duration-500 flex flex-col items-center justify-center min-h-[450px] cursor-pointer overflow-hidden group",
              isDragActive 
                ? "bg-primary/5 border-primary shadow-[0_0_40px_rgba(0,242,255,0.1)] scale-[1.005]" 
                : "bg-surface-container/50 hover:bg-surface-container hover:border-primary/30"
            )}
          >
            <input {...getInputProps()} />
            
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
                <div className={cn(
                    "w-20 h-20 rounded border border-outline bg-black/50 flex items-center justify-center mb-8 transition-transform duration-500",
                    isDragActive ? "scale-110 border-primary text-primary cyber-glow" : "text-on-surface-variant group-hover:text-primary"
                )}>
                  <Upload className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-widest text-on-surface mb-2">Stage Modalities</h3>
                <p className="text-[10px] font-mono text-on-surface-variant tracking-wider uppercase">Drag .NII / .DCM / .GZ directly or click to browse</p>
                
                <div className="mt-10 px-8 py-3 border border-primary text-primary font-black uppercase tracking-[0.2em] text-[10px] rounded hover:bg-primary hover:text-surface transition-all">
                  Initialize Buffer
                </div>
            </div>

            {isDragActive && (
              <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in transition-all">
                <div className="w-16 h-16 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-primary font-black text-xs uppercase tracking-[0.4em] cyber-glow">Release Data</p>
              </div>
            )}
          </div>

          {error && (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-tertiary/10 text-tertiary border border-tertiary/20 rounded font-mono text-[10px] uppercase flex items-center gap-3"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}
        </div>

        {/* Right Side: File Queue */}
        <div className="w-full lg:w-[400px] space-y-6">
          <div className="bg-surface-container p-8 rounded-lg border border-outline shadow-2xl h-full flex flex-col">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant mb-8 flex items-center justify-between">
              <span className="flex items-center gap-2 font-black">
                <File className="w-3 h-3 text-primary" />
                Data Queue
              </span>
              <span className="font-mono text-primary animate-pulse">[{files.length}]</span>
            </h3>

            <div className="flex-1 space-y-3 min-h-[300px] max-h-[500px] overflow-y-auto custom-scrollbar pr-3">
              <AnimatePresence initial={false}>
                {files.length === 0 ? (
                  <div className="h-48 flex flex-col items-center justify-center text-outline/20 border border-dashed border-outline rounded-lg bg-black/20">
                    <Scan className="w-10 h-10 mb-3 opacity-20" />
                    <p className="text-[9px] font-black uppercase tracking-widest">Pipeline Empty</p>
                  </div>
                ) : (
                  files.map((file, idx) => (
                    <motion.div
                      key={`${file.name}-${idx}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-4 bg-surface-container-high rounded border border-outline hover:border-primary/50 transition-all group flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4 overflow-hidden">
                        <div className="w-10 h-10 rounded-sm bg-black border border-outline flex items-center justify-center text-primary-container shrink-0">
                          <Microscope className="w-4 h-4 text-primary opacity-50" />
                        </div>
                        <div className="overflow-hidden space-y-1">
                          <p className="text-[10px] font-black text-on-surface truncate uppercase tracking-tight">{file.name}</p>
                          <p className="text-[9px] font-mono text-on-surface-variant uppercase">SIZE / {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFile(idx)}
                        className="p-2 hover:bg-tertiary/10 hover:text-tertiary text-outline transition-colors rounded"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            <div className="mt-10 pt-8 border-t border-outline">
              <button
                disabled={files.length === 0}
                onClick={() => onProcess(files)}
                className={cn(
                  "w-full py-5 rounded font-black uppercase tracking-[0.3em] text-[11px] transition-all flex items-center justify-center gap-3",
                  files.length > 0 
                    ? "bg-primary text-surface shadow-[0_0_30px_rgba(0,242,255,0.2)] hover:scale-[1.02]" 
                    : "bg-surface-container-high text-on-surface-variant cursor-not-allowed border border-outline"
                )}
              >
                Execute Analysis
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center justify-center gap-3 mt-6 text-[9px] text-on-surface-variant font-mono font-bold">
                <ShieldCheck className="w-3 h-3 text-secondary" />
                SECURE_TUNNEL / AES-256 ACTIVE
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


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
      setError("Some files were rejected. Please upload .nii or .nii.gz medical imaging files.");
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
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left Side: Upload Zone */}
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="text-3xl font-black text-primary font-headline tracking-tighter mb-2">Patient Scan Intake</h2>
            <p className="text-on-surface-variant max-w-lg">
              Upload multi-modal MRI scans (T1, T1c, T2, FLAIR). The system will automatically align modalities before segmentation.
            </p>
          </div>

          <div 
            {...getRootProps()} 
            className={cn(
              "relative border-2 border-dashed rounded-3xl p-12 transition-all duration-300 flex flex-col items-center justify-center min-h-[400px] cursor-pointer",
              isDragActive 
                ? "border-primary bg-primary/5 scale-[1.01]" 
                : "border-outline-variant hover:border-primary-container bg-white/50"
            )}
          >
            <input {...getInputProps()} />
            
            <div className="p-6 rounded-full bg-primary-container/10 text-primary mb-6 animate-bounce">
              <Upload className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold mb-2">Drop MRI modalities here</h3>
            <p className="text-sm text-outline mb-8">NIfTI (.nii, .nii.gz) or DCM supported</p>
            
            <button className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg ring-4 ring-primary/10">
              Browse Local Files
            </button>

            {isDragActive && (
              <div className="absolute inset-0 bg-primary/10 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                <p className="text-primary font-black text-2xl uppercase tracking-widest">Release to Upload</p>
              </div>
            )}
          </div>

          {error && (
            <div className="p-4 bg-tertiary/10 text-tertiary border border-tertiary/20 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Right Side: File Queue */}
        <div className="w-full lg:w-96 space-y-6">
          <div className="bg-surface-container-high/50 p-6 rounded-3xl border border-outline-variant/10">
            <h3 className="text-sm font-black uppercase tracking-widest text-on-surface-variant mb-6 flex items-center gap-2">
              <File className="w-4 h-4" />
              Upload Queue ({files.length})
            </h3>

            <div className="space-y-3 min-h-[200px] max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
              <AnimatePresence initial={false}>
                {files.length === 0 ? (
                  <div className="h-40 flex flex-col items-center justify-center text-outline/50 border-2 border-dashed border-outline-variant/20 rounded-2xl">
                    <Scan className="w-8 h-8 mb-2 opacity-20" />
                    <p className="text-xs">Queue is empty</p>
                  </div>
                ) : (
                  files.map((file, idx) => (
                    <motion.div
                      key={`${file.name}-${idx}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-4 bg-white rounded-xl border border-outline-variant/5 shadow-sm group flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary-container">
                          <Microscope className="w-5 h-5" />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-on-surface truncate">{file.name}</p>
                          <p className="text-[10px] text-outline">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFile(idx)}
                        className="p-1 hover:bg-tertiary/10 hover:text-tertiary text-outline transition-colors rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            <div className="mt-8 pt-6 border-t border-outline-variant/10">
              <button
                disabled={files.length === 0}
                onClick={() => onProcess(files)}
                className={cn(
                  "w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3",
                  files.length > 0 
                    ? "bg-primary text-white shadow-primary/20 hover:scale-[1.02]" 
                    : "bg-surface-container-highest text-outline cursor-not-allowed shadow-none"
                )}
              >
                Launch Model
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-outline font-bold">
                <ShieldCheck className="w-3 h-3" />
                SECURE END-TO-END ENCRYPTION ACTIVE
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

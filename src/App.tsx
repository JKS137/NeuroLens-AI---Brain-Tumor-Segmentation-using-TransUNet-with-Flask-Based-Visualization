/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Shell from './components/layout/Shell';
import Landing from './components/views/Landing';
import Analysis from './components/views/Analysis';
import Processing from './components/views/Processing';
import Results from './components/views/Results';
import { View, AnalysisResult } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleProcess = async (files: File[]) => {
    setCurrentView('processing');
    
    try {
      const response = await fetch('/api/segment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: files[0]?.name || 'scan.nii' })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setAnalysisResult({
          ...data,
          timestamp: new Date().toISOString()
        });
        setCurrentView('results');
      }
    } catch (err) {
      console.error("Backend processing failed:", err);
      // Fallback to demo results if backend is unreachable for some reason
      setTimeout(() => {
        setAnalysisResult({
          scanId: "SCAN-DEMO-942",
          metrics: { diceScore: 0.94, iou: 0.89, volumeCm3: 12.4, inferenceMs: 140 },
          findings: "Demonstration results: A hypothetical lesion was identified. Please ensure the backend server is running for real analysis.",
          timestamp: new Date().toISOString()
        });
        setCurrentView('results');
      }, 5000);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <Landing onAnalyzeClick={() => setCurrentView('analysis')} />;
      case 'analysis':
        return <Analysis onProcess={handleProcess} />;
      case 'processing':
        return <Processing />;
      case 'results':
        return analysisResult ? (
          <Results result={analysisResult} onReset={() => {
            setAnalysisResult(null);
            setCurrentView('analysis');
          }} />
        ) : (
          <Analysis onProcess={handleProcess} />
        );
      case 'history':
        return (
          <div className="p-12 text-center text-outline">
            <h2 className="text-2xl font-bold mb-4">Patient Archive</h2>
            <p>Connection to PACS required for retrospective analysis.</p>
          </div>
        );
      case 'insights':
        return (
          <div className="p-12 text-center text-outline">
            <h2 className="text-2xl font-bold mb-4">Model Interpretability</h2>
            <p>TransUNet attention maps and saliency visualization module is coming soon in v2.1.</p>
          </div>
        );
      default:
        return <Landing onAnalyzeClick={() => setCurrentView('analysis')} />;
    }
  };

  return (
    <Shell currentView={currentView} onViewChange={setCurrentView}>
      {renderView()}
    </Shell>
  );
}


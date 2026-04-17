export type View = 'landing' | 'analysis' | 'processing' | 'results' | 'history' | 'insights';

export interface AnalysisMetrics {
  diceScore: number;
  iou: number;
  volumeCm3: number;
  inferenceMs: number;
}

export interface AnalysisResult {
  scanId: string;
  metrics: AnalysisMetrics;
  findings: string;
  timestamp: string;
}

export interface PatientInfo {
  id: string;
  name: string;
  lastScanDate: string;
}

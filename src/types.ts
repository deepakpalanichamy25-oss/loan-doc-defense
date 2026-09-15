export type DocumentType = "loan" | "identity";

export type RiskLevel =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

export type AttackStatus =
  | "BLOCKED"
  | "DETECTED"
  | "SUCCESSFUL";

export type Severity =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

export interface UploadedDocument {
  file: File | null;
  name: string;
  size: number;
  type: string;
}

export interface AttackCategory {
  name: string;
  count: number;
  blocked: number;
  successful: number;
  percentage: number;
  resilience: number;
}

export interface PipelineStatusType {
  extraction: "PASS" | "FAIL" | "WARNING";
  validation: "PASS" | "FAIL" | "WARNING";
  humanEscalation: "PASS" | "FAIL" | "WARNING";
  crossTenantIsolation: "PASS" | "FAIL" | "WARNING";
}

export interface AttackResult {
  id: string;
  category: string;
  attackType: string;
  sourceDocument: string;
  severity: Severity;
  status: AttackStatus;
  description: string;
}

export interface SecurityTestResult {
  testId: string;
  overallScore: number;
  riskLevel: RiskLevel;
  totalAttacks: number;
  blockedAttacks: number;
  successfulAttacks: number;
  categories: AttackCategory[];
  pipeline: PipelineStatusType;
  attacks: AttackResult[];
}

export interface SecurityTestApiResponse {
  success: boolean;
  jobId?: string;
  status?: string;
  result?: SecurityTestResult;
  message?: string;
  error?: string;
}

export interface HistoryEntry {
  testId: string;
  timestamp: string;
  jobId: string;
  status: string;
  loanDocumentName: string;
  identityDocumentName: string;
  result: SecurityTestResult;
}

export interface HistoryApiResponse {
  success: boolean;
  history?: HistoryEntry[];
  message?: string;
}
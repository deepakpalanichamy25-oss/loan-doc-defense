import { useEffect, useState } from "react";
import { Clock, ChevronRight, AlertCircle } from "lucide-react";

import type { HistoryApiResponse, HistoryEntry } from "../types";

interface Props {
  onSelect: (entry: HistoryEntry) => void;
}

const riskColors: Record<string, string> = {
  LOW: "#16a34a",
  MEDIUM: "#d97706",
  HIGH: "#ea580c",
  CRITICAL: "#dc2626",
};

export default function AttackHistory({ onSelect }: Props) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadHistory = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/security-test/history");
        const data = (await response.json()) as HistoryApiResponse;

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Unable to load history.");
        }

        if (!cancelled) {
          setHistory(data.history ?? []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load history right now."
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadHistory();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      style={{
        marginTop: 30,
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "18px 20px",
          borderBottom: "1px solid #f1f5f9",
        }}
      >
        <h2 style={{ margin: 0, fontSize: 15 }}>
          Loan Doc Attack History
        </h2>

        <p style={{ margin: "5px 0 0", fontSize: 11, color: "#9ca3af" }}>
          Previously run security tests, most recent first.
        </p>
      </div>

      {isLoading && (
        <div style={{ padding: 30, textAlign: "center", color: "#9ca3af", fontSize: 12 }}>
          Loading history...
        </div>
      )}

      {!isLoading && error && (
        <div
          style={{
            margin: 20,
            padding: "12px 14px",
            borderRadius: 8,
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#b91c1c",
            fontSize: 11,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {!isLoading && !error && history.length === 0 && (
        <div style={{ padding: 40, textAlign: "center", color: "#9ca3af", fontSize: 12 }}>
          <Clock size={26} style={{ marginBottom: 10 }} />
          <div>No security tests have been run yet.</div>
        </div>
      )}

      {!isLoading && !error && history.length > 0 && (
        <div>
          {history.map((entry) => (
            <button
              key={entry.testId}
              onClick={() => onSelect(entry)}
              style={{
                width: "100%",
                border: 0,
                borderTop: "1px solid #f1f5f9",
                background: "transparent",
                padding: "14px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div>
                <strong style={{ fontSize: 12 }}>{entry.result.testId}</strong>

                <div style={{ marginTop: 4, fontSize: 10, color: "#9ca3af" }}>
                  {new Date(entry.timestamp).toLocaleString()} &middot;{" "}
                  {entry.loanDocumentName} &amp; {entry.identityDocumentName}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: riskColors[entry.result.riskLevel] ?? "#64748b",
                  }}
                >
                  {entry.result.riskLevel}
                </span>

                <span style={{ fontSize: 11, color: "#374151" }}>
                  Score {entry.result.overallScore}
                </span>

                <span style={{ fontSize: 11, color: "#374151" }}>
                  {entry.result.blockedAttacks}/{entry.result.totalAttacks} blocked
                </span>

                <ChevronRight size={16} color="#9ca3af" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

import {
  FileSearch,
  CheckCircle,
  UserRoundCheck,
  Database,
} from "lucide-react";

import type { PipelineStatusType } from "../types";

interface Props {
  pipeline: PipelineStatusType;
}

export default function PipelineStatus({
  pipeline,
}: Props) {
  const items = [
    {
      title: "Document Extraction",
      description:
        "Extracted values remained unaffected by injected instructions.",
      value: pipeline.extraction,
      icon: <FileSearch size={20} />,
    },

    {
      title: "Validation & Agent Review",
      description:
        "Anomalous or inconsistent data was detected.",
      value: pipeline.validation,
      icon: <CheckCircle size={20} />,
    },

    {
      title: "Human Escalation",
      description:
        "Mandatory human review could not be bypassed.",
      value: pipeline.humanEscalation,
      icon: <UserRoundCheck size={20} />,
    },

    {
      title: "Cross-Tenant Isolation",
      description:
        "No unrelated applicant or tenant data was exposed.",
      value: pipeline.crossTenantIsolation,
      icon: <Database size={20} />,
    },
  ];

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "18px 20px",
          borderBottom:
            "1px solid #f1f5f9",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 15,
          }}
        >
          Pipeline Security Validation
        </h2>

        <p
          style={{
            margin: "5px 0 0",
            fontSize: 11,
            color: "#9ca3af",
          }}
        >
          Critical security control validation
        </p>
      </div>

      <div style={{ padding: "5px 20px" }}>
        {items.map((item) => (
          <div
            key={item.title}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "15px 0",
              borderBottom:
                "1px solid #f1f5f9",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                background:
                  item.value === "PASS"
                    ? "#f0fdf4"
                    : "#fef2f2",
                color:
                  item.value === "PASS"
                    ? "#16a34a"
                    : "#dc2626",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {item.icon}
            </div>

            <div style={{ flex: 1 }}>
              <strong
                style={{
                  display: "block",
                  fontSize: 11,
                }}
              >
                {item.title}
              </strong>

              <span
                style={{
                  display: "block",
                  marginTop: 4,
                  fontSize: 9,
                  color: "#9ca3af",
                  lineHeight: 1.4,
                }}
              >
                {item.description}
              </span>
            </div>

            <span
              style={{
                padding: "5px 8px",
                borderRadius: 5,
                background:
                  item.value === "PASS"
                    ? "#f0fdf4"
                    : "#fef2f2",
                color:
                  item.value === "PASS"
                    ? "#15803d"
                    : "#b91c1c",
                fontSize: 8,
                fontWeight: 700,
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
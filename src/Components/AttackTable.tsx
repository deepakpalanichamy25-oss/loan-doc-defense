import {
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

import type { AttackResult } from "../types";

interface Props {
  attacks: AttackResult[];
}

export default function AttackTable({
  attacks,
}: Props) {
  const statusIcon = (
    status: string
  ) => {
    if (status === "BLOCKED") {
      return (
        <CheckCircle
          size={15}
          color="#16a34a"
        />
      );
    }

    if (status === "SUCCESSFUL") {
      return (
        <XCircle
          size={15}
          color="#dc2626"
        />
      );
    }

    return (
      <AlertTriangle
        size={15}
        color="#d97706"
      />
    );
  };

  return (
    <div
      style={{
        marginTop: 18,
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
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 15,
            }}
          >
            Attack Details
          </h2>

          <p
            style={{
              margin: "5px 0 0",
              fontSize: 11,
              color: "#9ca3af",
            }}
          >
            Individual adversarial test results
          </p>
        </div>

        <button
          style={{
            border: "1px solid #dbe2ea",
            background: "#ffffff",
            borderRadius: 7,
            padding: "7px 12px",
            fontSize: 10,
            cursor: "pointer",
          }}
        >
          Export Report
        </button>
      </div>

      <div
        style={{
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse:
              "collapse",
            minWidth: 800,
          }}
        >
          <thead>
            <tr>
              {[
                "Attack ID",
                "Category",
                "Attack Type",
                "Document",
                "Severity",
                "Status",
              ].map((header) => (
                <th
                  key={header}
                  style={{
                    textAlign: "left",
                    padding:
                      "11px 15px",
                    background:
                      "#f8fafc",
                    color: "#64748b",
                    fontSize: 9,
                    textTransform:
                      "uppercase",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {attacks.map((attack) => (
              <tr key={attack.id}>
                <td
                  style={{
                    padding:
                      "13px 15px",
                    borderTop:
                      "1px solid #f1f5f9",
                    fontSize: 10,
                    fontWeight: 600,
                  }}
                >
                  {attack.id}
                </td>

                <td
                  style={{
                    padding:
                      "13px 15px",
                    borderTop:
                      "1px solid #f1f5f9",
                    fontSize: 10,
                  }}
                >
                  {attack.category}
                </td>

                <td
                  style={{
                    padding:
                      "13px 15px",
                    borderTop:
                      "1px solid #f1f5f9",
                    fontSize: 10,
                  }}
                >
                  {attack.attackType}
                </td>

                <td
                  style={{
                    padding:
                      "13px 15px",
                    borderTop:
                      "1px solid #f1f5f9",
                    fontSize: 10,
                  }}
                >
                  {attack.sourceDocument}
                </td>

                <td
                  style={{
                    padding:
                      "13px 15px",
                    borderTop:
                      "1px solid #f1f5f9",
                  }}
                >
                  <span
                    style={{
                      padding:
                        "4px 7px",
                      borderRadius: 5,
                      fontSize: 8,
                      fontWeight: 700,
                      background:
                        attack.severity ===
                        "CRITICAL"
                          ? "#fef2f2"
                          : attack.severity ===
                            "HIGH"
                          ? "#fff7ed"
                          : "#fffbeb",
                      color:
                        attack.severity ===
                        "CRITICAL"
                          ? "#b91c1c"
                          : attack.severity ===
                            "HIGH"
                          ? "#c2410c"
                          : "#b45309",
                    }}
                  >
                    {attack.severity}
                  </span>
                </td>

                <td
                  style={{
                    padding:
                      "13px 15px",
                    borderTop:
                      "1px solid #f1f5f9",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems:
                        "center",
                      gap: 5,
                      fontSize: 8,
                      fontWeight: 700,
                      color:
                        attack.status ===
                        "BLOCKED"
                          ? "#15803d"
                          : attack.status ===
                            "SUCCESSFUL"
                          ? "#b91c1c"
                          : "#b45309",
                    }}
                  >
                    {statusIcon(
                      attack.status
                    )}

                    {attack.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
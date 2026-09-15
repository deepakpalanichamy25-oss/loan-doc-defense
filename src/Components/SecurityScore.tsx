import {
  ShieldCheck,
  Bug,
  Ban,
  ShieldAlert,
  AlertTriangle,
} from "lucide-react";

interface Props {
  score: number;
  total: number;
  blocked: number;
  successful: number;
  risk: string;
}

export default function SecurityScore({
  score,
  total,
  blocked,
  successful,
  risk,
}: Props) {
  const metrics = [
    {
      title: "Total Attacks",
      value: total,
      subtitle: "Test scenarios",
      icon: <Bug size={20} />,
      bg: "#eff6ff",
      color: "#2563eb",
    },
    {
      title: "Blocked",
      value: blocked,
      subtitle: `${Math.round(
        (blocked / total) * 100
      )}% defended`,
      icon: <Ban size={20} />,
      bg: "#f0fdf4",
      color: "#16a34a",
    },
    {
      title: "Successful",
      value: successful,
      subtitle: "Requires remediation",
      icon: <ShieldAlert size={20} />,
      bg: "#fef2f2",
      color: "#dc2626",
    },
    {
      title: "Risk Level",
      value: risk,
      subtitle: "Current assessment",
      icon: <AlertTriangle size={20} />,
      bg: "#fff7ed",
      color: "#ea580c",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "1.4fr repeat(4, 1fr)",
        gap: 14,
        marginTop: 20,
      }}
    >
      {/* Score */}

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 18,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 9,
            background: "#eff6ff",
            color: "#2563eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ShieldCheck size={22} />
        </div>

        <div>
          <span
            style={{
              display: "block",
              fontSize: 11,
              color: "#6b7280",
            }}
          >
            Security Score
          </span>

          <strong
            style={{
              display: "block",
              marginTop: 5,
              fontSize: 27,
            }}
          >
            {score}%
          </strong>
        </div>

        <div
          style={{
            marginLeft: "auto",
            width: 62,
            height: 62,
            borderRadius: "50%",
            background: `conic-gradient(
              #22c55e ${score * 3.6}deg,
              #e5e7eb ${score * 3.6}deg
            )`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 49,
              height: 49,
              borderRadius: "50%",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            {score}%
          </div>
        </div>
      </div>

      {/* Other metrics */}

      {metrics.map((metric) => (
        <div
          key={metric.title}
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: 18,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 9,
              background: metric.bg,
              color: metric.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {metric.icon}
          </div>

          <div>
            <span
              style={{
                display: "block",
                fontSize: 10,
                color: "#6b7280",
              }}
            >
              {metric.title}
            </span>

            <strong
              style={{
                display: "block",
                marginTop: 5,
                fontSize:
                  metric.title ===
                  "Risk Level"
                    ? 17
                    : 22,
                color:
                  metric.title === "Risk Level"
                    ? metric.color
                    : "#111827",
              }}
            >
              {metric.value}
            </strong>

            <small
              style={{
                display: "block",
                marginTop: 3,
                color: "#9ca3af",
                fontSize: 9,
              }}
            >
              {metric.subtitle}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}
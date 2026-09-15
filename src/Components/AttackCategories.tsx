import type { AttackCategory } from "../types";

interface Props {
  categories: AttackCategory[];
}

export default function AttackCategories({
  categories,
}: Props) {
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
          Attack Categories
        </h2>

        <p
          style={{
            margin: "5px 0 0",
            fontSize: 11,
            color: "#9ca3af",
          }}
        >
          Attack distribution and defense
          effectiveness
        </p>
      </div>

      <div style={{ padding: 20 }}>
        {categories.map((category) => (
          <div
            key={category.name}
            style={{
              marginBottom: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                marginBottom: 7,
              }}
            >
              <div>
                <strong
                  style={{
                    fontSize: 11,
                  }}
                >
                  {category.name}
                </strong>

                <span
                  style={{
                    marginLeft: 8,
                    fontSize: 9,
                    color: "#9ca3af",
                  }}
                >
                  {category.count} attacks
                </span>
              </div>

              <strong
                style={{
                  fontSize: 11,
                }}
              >
                {category.percentage}%
              </strong>
            </div>

            {/* Distribution bar */}

            <div
              style={{
                height: 8,
                borderRadius: 20,
                background: "#f1f5f9",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${category.percentage}%`,
                  height: "100%",
                  borderRadius: 20,
                  background: "#2563eb",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                marginTop: 6,
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  color: "#94a3b8",
                }}
              >
                Blocked: {category.blocked}
              </span>

              <span
                style={{
                  fontSize: 9,
                  color:
                    category.resilience ===
                    100
                      ? "#16a34a"
                      : "#d97706",
                  fontWeight: 600,
                }}
              >
                Resilience:{" "}
                {category.resilience}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
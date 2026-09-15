import { useEffect, useState } from "react";

import {
  Shield,
  Activity,
  FileWarning,
  RotateCcw,
  Lock,
  UploadCloud,
  Play,
  ChevronRight,
  CheckCircle,
  X,
  History,
} from "lucide-react";

import DocumentUpload from "./Components/DocumentUpload";
import SecurityScore from "./Components/SecurityScore";
import AttackCategories from "./Components/AttackCategories";
import PipelineStatus from "./Components/PipelineStatus";
import AttackTable from "./Components/AttackTable";
import AttackHistory from "./Components/AttackHistory";

import type {
  DocumentType,
  UploadedDocument,
  SecurityTestResult,
  SecurityTestApiResponse,
  HistoryEntry,
} from "./types";

const emptyDocument: UploadedDocument = {
  file: null,
  name: "",
  size: 0,
  type: "",
};

export default function App() {
  const [loanDocument, setLoanDocument] =
    useState<UploadedDocument>(
      emptyDocument
    );

  const [identityDocument, setIdentityDocument] =
    useState<UploadedDocument>(
      emptyDocument
    );
  const [previewDocument, setPreviewDocument] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  useEffect(() => {
    if (!previewDocument) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(
      previewDocument
    );

    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [previewDocument]);

  const [result, setResult] =
    useState<SecurityTestResult | null>(
      null
    );

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const [isRunning, setIsRunning] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState<"overview" | "attacks" | "history">(
      "overview"
    );

  const handleFileSelect = (
    type: DocumentType,
    file: File
  ) => {
    const document: UploadedDocument = {
      file,
      name: file.name,
      size: file.size,
      type: file.type,
    };

    if (type === "loan") {
      setLoanDocument(document);
    } else {
      setIdentityDocument(document);
    }

    setResult(null);
  };

  const removeDocument = (
    type: DocumentType
  ) => {
    if (type === "loan") {
      setLoanDocument(
        emptyDocument
      );
    } else {
      setIdentityDocument(
        emptyDocument
      );
    }

    setResult(null);
  };

  const runSecurityTest = async () => {
    if (
      !loanDocument.file ||
      !identityDocument.file
    ) {
      setErrorMessage(
        "Please upload both Loan Application and Identity Document."
      );
      return;
    }

    setIsRunning(true);
    setErrorMessage(null);
    setResult(null);

    try {
      const formData = new FormData();

      formData.append(
        "loan_application",
        loanDocument.file
      );

      formData.append(
        "identity_document",
        identityDocument.file
      );

      const response = await fetch(
        "/api/security-test",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = (await response.json()) as SecurityTestApiResponse;

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Security test failed. The Opus workflow could not be completed."
        );
      }

      if (!data.result) {
        throw new Error(
          "The security test completed without a result payload."
        );
      }

      setResult(data.result);
      setActiveTab("overview");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to complete the security test right now."
      );
    } finally {
      setIsRunning(false);
    }
  };

  const resetTest = () => {
    setLoanDocument(
      emptyDocument
    );

    setIdentityDocument(
      emptyDocument
    );

    setPreviewDocument(null);
    setResult(null);
    setErrorMessage(null);

    setActiveTab("overview");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f8fb",
        display: "flex",
        fontFamily:
          "Inter, Arial, sans-serif",
        color: "#172033",
      }}
    >
      {/* SIDEBAR */}

      <aside
        style={{
          width: 245,
          background: "#111827",
          color: "white",
          minHeight: "100vh",
          padding: "22px 15px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Brand */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 11,
            padding:
              "5px 10px 28px",
          }}
        >
          <div
            style={{
              width: 39,
              height: 39,
              borderRadius: 10,
              background: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Shield size={22} />
          </div>

          <div>
            <strong
              style={{
                display: "block",
                fontSize: 14,
              }}
            >
              AAI Security
            </strong>

            <span
              style={{
                display: "block",
                marginTop: 3,
                fontSize: 10,
                color: "#9ca3af",
              }}
            >
              Red Team Platform
            </span>
          </div>
        </div>

        {/* Navigation */}

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <button
            onClick={() =>
              setActiveTab(
                "overview"
              )
            }
            style={{
              border: 0,
              background:
                activeTab === "overview"
                  ? "#1d4ed8"
                  : "transparent",
              color:
                activeTab === "overview"
                  ? "white"
                  : "#9ca3af",
              padding: 12,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              textAlign: "left",
              fontSize: 12,
            }}
          >
            <Activity size={18} />

            Security Overview
          </button>

          {/* <button
            onClick={() =>
              setActiveTab("attacks")
            }
            style={{
              border: 0,
              background:
                activeTab === "attacks"
                  ? "#1d4ed8"
                  : "transparent",
              color:
                activeTab === "attacks"
                  ? "white"
                  : "#9ca3af",
              padding: 12,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              textAlign: "left",
              fontSize: 12,
            }}
          >
            <FileWarning size={18} />

            Attack Results
          </button> */}

          <button
            onClick={() =>
              setActiveTab(
                "history"
              )
            }
            style={{
              border: 0,
              background:
                activeTab === "history"
                  ? "#1d4ed8"
                  : "transparent",
              color:
                activeTab === "history"
                  ? "white"
                  : "#9ca3af",
              padding: 12,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              textAlign: "left",
              fontSize: 12,
            }}
          >
            <History size={18} />

            Loan Doc Attack History
          </button>

          <button
            onClick={resetTest}
            style={{
              border: 0,
              background:
                "transparent",
              color: "#9ca3af",
              padding: 12,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              textAlign: "left",
              fontSize: 12,
            }}
          >
            <RotateCcw size={18} />

            New Test
          </button>
        </nav>

        {/* Bottom */}

        <div
          style={{
            marginTop: "auto",
            borderTop:
              "1px solid #263142",
            padding:
              "14px 10px",
            display: "flex",
            alignItems: "center",
            gap: 7,
            color: "#9ca3af",
            fontSize: 10,
          }}
        >
          <Lock size={15} />

          Secure Test Environment
        </div>
      </aside>

      {/* MAIN */}

      <main
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        {/* TOPBAR */}

        <header
          style={{
            background: "white",
            borderBottom:
              "1px solid #e5e7eb",
            padding:
              "22px 34px",
            minHeight: 100,
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                color: "#9ca3af",
                fontSize: 10,
                marginBottom: 7,
              }}
            >
              Security Testing

              <ChevronRight size={13} />

              Loan Processing
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 23,
              }}
            >
              Poisoned Loan Document
            </h1>

            <p
              style={{
                margin:
                  "5px 0 0",
                color: "#6b7280",
                fontSize: 12,
              }}
            >
              Indirect Prompt Injection
              Resilience Test
            </p>
          </div>

          {result && (
            <div
              style={{
                textAlign: "right",
                fontSize: 10,
                color: "#9ca3af",
              }}
            >
              Test ID

              <strong
                style={{
                  display: "block",
                  color: "#374151",
                  fontSize: 12,
                  marginTop: 3,
                }}
              >
                {result.testId}
              </strong>
            </div>
          )}
        </header>

        {/* CONTENT */}

        <section
          style={{
            maxWidth: 1400,
            margin: "auto",
            padding:
              "28px 34px 60px",
          }}
        >
          {/* Security Banner */}

          <div
            style={{
              display: "flex",
              gap: 14,
              padding: 18,
              background: "#eff6ff",
              border:
                "1px solid #bfdbfe",
              borderRadius: 11,
            }}
          >
            <div
              style={{
                width: 45,
                height: 45,
                flexShrink: 0,
                borderRadius: 9,
                background: "#dbeafe",
                color: "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Shield size={25} />
            </div>

            <div>
              <h3
                style={{
                  margin:
                    "1px 0 5px",
                  fontSize: 14,
                }}
              >
                Indirect Prompt Injection
                Test
              </h3>

              <p
                style={{
                  margin: 0,
                  maxWidth: 950,
                  color: "#4b5563",
                  fontSize: 11,
                  lineHeight: 1.6,
                }}
              >
                Verify that submitted loan
                documents are treated strictly
                as data and embedded
                instructions cannot manipulate
                extraction, validation,
                escalation, approval, or data
                access.
              </p>
            </div>
          </div>

          {/* Upload Section */}

          {activeTab !== "history" && (
          <section
            style={{
              marginTop: 30,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    background: "#eff6ff",
                    color: "#2563eb",
                    borderRadius: 6,
                    padding:
                      "7px 8px",
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                >
                  01
                </span>

                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: 16,
                    }}
                  >
                    Upload Test Documents
                  </h2>

                  <p
                    style={{
                      margin:
                        "4px 0 0",
                      fontSize: 11,
                      color: "#9ca3af",
                    }}
                  >
                    Provide documents to analyze
                    for adversarial content.
                  </p>
                </div>
              </div>

              <UploadCloud
                size={22}
                color="#64748b"
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2, minmax(0, 1fr))",
                gap: 18,
              }}
            >
              <DocumentUpload
                type="loan"
                document={
                  loanDocument
                }
                onFileSelect={(
                  file
                ) =>
                  handleFileSelect(
                    "loan",
                    file
                  )
                }
                onRemove={() =>
                  removeDocument(
                    "loan"
                  )
                }
                onPreview={() =>
                  setPreviewDocument(loanDocument.file)
                }
              />

              <DocumentUpload
                type="identity"
                document={
                  identityDocument
                }
                onFileSelect={(
                  file
                ) =>
                  handleFileSelect(
                    "identity",
                    file
                  )
                }
                onRemove={() =>
                  removeDocument(
                    "identity"
                  )
                }
                onPreview={() =>
                  setPreviewDocument(identityDocument.file)
                }
              />
            </div>

            {/* Run Button */}

            {errorMessage && (
              <div
                style={{
                  marginTop: 16,
                  padding: "12px 14px",
                  borderRadius: 8,
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#b91c1c",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {errorMessage}
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent:
                  "flex-end",
                marginTop: 15,
              }}
            >
              <button
                onClick={
                  runSecurityTest
                }
                disabled={isRunning}
                style={{
                  border: 0,
                  background:
                    "#2563eb",
                  color: "white",
                  padding:
                    "11px 19px",
                  borderRadius: 7,
                  display: "flex",
                  alignItems:
                    "center",
                  gap: 8,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: isRunning
                    ? "not-allowed"
                    : "pointer",
                  opacity: isRunning
                    ? 0.7
                    : 1,
                }}
              >
                {isRunning ? (
                  <>
                    <span
                      style={{
                        width: 14,
                        height: 14,
                        border:
                          "2px solid rgba(255,255,255,.4)",
                        borderTopColor:
                          "white",
                        borderRadius:
                          "50%",
                        animation:
                          "spin .7s linear infinite",
                      }}
                    />

                    Running Security
                    Test...
                  </>
                ) : (
                  <>
                    <Play size={17} />

                    Run Security Test
                  </>
                )}
              </button>
            </div>
          </section>
          )}

          {previewDocument && (
            <div
              onClick={() =>
                setPreviewDocument(null)
              }
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(15, 23, 42, 0.75)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
                padding: 30,
              }}
            >
              <div
                onClick={(e) =>
                  e.stopPropagation()
                }
                style={{
                  width: "90%",
                  maxWidth: 1000,
                  height: "90vh",
                  background: "white",
                  borderRadius: 12,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,0.3)",
                }}
              >
                {/* Preview Header */}

                <div
                  style={{
                    height: 55,
                    padding: "0 18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom:
                      "1px solid #e5e7eb",
                  }}
                >
                  <div>
                    <strong
                      style={{
                        fontSize: 13,
                      }}
                    >
                      Document Preview
                    </strong>

                    <span
                      style={{
                        marginLeft: 10,
                        fontSize: 10,
                        color: "#64748b",
                      }}
                    >
                      {previewDocument.name}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      setPreviewDocument(null)
                    }
                    style={{
                      width: 32,
                      height: 32,
                      border: 0,
                      borderRadius: 7,
                      background: "#f1f5f9",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Document */}

                <div
                  style={{
                    flex: 1,
                    background: "#f1f5f9",
                    padding: 15,
                  }}
                >
                  {previewDocument.type ===
                    "application/pdf" ? (
                    <iframe
                      src={previewUrl ?? undefined}
                      title="PDF Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        border: 0,
                        borderRadius: 8,
                        background: "white",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "auto",
                      }}
                    >
                      <img
                        src={previewUrl ?? undefined}
                        alt="Document Preview"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                          borderRadius: 6,
                          boxShadow:
                            "0 2px 10px rgba(0,0,0,0.1)",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* RESULTS */}

          {result && activeTab !== "history" && (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems:
                    "center",
                  gap: 12,
                  margin:
                    "35px 0 16px",
                  color: "#9ca3af",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing:
                    "1.2px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background:
                      "#e5e7eb",
                  }}
                />

                SECURITY TEST RESULTS

                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background:
                      "#e5e7eb",
                  }}
                />
              </div>

              <SecurityScore
                score={
                  result.overallScore
                }
                total={
                  result.totalAttacks
                }
                blocked={
                  result.blockedAttacks
                }
                successful={
                  result.successfulAttacks
                }
                risk={
                  result.riskLevel
                }
              />

              {/* Tab buttons */}

              <div
                style={{
                  display: "flex",
                  gap: 5,
                  marginTop: 22,
                  borderBottom:
                    "1px solid #e5e7eb",
                }}
              >
                {/* <button
                  onClick={() =>
                    setActiveTab(
                      "overview"
                    )
                  }
                  style={{
                    border: 0,
                    borderBottom:
                      activeTab ===
                        "overview"
                        ? "2px solid #2563eb"
                        : "2px solid transparent",
                    background:
                      "transparent",
                    padding:
                      "10px 14px",
                    color:
                      activeTab ===
                        "overview"
                        ? "#2563eb"
                        : "#64748b",
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Overview
                </button> */}

                <button
                  onClick={() =>
                    setActiveTab(
                      "attacks"
                    )
                  }
                  style={{
                    border: 0,
                    borderBottom:
                      activeTab ===
                        "attacks"
                        ? "2px solid #2563eb"
                        : "2px solid transparent",
                    background:
                      "transparent",
                    padding:
                      "10px 14px",
                    color:
                      activeTab ===
                        "attacks"
                        ? "#2563eb"
                        : "#64748b",
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Attack Results
                </button>
              </div>

              {activeTab ===
                "overview" && (
                  <>
                    <div
                      style={{
                        display:
                          "grid",
                        gridTemplateColumns:
                          "1.3fr 1fr",
                        gap: 18,
                        marginTop: 18,
                      }}
                    >
                      <AttackCategories
                        categories={
                          result.categories
                        }
                      />

                      <PipelineStatus
                        pipeline={
                          result.pipeline
                        }
                      />
                    </div>

                    <AttackTable
                      attacks={
                        result.attacks
                      }
                    />
                  </>
                )}

              {activeTab ===
                "attacks" && (
                  <AttackTable
                    attacks={
                      result.attacks
                    }
                  />
                )}

              {/* Success message */}

              {result.successfulAttacks ===
                0 && (
                  <div
                    style={{
                      marginTop: 18,
                      padding: 15,
                      borderRadius: 9,
                      background:
                        "#f0fdf4",
                      border:
                        "1px solid #bbf7d0",
                      color: "#15803d",
                      display: "flex",
                      alignItems:
                        "center",
                      gap: 8,
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    <CheckCircle
                      size={17}
                    />

                    All adversarial attacks
                    were successfully blocked.
                  </div>
                )}
            </>
          )}

          {/* Loan Doc Attack History */}

          {activeTab === "history" && (
            <AttackHistory
              onSelect={(entry: HistoryEntry) => {
                setResult(entry.result);
                setActiveTab("overview");
              }}
            />
          )}

          {/* Empty */}

          {!result &&
            !isRunning &&
            activeTab !== "history" && (
              <div
                style={{
                  marginTop: 30,
                  padding:
                    "55px 20px",
                  background:
                    "#ffffff",
                  border:
                    "1px solid #e5e7eb",
                  borderRadius: 11,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    margin: "auto",
                    borderRadius:
                      "50%",
                    background:
                      "#eff6ff",
                    color: "#2563eb",
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                  }}
                >
                  <Shield
                    size={31}
                  />
                </div>

                <h3
                  style={{
                    margin:
                      "15px 0 7px",
                    fontSize: 14,
                  }}
                >
                  Ready for Security
                  Testing
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#9ca3af",
                    fontSize: 11,
                  }}
                >
                  Upload both documents and
                  run the security test to
                  analyze indirect prompt
                  injection attacks.
                </p>
              </div>
            )}
        </section>
      </main>

      {/* Inline animation */}

      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          @media (max-width: 1000px) {
            aside {
              width: 200px !important;
            }

            main section {
              padding-left: 20px !important;
              padding-right: 20px !important;
            }
          }

          @media (max-width: 800px) {
            aside {
              display: none !important;
            }

            main header {
              padding-left: 20px !important;
              padding-right: 20px !important;
            }

            main section {
              padding-left: 15px !important;
              padding-right: 15px !important;
            }
          }
        `}
      </style>
    </div>
  );
}
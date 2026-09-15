import type { ChangeEvent, DragEvent } from "react";
import {
    Upload,
    FileText,
    CreditCard,
    CheckCircle,
    X,
    Eye,
} from "lucide-react";

import type {
    DocumentType,
    UploadedDocument,
} from "../types";

interface Props {
    type: DocumentType;
    document: UploadedDocument;
    onFileSelect: (file: File) => void;
    onRemove: () => void;
    onPreview?: () => void;
}

export default function DocumentUpload({
    type,
    document,
    onFileSelect,
    onRemove,
    onPreview,
}: Props) {
    const isLoan = type === "loan";

    const handleDrop = (
        event: DragEvent<HTMLDivElement>
    ) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0];

        if (file) {
            onFileSelect(file);
        }
    };

    const handleFileChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (file) {
            onFileSelect(file);
        }
    };

    return (
        <div
            style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: 14,
                padding: 20,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
        >
            {/* Header */}

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 18,
                }}
            >
                <div
                    style={{
                        width: 46,
                        height: 46,
                        borderRadius: 10,
                        background: isLoan
                            ? "#eff6ff"
                            : "#f5f3ff",
                        color: isLoan
                            ? "#2563eb"
                            : "#7c3aed",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {isLoan ? (
                        <FileText size={24} />
                    ) : (
                        <CreditCard size={24} />
                    )}
                </div>

                <div style={{ flex: 1 }}>
                    <h3
                        style={{
                            margin: 0,
                            fontSize: 15,
                            color: "#111827",
                        }}
                    >
                        {isLoan
                            ? "Loan Application"
                            : "Identity Document"}
                    </h3>

                    <p
                        style={{
                            margin: "5px 0 0",
                            fontSize: 12,
                            color: "#6b7280",
                        }}
                    >
                        {isLoan
                            ? "Upload applicant loan application"
                            : "Upload applicant identity proof"}
                    </p>
                </div>

                {document.file && (
                    <CheckCircle
                        size={22}
                        color="#16a34a"
                    />
                )}
            </div>

            {/* Empty */}

            {!document.file ? (
                <div
                    onDrop={handleDrop}
                    onDragOver={(e) =>
                        e.preventDefault()
                    }
                    style={{
                        minHeight: 175,
                        border: "1.5px dashed #cbd5e1",
                        borderRadius: 10,
                        background: "#f8fafc",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                    }}
                >
                    <Upload
                        size={30}
                        color="#64748b"
                    />

                    <strong
                        style={{
                            fontSize: 13,
                            color: "#374151",
                        }}
                    >
                        Drop document here
                    </strong>

                    <span
                        style={{
                            fontSize: 11,
                            color: "#9ca3af",
                        }}
                    >
                        or
                    </span>

                    <label
                        style={{
                            background: "#2563eb",
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: 7,
                            fontSize: 11,
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        Browse File

                        <input
                            type="file"
                            hidden
                            accept={
                                isLoan
                                    ? ".pdf,.doc,.docx"
                                    : ".pdf,.jpg,.jpeg,.png"
                            }
                            onChange={handleFileChange}
                        />
                    </label>

                    <small
                        style={{
                            fontSize: 10,
                            color: "#94a3b8",
                        }}
                    >
                        {isLoan
                            ? "PDF, DOC, DOCX"
                            : "PDF, JPG, PNG"}
                    </small>
                </div>
            ) : (
                /* Selected */

                <div
                    style={{
                        minHeight: 175,
                        borderRadius: 10,
                        background: "#f8fafc",
                        padding: 20,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <FileText
                            size={27}
                            color="#2563eb"
                        />

                        <div>
                            <strong
                                style={{
                                    display: "block",
                                    fontSize: 13,
                                    maxWidth: 300,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {document.name}
                            </strong>

                            <span
                                style={{
                                    display: "block",
                                    marginTop: 5,
                                    fontSize: 10,
                                    color: "#9ca3af",
                                }}
                            >
                                {(document.size / 1024).toFixed(
                                    1
                                )}{" "}
                                KB
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onPreview}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            border: "1px solid #bfdbfe",
                            background: "#eff6ff",
                            color: "#2563eb",
                            borderRadius: 7,
                            padding: "8px 12px",
                            fontSize: 10,
                            fontWeight: 600,
                            cursor: "pointer",
                            marginRight: 8,
                        }}
                    >
                        <Eye size={15} />
                        View Document
                    </button>
                    <button
                        onClick={onRemove}
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: 7,
                            border: "1px solid #e5e7eb",
                            background: "#ffffff",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <X
                            size={17}
                            color="#6b7280"
                        />
                    </button>
                </div>
            )}
        </div>
    );
}
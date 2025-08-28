"use client";

export default function AuthLayout({ children }) {
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "var(--color-bg)" }}>
      <div
        className="w-full max-w-md rounded-xl p-6"
        style={{
          backgroundColor: "var(--color-card-primary)",
          color: "var(--color-card-primary-text)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
        }}
      >
        {children}
      </div>
    </div>
  );
}
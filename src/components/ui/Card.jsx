import React from "react";

export default function Card({ title, description, icon, children, className = "" }) {
  return (
    <div
      className={`
        relative p-8 rounded-[1.5rem] shadow-lg transition-transform duration-300
        hover:-translate-y-1 hover:scale-105 hover:shadow-2xl
        bg-card-secondary text-card-secondary-text
        ${className}
      `}
      style={{
        color: "var(--color-card-secondary-text)",
        backgroundColor: "var(--color-card-secondary)",
        boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
        perspective: "1000px",
      }}
    >
      {icon && <div className="mb-4 text-4xl">{icon}</div>}

      {title && (
        <h3 className="text-xl md:text-2xl font-semibold mb-4">
          {title}
        </h3>
      )}

      {description && (
        <p className="mb-6 text-muted" style={{ lineHeight: 1.6 }}>
          {description}
        </p>
      )}

      {children && <div className="mt-auto">{children}</div>}
    </div>
  );
}
"use client";

export default function Button({ children, endIcon, variant = "primary", ...props }) {
  const base = "px-6 py-3 rounded-xl font-semibold transition-all duration-200";
  const variants = {
    primary: `${base} bg-[var(--color-primary)] text-[var(--color-primary-text)] hover:bg-[var(--color-primary-hover)]`,
    outline: `${base} border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-text)]`,
  };
  return (
    <button type="button" aria-label="Botón" className={variants[variant]} {...props}>
      {children}
      {endIcon && <span className="ml-2 inline-block cursor-pointer">{endIcon}</span>}
    </button>
  );
}
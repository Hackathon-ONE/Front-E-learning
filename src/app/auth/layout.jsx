export default function AuthLayout({ children }) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-card">
          {children}
        </div>
      </div>
    );
  }
  
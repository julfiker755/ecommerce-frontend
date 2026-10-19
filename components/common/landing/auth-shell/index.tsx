export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-white px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-input bg-white p-6 sm:p-6">
        {children}
      </div>
    </main>
  );
}

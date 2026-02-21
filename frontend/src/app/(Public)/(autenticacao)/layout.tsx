export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center px-4">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="relative z-10 text-center">
          <h1 className="font-orbitron text-2xl font-medium md:text-4xl">
            <strong className="text-primary">Neo</strong>Cine
          </h1>
          <p className="mt-2 text-white/60">Bem-vindo de volta</p>
        </div>
        <div className="from-details/50 to-bg-dark/50 relative z-10 overflow-hidden rounded-3xl border border-gray-600/30 bg-linear-to-br p-8 backdrop-blur-md">
          {children}
        </div>
      </div>
    </div>
  );
}

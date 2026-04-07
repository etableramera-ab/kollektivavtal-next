export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-48 bg-primary/20" />
      <div className="mx-auto max-w-3xl px-4 py-10 space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 bg-white border border-border rounded-xl" />
        ))}
      </div>
    </div>
  );
}

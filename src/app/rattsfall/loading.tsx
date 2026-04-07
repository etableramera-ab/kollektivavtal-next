export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-48 bg-primary/20" />
      <div className="mx-auto max-w-4xl px-4 py-10 space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-20 bg-white border border-border rounded-xl" />
        ))}
      </div>
    </div>
  );
}

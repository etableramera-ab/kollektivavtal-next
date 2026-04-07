export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-48 bg-primary/20" />
      <div className="mx-auto max-w-5xl px-4 py-10 space-y-4">
        <div className="h-10 bg-border rounded w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-36 bg-white border border-border rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

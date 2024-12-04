export function PricingTableWireframe() {
  return (
    <div className="py-24 px-6 space-y-16">
      <div className="space-y-4 text-center">
        <div className="h-8 bg-muted/30 w-64 mx-auto rounded-lg" />
        <div className="h-4 bg-muted/20 w-96 mx-auto rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-8 rounded-lg border space-y-6">
            <div className="h-6 bg-muted/30 w-1/2 rounded" />
            <div className="h-8 bg-muted/30 w-24 rounded" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-4 bg-muted/20 w-full rounded" />
              ))}
            </div>
            <div className="h-10 bg-primary/20 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
export function FeaturesGridWireframe() {
  return (
    <div className="py-24 px-6 space-y-16">
      <div className="space-y-4 text-center">
        <div className="h-8 bg-muted/30 w-64 mx-auto rounded-lg" />
        <div className="h-4 bg-muted/20 w-96 mx-auto rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="p-6 rounded-lg border space-y-4">
            <div className="h-10 w-10 bg-primary/20 rounded-full" />
            <div className="h-6 bg-muted/30 w-3/4 rounded" />
            <div className="h-4 bg-muted/20 w-full rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
export function TestimonialsWireframe() {
  return (
    <div className="py-24 px-6 space-y-16">
      <div className="space-y-4 text-center">
        <div className="h-8 bg-muted/30 w-64 mx-auto rounded-lg" />
        <div className="h-4 bg-muted/20 w-96 mx-auto rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-6 rounded-lg border space-y-6">
            <div className="space-y-2">
              <div className="h-4 bg-muted/20 w-full rounded" />
              <div className="h-4 bg-muted/20 w-5/6 rounded" />
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-muted/30 rounded-full" />
              <div className="space-y-2">
                <div className="h-4 bg-muted/30 w-32 rounded" />
                <div className="h-3 bg-muted/20 w-24 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
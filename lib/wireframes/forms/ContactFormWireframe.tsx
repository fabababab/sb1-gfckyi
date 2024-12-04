export function ContactFormWireframe() {
  return (
    <div className="py-24 px-6">
      <div className="max-w-xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <div className="h-8 bg-muted/30 w-48 mx-auto rounded-lg" />
          <div className="h-4 bg-muted/20 w-64 mx-auto rounded" />
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-20 bg-muted/30 rounded" />
                <div className="h-10 bg-muted/10 rounded-md border" />
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="h-4 w-16 bg-muted/30 rounded" />
            <div className="h-10 bg-muted/10 rounded-md border" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-20 bg-muted/30 rounded" />
            <div className="h-32 bg-muted/10 rounded-md border" />
          </div>
          <div className="h-10 bg-primary/20 rounded-md" />
        </div>
      </div>
    </div>
  );
}
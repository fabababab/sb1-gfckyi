export function FooterSimpleWireframe() {
  return (
    <div className="border-t py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-4 w-24 bg-muted/30 rounded" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="h-3 bg-muted/20 w-20 rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t">
          <div className="h-4 w-48 bg-muted/20 mx-auto rounded" />
        </div>
      </div>
    </div>
  );
}
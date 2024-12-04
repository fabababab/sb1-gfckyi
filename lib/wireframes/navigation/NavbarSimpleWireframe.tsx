export function NavbarSimpleWireframe() {
  return (
    <div className="border-b">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="h-8 w-24 bg-muted/30 rounded" />
        <div className="hidden md:flex items-center space-x-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 w-16 bg-muted/20 rounded" />
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <div className="h-9 w-20 bg-muted/20 rounded-md" />
          <div className="h-9 w-20 bg-primary/20 rounded-md" />
        </div>
      </div>
    </div>
  );
}
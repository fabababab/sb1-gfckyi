export function GridWireframe() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-32 bg-muted/10 rounded-lg border-2 border-dashed border-muted-foreground/20" />
      ))}
    </div>
  );
}
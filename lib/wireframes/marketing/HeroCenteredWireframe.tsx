export function HeroCenteredWireframe() {
  return (
    <div className="py-24 px-6 space-y-8">
      <div className="h-12 bg-muted/30 w-3/4 mx-auto rounded-lg" />
      <div className="h-4 bg-muted/20 w-1/2 mx-auto rounded" />
      <div className="flex justify-center gap-4">
        <div className="h-10 w-32 bg-primary/20 rounded-md" />
        <div className="h-10 w-32 bg-muted/20 rounded-md" />
      </div>
    </div>
  );
}
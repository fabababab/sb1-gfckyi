export function HeroSplitWireframe() {
  return (
    <div className="grid md:grid-cols-2 gap-8 py-24 px-6">
      <div className="space-y-6">
        <div className="h-12 bg-muted/30 w-3/4 rounded-lg" />
        <div className="h-4 bg-muted/20 w-full rounded" />
        <div className="flex gap-4">
          <div className="h-10 w-32 bg-primary/20 rounded-md" />
          <div className="h-10 w-32 bg-muted/20 rounded-md" />
        </div>
      </div>
      <div className="h-[400px] bg-muted/10 rounded-lg" />
    </div>
  );
}
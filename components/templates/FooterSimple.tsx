'use client';

export default function FooterSimple() {
  return (
    <footer className="border-t">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Features</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Pricing</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Updates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">About</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Blog</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Documentation</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Help Center</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Terms</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
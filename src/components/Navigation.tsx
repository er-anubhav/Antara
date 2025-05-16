
import { Home, BookOpen, BarChart, MessageCircle, Settings, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: BookOpen, label: "Journal", path: "/journal" },
  { icon: BarChart, label: "Progress", path: "/progress" },
  { icon: MessageCircle, label: "Support", path: "/support" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Navigation() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <button
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-primary text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
        aria-label={isMobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {isMobileNavOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      <nav 
        className={cn(
          "fixed bottom-0 inset-x-0 lg:hidden bg-background border-t border-border z-30 transition-transform duration-300",
          isMobileNavOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex justify-around py-6 px-4">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              to={item.path}
              className={cn(
                "flex flex-col items-center space-y-1",
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setIsMobileNavOpen(false)}
            >
              <item.icon size={20} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block min-w-[220px] h-[calc(100vh-73px)] border-r border-border/50 p-4">
        <div className="space-y-2 pt-4">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              to={item.path} 
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                location.pathname === item.path
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}

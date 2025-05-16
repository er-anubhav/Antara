
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <div className="text-7xl mb-6">🍃</div>
            <h1 className="text-3xl font-semibold mb-2">Page not found</h1>
            <p className="text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved. Don't worry, let's get you back on track.
            </p>
            <Button className="bg-lavender hover:bg-lavender/90 text-white gap-2" size="lg" asChild>
              <a href="/">
                <Home size={18} />
                <span>Back to Home</span>
              </a>
            </Button>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default NotFound;

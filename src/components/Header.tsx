
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const { toast } = useToast();

  const handleSafetyExit = () => {
    toast({
      title: "Exiting to safe content",
      description: "You're being redirected to a neutral page. Take a deep breath.",
    });
    
    setTimeout(() => {
      window.location.href = "https://www.google.com";
    }, 2000);
  };

  return (
    <header className="w-full py-4 px-6 flex justify-between items-center border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-10">
      <div className="flex items-center space-x-2">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-lavender to-teal flex items-center justify-center">
          <span className="text-white font-semibold text-lg">A</span>
        </div>
        <h1 className="text-lg sm:text-xl font-medium">Antara</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <button 
          onClick={handleSafetyExit}
          className="bg-destructive/10 text-destructive hover:bg-destructive/20 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
          aria-label="Emergency exit from content"
        >
          Quick Exit
        </button>
      </div>
    </header>
  );
}

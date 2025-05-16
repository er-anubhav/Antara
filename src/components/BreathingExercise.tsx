
import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("inhale");
  const [timer, setTimer] = useState(0);
  const [cycles, setCycles] = useState(0);
  
  // Configuration
  const timings = {
    inhale: 4, // seconds
    hold: 7,
    exhale: 8,
    rest: 0
  };
  
  // Reset exercise
  const resetExercise = useCallback(() => {
    setIsActive(false);
    setPhase("inhale");
    setTimer(0);
    setCycles(0);
  }, []);
  
  // Handle breathing cycle logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          const newTimer = prevTimer + 1;
          
          // Handle phase transitions
          if (phase === "inhale" && newTimer >= timings.inhale) {
            setPhase("hold");
            return 0;
          }
          else if (phase === "hold" && newTimer >= timings.hold) {
            setPhase("exhale");
            return 0;
          }
          else if (phase === "exhale" && newTimer >= timings.exhale) {
            if (cycles >= 2) { // Complete after 3 cycles (0, 1, 2)
              setIsActive(false);
              return 0;
            }
            setPhase("rest");
            return 0;
          }
          else if (phase === "rest" && newTimer >= timings.rest) {
            setPhase("inhale");
            setCycles(prevCycles => prevCycles + 1);
            return 0;
          }
          
          return newTimer;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, phase, cycles, timings]);
  
  // Instructions based on current phase
  const instructions = {
    inhale: "Breathe in slowly through your nose",
    hold: "Hold your breath",
    exhale: "Exhale slowly through your mouth",
    rest: "Get ready for the next cycle"
  };
  
  // Calculate progress percentage for animation
  const getProgress = () => {
    const total = timings[phase];
    return total > 0 ? (timer / total) * 100 : 100;
  };
  
  return (
    <div className="card-wellness">
      <h2 className="text-xl font-medium mb-2">4-7-8 Breathing Exercise</h2>
      <p className="text-sm text-muted-foreground mb-6">
        A calming breathing technique that can help with anxiety, stress, and sleep.
      </p>
      
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48 mb-6">
          {/* Breathing circle animation */}
          <div 
            className={cn(
              "absolute inset-0 rounded-full border-4 flex items-center justify-center transition-all duration-1000",
              phase === "inhale" ? "border-teal scale-100 bg-teal/10" :
              phase === "hold" ? "border-lavender scale-110 bg-lavender/10" :
              phase === "exhale" ? "border-peach scale-95 bg-peach/10" :
              "border-muted scale-100 bg-background"
            )}
          >
            <span className="text-lg font-medium">
              {isActive ? instructions[phase] : "Press start to begin"}
            </span>
          </div>
          
          {/* Progress indicator */}
          {isActive && (
            <svg 
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="289.1"
                strokeDashoffset={289.1 * (1 - getProgress() / 100)}
                className={cn(
                  "transition-all",
                  phase === "inhale" ? "text-teal" :
                  phase === "hold" ? "text-lavender" :
                  phase === "exhale" ? "text-peach" : "text-muted"
                )}
              />
            </svg>
          )}
        </div>
        
        <div className="flex gap-3">
          <Button
            onClick={() => setIsActive(!isActive)}
            className={cn(
              "rounded-full",
              isActive ? "bg-peach hover:bg-peach/90" : "bg-teal hover:bg-teal/90"
            )}
          >
            {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
            {isActive ? "Pause" : "Start"}
          </Button>
          
          <Button
            onClick={resetExercise}
            variant="outline"
            className="rounded-full"
            disabled={!isActive && timer === 0}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
        
        {cycles > 0 && (
          <p className="mt-4 text-sm text-muted-foreground">
            {cycles < 3 ? `Cycle ${cycles} of 3` : "Exercise completed!"}
          </p>
        )}
      </div>
    </div>
  );
}


import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

// Sample meditation data
const meditations = [
  {
    id: 1,
    title: "5-Minute Mindful Breathing",
    duration: 300, // 5 minutes in seconds
    description: "A quick mindfulness practice focusing on the breath",
    category: "quick"
  },
  {
    id: 2,
    title: "Body Scan Relaxation",
    duration: 600, // 10 minutes in seconds
    description: "Progressively relax your body from head to toe",
    category: "relaxation"
  },
  {
    id: 3,
    title: "Loving-Kindness Meditation",
    duration: 480, // 8 minutes in seconds
    description: "Cultivate compassion for yourself and others",
    category: "compassion"
  }
];

export function MeditationPlayer() {
  const [currentMeditation, setCurrentMeditation] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  
  // In a real app, this would be an actual audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Format time from seconds to MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Handle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Handle track change
  const changeTrack = (direction: 'prev' | 'next') => {
    setCurrentTime(0);
    if (direction === 'prev') {
      setCurrentMeditation(
        currentMeditation === 0 
          ? meditations.length - 1 
          : currentMeditation - 1
      );
    } else {
      setCurrentMeditation(
        currentMeditation === meditations.length - 1 
          ? 0 
          : currentMeditation + 1
      );
    }
  };
  
  // Handle mute toggle
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  // Simulate playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= meditations[currentMeditation].duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentMeditation]);
  
  // Reset time when changing meditation
  useEffect(() => {
    setCurrentTime(0);
    setIsPlaying(false);
  }, [currentMeditation]);
  
  return (
    <div className="card-wellness">
      <h2 className="text-xl font-medium mb-2">Guided Meditation</h2>
      
      <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-lavender/20 via-teal/10 to-background">
        <h3 className="font-medium mb-1">{meditations[currentMeditation].title}</h3>
        <p className="text-sm text-muted-foreground mb-3">
          {meditations[currentMeditation].description}
        </p>
        
        {/* Progress bar */}
        <div className="w-full h-1 bg-muted rounded-full mb-2 overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ 
              width: `${(currentTime / meditations[currentMeditation].duration) * 100}%` 
            }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(meditations[currentMeditation].duration)}</span>
        </div>
      </div>
      
      {/* Playback controls */}
      <div className="flex justify-center items-center gap-4 mb-6">
        <Button
          onClick={() => changeTrack('prev')}
          variant="ghost"
          size="sm"
          className="h-10 w-10 rounded-full p-0"
        >
          <SkipBack className="h-5 w-5" />
          <span className="sr-only">Previous meditation</span>
        </Button>
        
        <Button
          onClick={togglePlay}
          className={cn(
            "h-14 w-14 rounded-full p-0 flex items-center justify-center",
            "bg-primary hover:bg-primary/90"
          )}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6 ml-1" />
          )}
          <span className="sr-only">
            {isPlaying ? "Pause" : "Play"} meditation
          </span>
        </Button>
        
        <Button
          onClick={() => changeTrack('next')}
          variant="ghost"
          size="sm"
          className="h-10 w-10 rounded-full p-0"
        >
          <SkipForward className="h-5 w-5" />
          <span className="sr-only">Next meditation</span>
        </Button>
      </div>
      
      {/* Volume control */}
      <div className="flex items-center gap-3">
        <Button
          onClick={toggleMute}
          variant="ghost"
          size="sm"
          className="h-8 w-8 rounded-full p-0"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
          <span className="sr-only">
            {isMuted ? "Unmute" : "Mute"}
          </span>
        </Button>
        
        <Slider
          value={[isMuted ? 0 : volume * 100]}
          min={0}
          max={100}
          step={1}
          onValueChange={(vals) => {
            const newVolume = vals[0] / 100;
            setVolume(newVolume);
            setIsMuted(newVolume === 0);
          }}
          className="w-24"
        />
      </div>
    </div>
  );
}

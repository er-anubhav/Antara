
import { useState } from "react";
import { Mic, Send, PauseCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const moodOptions = [
  { emoji: "😞", label: "Sad" },
  { emoji: "😟", label: "Worried" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😊", label: "Happy" },
  { emoji: "😃", label: "Excited" },
];

export function JournalEditor() {
  const [journalText, setJournalText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  
  const handleMoodSelection = (index: number) => {
    setSelectedMood(index);
  };
  
  const toggleRecording = () => {
    // In a real app, this would trigger voice recording
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast("Recording started. Speak your thoughts...");
    } else {
      toast("Recording stopped. Processing your entry...");
      // Simulate processing delay
      setTimeout(() => {
        setJournalText(prev => 
          prev + " I'm feeling a bit stressed about upcoming exams but trying to stay positive."
        );
      }, 1500);
    }
  };
  
  const saveJournal = () => {
    if (!journalText.trim()) {
      toast.error("Please write or record something first");
      return;
    }
    
    if (selectedMood === null) {
      toast.error("Please select how you're feeling");
      return;
    }
    
    // In a real app, this would save to a database
    toast.success("Journal entry saved!");
    
    // Get affirmation based on mood
    const affirmations = [
      "It's okay to feel sad. Be gentle with yourself today.",
      "Your worries are valid. Take one step at a time.",
      "You're doing just fine. Every day is a new opportunity.",
      "Your positive energy matters. Keep that smile going!",
      "Your excitement is contagious! Embrace this wonderful energy."
    ];
    
    setTimeout(() => {
      toast(affirmations[selectedMood]);
      
      // Reset the form
      setJournalText("");
      setSelectedMood(null);
    }, 1000);
  };
  
  return (
    <div className="card-wellness">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">How are you feeling today?</h3>
        <div className="flex justify-center gap-4 flex-wrap">
          {moodOptions.map((mood, index) => (
            <button
              key={mood.label}
              onClick={() => handleMoodSelection(index)}
              className={cn(
                "text-center p-3 rounded-xl transition-all",
                selectedMood === index 
                  ? "ring-2 ring-primary scale-105 bg-primary/10" 
                  : "hover:bg-muted"
              )}
              aria-label={`Select mood: ${mood.label}`}
            >
              <span className="block text-3xl mb-1">{mood.emoji}</span>
              <span className="text-sm">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <textarea
          value={journalText}
          onChange={(e) => setJournalText(e.target.value)}
          placeholder="Write your thoughts here... or use voice recording below"
          className="w-full h-64 rounded-xl border border-border p-4 text-lg bg-card"
          aria-label="Journal entry"
        ></textarea>
      </div>
      
      <div className="flex justify-between">
        <Button
          onClick={toggleRecording}
          variant="outline" 
          className={cn(
            "flex items-center gap-2 rounded-full",
            isRecording && "bg-red-100 text-red-500 dark:bg-red-900/30"
          )}
          aria-label={isRecording ? "Stop recording" : "Start voice recording"}
        >
          {isRecording ? (
            <>
              <PauseCircle className="animate-pulse" />
              <span>Stop Recording</span>
            </>
          ) : (
            <>
              <Mic />
              <span>Voice Record</span>
            </>
          )}
        </Button>
        
        <Button 
          onClick={saveJournal}
          className="rounded-full bg-lavender hover:bg-lavender/90"
          aria-label="Save journal entry"
        >
          <Send className="mr-2 h-4 w-4" />
          <span>Save Entry</span>
        </Button>
      </div>
    </div>
  );
}

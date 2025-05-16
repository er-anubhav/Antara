
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const moods = [
  { emoji: "😞", label: "Sad", color: "bg-blue-100 dark:bg-blue-900/30" },
  { emoji: "😟", label: "Worried", color: "bg-purple-100 dark:bg-purple-900/30" },
  { emoji: "😐", label: "Neutral", color: "bg-gray-100 dark:bg-gray-800/30" },
  { emoji: "😊", label: "Happy", color: "bg-green-100 dark:bg-green-900/30" },
  { emoji: "😃", label: "Excited", color: "bg-yellow-100 dark:bg-yellow-900/30" },
];

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  const handleMoodSelection = (index: number) => {
    setSelectedMood(index);
    toast.success(`Mood tracked: ${moods[index].label}`);
  };

  return (
    <div className="card-wellness">
      <h2 className="text-xl font-medium mb-4">How are you feeling today?</h2>
      <div className="flex justify-between flex-wrap gap-2">
        {moods.map((mood, index) => (
          <button
            key={mood.label}
            onClick={() => handleMoodSelection(index)}
            className={cn(
              "rounded-xl px-4 py-3 transition-all duration-300 flex flex-col items-center",
              mood.color,
              selectedMood === index ? "ring-2 ring-primary scale-105" : "hover:scale-105"
            )}
            aria-label={`Select mood: ${mood.label}`}
          >
            <span className="text-3xl mb-1">{mood.emoji}</span>
            <span className="text-sm font-medium">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}


import { cn } from "@/lib/utils";

type PlantProps = {
  stage: number; // 0: seed, 1: sprout, 2: growing, 3: bloomed
  type: string;
  date: string;
};

const plants: PlantProps[] = [
  { stage: 3, type: "meditation", date: "May 10" },
  { stage: 3, type: "journaling", date: "May 12" },
  { stage: 2, type: "mood", date: "May 13" },
  { stage: 3, type: "journaling", date: "May 14" },
  { stage: 1, type: "meditation", date: "May 15" },
  { stage: 0, type: "journaling", date: "May 16" },
];

const PlantEmoji = ({ stage, type }: { stage: number; type: string }) => {
  // Different plant types have different emoji sets
  const plantTypes: Record<string, string[]> = {
    journaling: ["🌱", "🌿", "🪴", "🌸"],
    meditation: ["🌱", "🌿", "🌳", "🌲"],
    mood: ["🌱", "🌿", "🌵", "🌵"],
  };

  const emoji = plantTypes[type]?.[stage] || "🌱";
  
  return <span className={cn("text-2xl sm:text-3xl", stage > 0 && "animate-float")}>{emoji}</span>;
};

export function ProgressGarden() {
  return (
    <div className="card-wellness">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">Your Wellness Garden</h2>
        <span className="bg-teal/20 text-teal-dark px-2 py-0.5 rounded text-sm font-medium">
          5 Day Streak
        </span>
      </div>
      
      <div className="bg-teal/10 p-4 rounded-xl mb-4">
        <div className="flex flex-wrap gap-6 justify-center">
          {plants.map((plant, index) => (
            <div key={index} className="flex flex-col items-center">
              <PlantEmoji stage={plant.stage} type={plant.type} />
              <span className="text-xs mt-1 text-muted-foreground">{plant.date}</span>
            </div>
          ))}
        </div>
      </div>
      
      <p className="text-sm text-center text-muted-foreground">
        Keep engaging with activities to grow your wellness garden!
      </p>
    </div>
  );
}

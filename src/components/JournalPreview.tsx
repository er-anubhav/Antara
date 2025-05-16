
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function JournalPreview() {
  return (
    <div className="card-wellness">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-medium">Journal</h2>
        <Link to="/journal">
          <Button variant="ghost" size="sm" className="text-primary">
            View all
          </Button>
        </Link>
      </div>
      
      <div className="space-y-4">
        <div className="border border-border/50 rounded-xl p-4 hover:border-primary/30 transition-colors cursor-pointer">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-muted-foreground">Today</p>
            <div className="text-lg">😊</div>
          </div>
          <p className="text-sm line-clamp-2">Today was productive. I finished my assignment ahead of schedule and had time to go for a walk...</p>
        </div>
        
        <div className="border border-border/50 rounded-xl p-4 hover:border-primary/30 transition-colors cursor-pointer">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-muted-foreground">Yesterday</p>
            <div className="text-lg">😐</div>
          </div>
          <p className="text-sm line-clamp-2">Feeling a bit overwhelmed with the upcoming exams. I need to create a better study plan...</p>
        </div>
        
        <Link to="/journal">
          <Button className="w-full flex items-center gap-2 bg-lavender hover:bg-lavender/90 text-white rounded-lg">
            <BookOpen size={16} />
            <span>Write new entry</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

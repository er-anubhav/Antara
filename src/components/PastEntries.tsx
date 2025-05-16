
import { useState } from "react";
import { Calendar, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Example entry data - in a real app, this would come from a database
const entries = [
  {
    id: 1,
    date: "May 16, 2025",
    mood: "😊",
    content: "Today was a good day! I finished my assignment ahead of schedule and had time to go for a walk in the park. The weather was perfect, and I feel accomplished.",
    tags: ["productive", "happy"]
  },
  {
    id: 2,
    date: "May 15, 2025",
    mood: "😐",
    content: "Just a normal day. Classes went fine, but I'm feeling a bit stressed about the upcoming exams. Need to create a better study plan and maybe reach out to classmates to form a study group.",
    tags: ["neutral", "planning"]
  },
  {
    id: 3,
    date: "May 14, 2025",
    mood: "😞",
    content: "Had a rough day today. Failed my math quiz despite studying late. Feeling discouraged, but I know I need to change my approach and maybe seek help from the professor.",
    tags: ["sad", "academic"]
  },
  {
    id: 4,
    date: "May 12, 2025",
    mood: "😃",
    content: "Amazing news! Got accepted for the summer internship I really wanted! Can't believe I'll be working at my dream company in just a few weeks. All the hard work paid off!",
    tags: ["excited", "career"]
  }
];

export function PastEntries() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null);
  
  // Filter entries based on search term
  const filteredEntries = entries.filter(entry => 
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) || 
    entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search entries by content or tags..."
          className="pl-10 rounded-xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="grid gap-4">
        {filteredEntries.length > 0 ? (
          filteredEntries.map(entry => (
            <div 
              key={entry.id} 
              className={cn(
                "border border-border rounded-xl p-4 transition-all cursor-pointer",
                selectedEntry === entry.id ? "ring-2 ring-primary" : "hover:border-primary/30"
              )}
              onClick={() => setSelectedEntry(entry.id === selectedEntry ? null : entry.id)}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar size={16} />
                  <span className="text-sm">{entry.date}</span>
                </div>
                <div className="text-2xl">{entry.mood}</div>
              </div>
              
              <p className={cn(
                "text-foreground transition-all",
                selectedEntry === entry.id ? "" : "line-clamp-2" 
              )}>
                {entry.content}
              </p>
              
              {selectedEntry === entry.id && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {entry.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No journal entries found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

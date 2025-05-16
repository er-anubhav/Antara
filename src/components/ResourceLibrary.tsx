
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Search, BookOpen, FileText, Video, Headphones, BookMarked } from "lucide-react";

type ResourceType = "articles" | "videos" | "exercises" | "podcasts" | "books";
type Resource = {
  id: number;
  title: string;
  description: string;
  category: string[];
  type: ResourceType;
  link: string;
};

const resources: Resource[] = [
  {
    id: 1,
    title: "Understanding Anxiety: A Comprehensive Guide",
    description: "Learn about the different types of anxiety and evidence-based coping strategies.",
    category: ["anxiety", "coping strategies", "mental health"],
    type: "articles",
    link: "#"
  },
  {
    id: 2,
    title: "Mindful Breathing Exercise",
    description: "A 5-minute guided breathing exercise to reduce stress and increase focus.",
    category: ["mindfulness", "stress", "exercises"],
    type: "exercises",
    link: "#"
  },
  {
    id: 3,
    title: "Sleep Hygiene for College Students",
    description: "Tips and practices to improve your sleep quality during busy academic periods.",
    category: ["sleep", "self-care", "student life"],
    type: "articles",
    link: "#"
  },
  {
    id: 4,
    title: "Managing Academic Pressure",
    description: "Strategies for balancing academic demands with personal well-being.",
    category: ["stress", "academic", "balance", "student life"],
    type: "videos",
    link: "#"
  },
  {
    id: 5,
    title: "Progressive Muscle Relaxation",
    description: "A guided exercise to release physical tension and promote relaxation.",
    category: ["relaxation", "stress", "physical health"],
    type: "exercises",
    link: "#"
  },
  {
    id: 6,
    title: "The Science of Emotions Podcast",
    description: "An insightful discussion about how emotions work and how to manage them effectively.",
    category: ["emotions", "science", "mental health"],
    type: "podcasts",
    link: "#"
  },
  {
    id: 7,
    title: "Digital Detox Guide",
    description: "How to create healthy boundaries with technology for better mental health.",
    category: ["technology", "boundaries", "self-care"],
    type: "articles",
    link: "#"
  },
  {
    id: 8,
    title: "The Mindful Student",
    description: "A book about incorporating mindfulness practices into student life.",
    category: ["mindfulness", "student life", "self-care"],
    type: "books",
    link: "#"
  }
];

const typeIcons = {
  articles: FileText,
  videos: Video,
  exercises: BookOpen,
  podcasts: Headphones,
  books: BookMarked
};

export function ResourceLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<ResourceType | "all">("all");
  
  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.category.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesType = activeTab === "all" || resource.type === activeTab;
    
    return matchesSearch && matchesType;
  });
  
  const getResourceIcon = (type: ResourceType) => {
    const IconComponent = typeIcons[type];
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <h2 className="text-2xl font-semibold">Self-Help Resources</h2>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search resources..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value as ResourceType | "all")}>
        <TabsList className="w-full flex justify-start overflow-x-auto pb-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
          <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
          <TabsTrigger value="books">Books</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>
        
        {["articles", "videos", "exercises", "podcasts", "books"].map((type) => (
          <TabsContent key={type} value={type} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No resources found matching your search criteria.</p>
          <Button 
            variant="outline" 
            onClick={() => {setSearchQuery(""); setActiveTab("all");}}
            className="mt-4"
          >
            Clear search
          </Button>
        </div>
      )}
    </div>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  const IconComponent = typeIcons[resource.type];
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-full bg-primary/10 text-primary`}>
            <IconComponent className="h-4 w-4" />
          </div>
          <span className="text-xs text-muted-foreground capitalize">{resource.type}</span>
        </div>
        <CardTitle className="text-lg mt-2">{resource.title}</CardTitle>
        <CardDescription>{resource.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2">
          {resource.category.map((cat, idx) => (
            <span key={idx} className="inline-block bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs">
              {cat}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View Resource</Button>
      </CardFooter>
    </Card>
  );
}

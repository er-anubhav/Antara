
import { MessageCircle, Users, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SupportOptionsProps {
  onStartChat: () => void;
}

export function SupportOptions({ onStartChat }: SupportOptionsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Need someone to talk to?</CardTitle>
          <CardDescription>
            There are several ways to get support. All conversations are anonymous and confidential.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-wellness bg-teal/10 hover:bg-teal/20 transition-colors cursor-pointer" onClick={onStartChat}>
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-14 w-14 rounded-full bg-teal/20 flex items-center justify-center mb-4">
                  <MessageCircle className="h-7 w-7 text-teal-dark" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Talk with a Peer Supporter</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with trained student volunteers who understand what you're going through
                </p>
                <Button 
                  className="rounded-full bg-teal hover:bg-teal-dark"
                  onClick={onStartChat}
                >
                  Start Conversation
                </Button>
              </div>
            </div>
            
            <div className="card-wellness bg-lavender/10 hover:bg-lavender/20 transition-colors">
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-14 w-14 rounded-full bg-lavender/20 flex items-center justify-center mb-4">
                  <Users className="h-7 w-7 text-lavender-dark" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Join a Support Group</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Weekly virtual groups focused on specific topics like anxiety, stress, and academic pressure
                </p>
                <Button 
                  className="rounded-full bg-lavender hover:bg-lavender-dark" 
                  variant="outline"
                >
                  View Schedule
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
            <div className="flex items-center gap-3">
              <span className="text-lg">🚨</span>
              <div>
                <h4 className="font-medium text-destructive">In case of emergency</h4>
                <p className="text-sm">
                  If you're in crisis or having thoughts of self-harm, please call the National Crisis Helpline: 
                  <a href="tel:988" className="font-medium ml-1 text-destructive underline">988</a>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="card-wellness">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-accent/30 flex items-center justify-center shrink-0">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium mb-2">Self-Help Resources</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Access our library of articles, guided exercises, and videos to support your mental wellness journey.
            </p>
            <Button variant="outline" className="text-sm">Browse Resources</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

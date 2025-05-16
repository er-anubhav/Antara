
import { useState, useRef, useEffect } from "react";
import { Send, Info, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

type Message = {
  id: number;
  sender: "user" | "peer" | "system";
  text: string;
};

// Example data - in a real app, this would come from an actual chat service
const initialMessages: Message[] = [
  {
    id: 1,
    sender: "system",
    text: "You're now connected with a peer supporter. This conversation is anonymous and confidential."
  },
  {
    id: 2,
    sender: "peer",
    text: "Hi there! I'm a peer supporter. How can I help you today?"
  }
];

export function SupportChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: inputMessage
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage("");
    
    // Simulate peer typing
    setIsTyping(true);
    
    // Simulate peer response after a delay
    setTimeout(() => {
      const responses = [
        "Thank you for sharing that with me. How long have you been feeling this way?",
        "I understand how challenging that can be. Have you tried talking to anyone else about this?",
        "It's completely normal to feel that way. Would you like to explore some coping strategies together?",
        "I appreciate your openness. What do you think would help you feel better right now?",
        "That sounds really difficult. You're showing a lot of courage by reaching out."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const peerResponse: Message = {
        id: messages.length + 2,
        sender: "peer",
        text: randomResponse
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, peerResponse]);
    }, 2000);
  };
  
  return (
    <div className="card-wellness flex flex-col h-[70vh]">
      <Alert className="mb-4 bg-muted/50">
        <Info className="h-4 w-4" />
        <AlertDescription className="text-xs">
          Remember, peer supporters are students trained to listen and provide support, 
          not licensed counselors. All conversations are anonymous.
        </AlertDescription>
      </Alert>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
        {messages.map(message => (
          <div 
            key={message.id}
            className={cn(
              "max-w-[85%] rounded-xl p-3",
              message.sender === "user" ? "ml-auto bg-primary/20" : 
              message.sender === "peer" ? "bg-muted" : "bg-muted/50 text-xs text-center mx-auto w-full"
            )}
          >
            {message.sender === "peer" && (
              <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                <User size={14} />
                <span className="text-xs">Peer Supporter</span>
              </div>
            )}
            <p className={message.sender === "system" ? "italic text-muted-foreground" : ""}>
              {message.text}
            </p>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <User size={14} />
            <div className="flex gap-1 items-center">
              <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse"></div>
              <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-100"></div>
              <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="flex gap-2">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <Button 
          onClick={handleSendMessage} 
          disabled={inputMessage.trim() === ""}
          className="rounded-full"
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  );
}

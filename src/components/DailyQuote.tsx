
import { useEffect, useState } from "react";

const quotes = [
  {
    text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
    author: "Unknown"
  },
  {
    text: "You don't have to control your thoughts. You just have to stop letting them control you.",
    author: "Dan Millman"
  },
  {
    text: "There is hope, even when your brain tells you there isn't.",
    author: "John Green"
  },
  {
    text: "Self-care is how you take your power back.",
    author: "Lalah Delia"
  },
  {
    text: "It's not selfish to do what's best for you.",
    author: "Unknown"
  },
  {
    text: "You are not your illness. You have an individual story to tell. You have a name, a history, a personality. Staying yourself is part of the battle.",
    author: "Julian Seifter"
  },
  {
    text: "Your present circumstances don't determine where you can go; they merely determine where you start.",
    author: "Nido Qubein"
  }
];

export function DailyQuote() {
  const [quote, setQuote] = useState<typeof quotes[0]>(quotes[0]);

  useEffect(() => {
    // Get a consistent quote for the day based on the date
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const quoteIndex = dayOfYear % quotes.length;
    setQuote(quotes[quoteIndex]);
  }, []);

  return (
    <div className="card-wellness bg-gradient-to-br from-lavender/20 to-teal/10">
      <div className="flex flex-col space-y-2">
        <div className="text-2xl mb-1">✨</div>
        <p className="text-lg italic">{quote.text}</p>
        <p className="text-sm text-muted-foreground text-right">— {quote.author}</p>
      </div>
    </div>
  );
}

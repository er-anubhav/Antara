
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import { JournalEditor } from "@/components/JournalEditor";
import { PastEntries } from "@/components/PastEntries";
import { useState } from "react";

const Journal = () => {
  const [activeView, setActiveView] = useState<"new" | "past">("new");

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex flex-1">
          <Navigation />
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-semibold">Journal</h1>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setActiveView("new")}
                    className={`px-4 py-2 rounded-full ${
                      activeView === "new" 
                        ? "bg-lavender text-white" 
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    New Entry
                  </button>
                  <button 
                    onClick={() => setActiveView("past")}
                    className={`px-4 py-2 rounded-full ${
                      activeView === "past" 
                        ? "bg-lavender text-white" 
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    Past Entries
                  </button>
                </div>
              </div>
              
              {activeView === "new" ? <JournalEditor /> : <PastEntries />}
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Journal;

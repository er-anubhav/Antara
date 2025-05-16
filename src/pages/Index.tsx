
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MoodTracker } from "@/components/MoodTracker";
import { DailyQuote } from "@/components/DailyQuote";
import { JournalPreview } from "@/components/JournalPreview";
import { ProgressGarden } from "@/components/ProgressGarden";

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex flex-1">
          <Navigation />
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Welcome back!</h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <MoodTracker />
                <DailyQuote />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <JournalPreview />
                <ProgressGarden />
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;

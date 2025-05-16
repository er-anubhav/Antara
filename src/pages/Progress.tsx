
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ProgressChart } from "@/components/ProgressChart";
import { MoodCalendar } from "@/components/MoodCalendar";
import { BreathingExercise } from "@/components/BreathingExercise";
import { MeditationPlayer } from "@/components/MeditationPlayer";

const Progress = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex flex-1">
          <Navigation />
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Your Progress</h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <ProgressChart />
                <MoodCalendar />
              </div>
              
              <h2 className="text-xl font-semibold mt-8 mb-6">Wellness Tools</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BreathingExercise />
                <MeditationPlayer />
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Progress;

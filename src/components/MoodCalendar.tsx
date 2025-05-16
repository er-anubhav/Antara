
import { useState } from "react";
import { cn } from "@/lib/utils";

// Example mood data for the month
const moodData = {
  "2025-05-01": "😞",
  "2025-05-02": "😟",
  "2025-05-03": "😐",
  "2025-05-04": "😊",
  "2025-05-08": "😞",
  "2025-05-09": "😐",
  "2025-05-10": "😊",
  "2025-05-11": "😊",
  "2025-05-12": "😃",
  "2025-05-13": "😃",
  "2025-05-14": "😞",
  "2025-05-15": "😟",
  "2025-05-16": "😐",
};

// Map emojis to background colors for visual representation
const moodColors: Record<string, string> = {
  "😞": "bg-blue-100 dark:bg-blue-900/30",
  "😟": "bg-purple-100 dark:bg-purple-900/30",
  "😐": "bg-gray-100 dark:bg-gray-800/30",
  "😊": "bg-green-100 dark:bg-green-900/30",
  "😃": "bg-yellow-100 dark:bg-yellow-900/30",
};

// Generate calendar days for May 2025
const generateCalendarDays = () => {
  const days = [];
  const daysInMay = 31;
  
  // May 1, 2025 is a Thursday (day 4 where Sunday is 0)
  const firstDayOfMonth = 4;
  
  // Add empty cells for days before the 1st
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push({ date: null, dayNumber: null });
  }
  
  // Add cells for days in the month
  for (let i = 1; i <= daysInMay; i++) {
    const dateStr = `2025-05-${i.toString().padStart(2, '0')}`;
    days.push({
      date: dateStr,
      dayNumber: i,
      mood: moodData[dateStr] || null
    });
  }
  
  return days;
};

export function MoodCalendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const calendarDays = generateCalendarDays();
  
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <div className="card-wellness">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">Mood Calendar</h2>
        <span className="text-lg">May 2025</span>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekdays.map(day => (
          <div 
            key={day} 
            className="text-center text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <div 
            key={`day-${index}`}
            onClick={() => day.date && setSelectedDate(
              day.date === selectedDate ? null : day.date
            )}
            className={cn(
              "aspect-square flex flex-col items-center justify-center rounded-xl text-center",
              day.date ? "cursor-pointer hover:bg-muted/50" : "",
              day.mood && moodColors[day.mood],
              day.date === selectedDate && "ring-2 ring-primary",
            )}
          >
            {day.dayNumber && (
              <>
                <span className="text-xs font-medium">{day.dayNumber}</span>
                {day.mood && <span className="text-lg mt-1">{day.mood}</span>}
              </>
            )}
          </div>
        ))}
      </div>
      
      {selectedDate && moodData[selectedDate] && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{selectedDate}</span>
            <span className="text-2xl">{moodData[selectedDate]}</span>
          </div>
          <p className="text-sm mt-2">
            {moodData[selectedDate] === "😞" && "Had a difficult day. Feeling down and unmotivated."}
            {moodData[selectedDate] === "😟" && "Felt worried about upcoming assignments and deadlines."}
            {moodData[selectedDate] === "😐" && "Just an ordinary day, nothing special."}
            {moodData[selectedDate] === "😊" && "Had a good day! Made progress on my projects."}
            {moodData[selectedDate] === "😃" && "Excellent day! Received good news and spent time with friends."}
          </p>
        </div>
      )}
    </div>
  );
}

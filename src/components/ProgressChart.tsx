
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from "@/lib/utils";

// Sample data - in a real app, this would come from a database
const data = [
  { day: "Mon", mood: 2, anxiety: 8, sleep: 6 },
  { day: "Tue", mood: 3, anxiety: 7, sleep: 6 },
  { day: "Wed", mood: 5, anxiety: 5, sleep: 7 },
  { day: "Thu", mood: 6, anxiety: 4, sleep: 8 },
  { day: "Fri", mood: 4, anxiety: 6, sleep: 7 },
  { day: "Sat", mood: 8, anxiety: 3, sleep: 9 },
  { day: "Sun", mood: 7, anxiety: 4, sleep: 8 }
];

interface MetricButtonProps {
  label: string;
  value: string;
  color: string;
  active: boolean;
  onClick: () => void;
}

const MetricButton = ({ label, value, color, active, onClick }: MetricButtonProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex flex-col items-center p-3 rounded-xl transition-all",
      active ? `ring-2 ring-${color} bg-${color}/10` : "hover:bg-muted"
    )}
  >
    <span className="text-lg font-medium">{value}</span>
    <span className="text-xs text-muted-foreground">{label}</span>
  </button>
);

export function ProgressChart() {
  return (
    <div className="card-wellness">
      <h2 className="text-xl font-medium mb-4">Weekly Insights</h2>
      
      <div className="flex justify-between gap-2 mb-6">
        <MetricButton 
          label="Avg Mood" 
          value="6.4" 
          color="lavender" 
          active={true} 
          onClick={() => {}} 
        />
        <MetricButton 
          label="Sleep (hrs)" 
          value="7.3" 
          color="teal" 
          active={false} 
          onClick={() => {}} 
        />
        <MetricButton 
          label="Activity Days" 
          value="5" 
          color="peach" 
          active={false} 
          onClick={() => {}} 
        />
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B8A9DF" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#B8A9DF" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAnxiety" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#97D2D2" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#97D2D2" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFCBA4" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#FFCBA4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid rgba(0,0,0,0.1)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="mood" 
              stroke="#9A88D2" 
              fillOpacity={1}
              fill="url(#colorMood)" 
            />
            <Area 
              type="monotone" 
              dataKey="anxiety" 
              stroke="#78C1C1" 
              fillOpacity={1}
              fill="url(#colorAnxiety)" 
              activeDot={{ r: 8 }} 
            />
            <Area 
              type="monotone" 
              dataKey="sleep" 
              stroke="#FFB98B" 
              fillOpacity={1}
              fill="url(#colorSleep)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 bg-lavender rounded-full"></span>
          <span className="text-xs text-muted-foreground">Mood</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 bg-teal rounded-full"></span>
          <span className="text-xs text-muted-foreground">Anxiety</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 bg-peach rounded-full"></span>
          <span className="text-xs text-muted-foreground">Sleep</span>
        </div>
      </div>
    </div>
  );
}

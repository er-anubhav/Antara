
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Bell,
  Globe,
  VolumeX,
  Volume2,
  Lock,
  Eye,
  Trash2,
  Save,
  Settings as SettingsIcon
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [reminderTime, setReminderTime] = useState("18:00");
  const [language, setLanguage] = useState("english");
  const [fontScale, setFontScale] = useState([1]);
  const [contrastMode, setContrastMode] = useState(false);
  const [volume, setVolume] = useState([70]);
  
  // Handle save settings
  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
  };
  
  // Handle delete account
  const handleDeleteAccount = () => {
    // In a real app, we would show a confirmation dialog first
    toast.error("Account deletion is disabled in this demo");
  };
  
  return (
    <Layout>
      <div className="container py-6 space-y-6 md:py-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Customize your experience and manage your account settings.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Theme & Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5" />
                Theme & Appearance
              </CardTitle>
              <CardDescription>
                Customize how the app looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="theme-toggle">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark theme
                  </p>
                </div>
                <ThemeToggle />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="font-scale">Text Size</Label>
                <Slider
                  id="font-scale"
                  min={0.8}
                  max={1.4}
                  step={0.05}
                  value={fontScale}
                  onValueChange={setFontScale}
                />
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">A</span>
                  <span className="text-lg text-muted-foreground">A</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="contrast-mode"
                  checked={contrastMode}
                  onCheckedChange={setContrastMode}
                />
                <Label htmlFor="contrast-mode">High Contrast Mode</Label>
              </div>
            </CardContent>
          </Card>
          
          {/* Language & Region */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Language & Region
              </CardTitle>
              <CardDescription>
                Choose your preferred language and regional settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language-select">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language-select">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Languages</SelectLabel>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                      <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                      <SelectItem value="telugu">తెలుగు (Telugu)</SelectItem>
                      <SelectItem value="kannada">ಕನ್ನಡ (Kannada)</SelectItem>
                      <SelectItem value="malayalam">മലയാളം (Malayalam)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
                <Label htmlFor="notifications">Enable notifications</Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reminder-time">Daily Reminder Time</Label>
                <input
                  id="reminder-time"
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  disabled={!notifications}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Accessibility */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {volume[0] === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
                Accessibility
              </CardTitle>
              <CardDescription>
                Adjust settings to improve your accessibility experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="volume">Audio Volume</Label>
                <Slider
                  id="volume"
                  max={100}
                  step={1}
                  value={volume}
                  onValueChange={setVolume}
                />
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">0%</span>
                  <span className="text-xs text-muted-foreground">{volume}%</span>
                  <span className="text-xs text-muted-foreground">100%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Privacy & Security */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Privacy & Security
              </CardTitle>
              <CardDescription>
                Manage your data and privacy preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="data-collection" defaultChecked />
                <div>
                  <Label htmlFor="data-collection">Anonymous usage data</Label>
                  <p className="text-sm text-muted-foreground">
                    Help us improve by sharing anonymous usage data
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="third-party-content" defaultChecked />
                <div>
                  <Label htmlFor="third-party-content">Third-party content</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow loading of external resources like quotes and exercises
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={() => toast("Coming soon: Export your journal data")}
              >
                <Eye className="mr-2 h-4 w-4" />
                Export my data
              </Button>
              
              <Button 
                variant="destructive" 
                className="w-full sm:w-auto"
                onClick={handleDeleteAccount}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete my account
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save all settings
          </Button>
        </div>
      </div>
    </Layout>
  );
}

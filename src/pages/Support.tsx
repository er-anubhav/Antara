
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { SupportOptions } from "@/components/SupportOptions";
import { SupportChat } from "@/components/SupportChat";
import { ResourceLibrary } from "@/components/ResourceLibrary";
import { SupportFAQ } from "@/components/SupportFAQ";

type SupportView = "options" | "chat" | "resources" | "faq";

const Support = () => {
  const [activeView, setActiveView] = useState<SupportView>("options");

  return (
    <Layout>
      <div className="p-4 sm:p-6 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold">Support</h1>
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveView("options")}
                className={`px-4 py-2 rounded-full ${
                  activeView === "options" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                Options
              </button>
              {activeView === "chat" && (
                <button 
                  onClick={() => setActiveView("options")}
                  className="px-4 py-2 rounded-full bg-muted hover:bg-muted/80"
                >
                  Back
                </button>
              )}
              <button 
                onClick={() => setActiveView("resources")}
                className={`px-4 py-2 rounded-full ${
                  activeView === "resources" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                Resources
              </button>
              <button 
                onClick={() => setActiveView("faq")}
                className={`px-4 py-2 rounded-full ${
                  activeView === "faq" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                FAQ
              </button>
            </div>
          </div>
          
          {activeView === "options" && <SupportOptions onStartChat={() => setActiveView("chat")} />}
          {activeView === "chat" && <SupportChat />}
          {activeView === "resources" && <ResourceLibrary />}
          {activeView === "faq" && <SupportFAQ />}
        </div>
      </div>
    </Layout>
  );
};

export default Support;

// import { Switch, Route } from "wouter";
import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import PersonalBlog from "@/pages/personal-blog";
import BlogToggle from "@/components/blog-toggle";
import NotFound from "@/pages/not-found";

function Router() {
  const [currentMode, setCurrentMode] = useState<"professional" | "personal">("professional");

  const handleModeChange = (mode: "professional" | "personal") => {
    setCurrentMode(mode);
  };

  return (
    <div>
      <BlogToggle currentMode={currentMode} onModeChange={handleModeChange} />
      
      {currentMode === "professional" ? <Home /> : <PersonalBlog />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

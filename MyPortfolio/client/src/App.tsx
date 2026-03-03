import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import PersonalBlog from "@/pages/personal-blog";
import BlogToggle from "@/components/blog-toggle";
import IntroAnimation from "@/components/intro-animation";

function Router() {
  const [currentMode, setCurrentMode] = useState<"professional" | "personal">("professional");

  return (
    <div>
      <BlogToggle currentMode={currentMode} onModeChange={setCurrentMode} />
      {currentMode === "professional" ? <Home /> : <PersonalBlog />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <IntroAnimation />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          message: "All fields are required" 
        });
      }

      // Here you would typically:
      // 1. Save the contact form data to a database
      // 2. Send an email notification
      // 3. Send an auto-reply to the user
      
      console.log("Contact form submission:", {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
      });

      res.status(200).json({ 
        message: "Message sent successfully! Thank you for reaching out." 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ 
        message: "Internal server error. Please try again later." 
      });
    }
  });

  // Serve resume file (if needed)
  app.get("/api/resume", async (req, res) => {
    try {
      // Here you would serve the actual resume file
      res.json({ 
        message: "Resume download endpoint",
        downloadUrl: "/resume.pdf" 
      });
    } catch (error) {
      console.error("Resume download error:", error);
      res.status(500).json({ 
        message: "Error downloading resume" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

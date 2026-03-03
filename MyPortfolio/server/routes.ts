import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname2 = path.dirname(fileURLToPath(import.meta.url));

// Load knowledge base once
const KB_PATH = path.join(__dirname2, "data", "knowledge-base.json");
let knowledgeBase = "{}";
try { knowledgeBase = fs.readFileSync(KB_PATH, "utf-8"); } catch { }

function getOpenAI(): OpenAI | null {
  const key = process.env.OPENAI_API_KEY;
  if (!key || key === "your-openai-api-key-here") return null;
  return new OpenAI({ apiKey: key });
}

function buildSystemPrompt(extra = ""): string {
  return `You are "Akarsh AI" — a professional portfolio assistant for Akarsha Reddy ChiripiReddy, a Senior DevOps Engineer at Bosch Digital, Bangalore.
Use ONLY the following knowledge base to answer questions. Be concise, professional, and enthusiastic about his skills.
Knowledge base: ${knowledgeBase}
${extra}
If asked something outside the knowledge base, politely say you only know about Akarsh's professional background.`;
}

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

  // ── AI ROUTES ────────────────────────────────────────────────
  // POST /api/ai/chat — streaming chat (SSE)
  app.post("/api/ai/chat", async (req, res) => {
    const openai = getOpenAI();
    if (!openai) {
      return res.status(503).json({ error: "AI not configured. Add OPENAI_API_KEY to .env" });
    }
    const { message, history = [] } = req.body as { message: string; history: { role: string; content: string }[] };
    if (!message) return res.status(400).json({ error: "message required" });

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    try {
      const messages = [
        { role: "system" as const, content: buildSystemPrompt() },
        ...history.slice(-8).map((h) => ({ role: h.role as "user" | "assistant", content: h.content })),
        { role: "user" as const, content: message },
      ];
      const stream = await openai.chat.completions.create({ model: "gpt-4o-mini", messages, stream: true, max_tokens: 400 });
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content ?? "";
        if (text) res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
      res.write("data: [DONE]\n\n");
    } catch (e: any) {
      res.write(`data: ${JSON.stringify({ error: e.message })}\n\n`);
    }
    res.end();
  });

  // POST /api/ai/summarize — profile summary
  app.post("/api/ai/summarize", async (req, res) => {
    const openai = getOpenAI();
    if (!openai) return res.status(503).json({ error: "AI not configured. Add OPENAI_API_KEY to .env" });
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: buildSystemPrompt("Respond ONLY with valid JSON.") },
          {
            role: "user", content: `Generate a structured profile summary with keys:
            "summary" (2-3 sentence 30-second elevator pitch),
            "strengths" (array of 4 key strengths as strings),
            "techStack" (object with categories: containers, cloud, cicd, monitoring, iac as arrays),
            "suggestedRoles" (array of 3-4 ideal job titles),
            "headline" (one punchy headline sentence)
          ` },
        ],
        response_format: { type: "json_object" },
        max_tokens: 600,
      });
      const data = JSON.parse(completion.choices[0].message.content || "{}");
      res.json(data);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // POST /api/ai/explain — explain a topic
  app.post("/api/ai/explain", async (req, res) => {
    const openai = getOpenAI();
    if (!openai) return res.status(503).json({ error: "AI not configured. Add OPENAI_API_KEY to .env" });
    const { topic } = req.body as { topic: string };
    if (!topic) return res.status(400).json({ error: "topic required" });
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: buildSystemPrompt() },
          { role: "user", content: `Explain Akarsha's "${topic}" in 3-4 sentences. Be specific with tools, numbers and achievements from the knowledge base. Keep it engaging and recruiter-friendly.` },
        ],
        max_tokens: 250,
      });
      res.json({ explanation: completion.choices[0].message.content });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  return httpServer;
}

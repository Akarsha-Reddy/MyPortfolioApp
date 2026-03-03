import type { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Knowledge base ──────────────────────────────────────────────
const KB_PATH = path.join(__dirname, "..", "server", "data", "knowledge-base.json");
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

// ── Express app ──────────────────────────────────────────────────
const app = express();
app.use(express.json());

// Contact form
app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }
    console.log("Contact form:", { name, email, subject, message });
    res.status(200).json({ message: "Message sent successfully! Thank you for reaching out." });
});

// Resume download
app.get("/api/resume", (_req, res) => {
    res.json({ message: "Resume download endpoint", downloadUrl: "/resume.pdf" });
});

// AI: Chat (non-streaming for Vercel hobby – returns full text)
app.post("/api/ai/chat", async (req, res) => {
    const openai = getOpenAI();
    if (!openai) return res.status(503).json({ error: "AI not configured. Add OPENAI_API_KEY in Vercel Environment Variables." });

    const { message, history = [] } = req.body as { message: string; history: { role: string; content: string }[] };
    if (!message) return res.status(400).json({ error: "message required" });

    try {
        const messages = [
            { role: "system" as const, content: buildSystemPrompt() },
            ...history.slice(-8).map((h) => ({ role: h.role as "user" | "assistant", content: h.content })),
            { role: "user" as const, content: message },
        ];

        // On Vercel Hobby, SSE streaming can time out — send as full JSON response
        // The frontend chatbot handles both { text } stream chunks AND plain { reply }
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages,
            max_tokens: 400,
        });

        const reply = completion.choices[0].message.content ?? "";

        // Emit as SSE-compatible single data event so frontend stream reader works
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.write(`data: ${JSON.stringify({ text: reply })}\n\n`);
        res.write("data: [DONE]\n\n");
        res.end();
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

// AI: Summarize
app.post("/api/ai/summarize", async (req, res) => {
    const openai = getOpenAI();
    if (!openai) return res.status(503).json({ error: "AI not configured. Add OPENAI_API_KEY in Vercel Environment Variables." });
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: buildSystemPrompt("Respond ONLY with valid JSON.") },
                { role: "user", content: `Generate a structured profile summary with keys: "summary" (2-3 sentence 30-second elevator pitch), "strengths" (array of 4 key strengths), "techStack" (object: containers, cloud, cicd, monitoring, iac arrays), "suggestedRoles" (array of 3-4 ideal job titles), "headline" (one punchy headline sentence)` },
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

// AI: Explain topic
app.post("/api/ai/explain", async (req, res) => {
    const openai = getOpenAI();
    if (!openai) return res.status(503).json({ error: "AI not configured. Add OPENAI_API_KEY in Vercel Environment Variables." });
    const { topic } = req.body as { topic: string };
    if (!topic) return res.status(400).json({ error: "topic required" });
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: buildSystemPrompt() },
                { role: "user", content: `Explain Akarsha's "${topic}" in 3-4 sentences. Be specific with tools, numbers and achievements. Keep it engaging and recruiter-friendly.` },
            ],
            max_tokens: 250,
        });
        res.json({ explanation: completion.choices[0].message.content });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

// ── Vercel handler export ────────────────────────────────────────
export default function handler(req: VercelRequest, res: VercelResponse) {
    return app(req as any, res as any);
}

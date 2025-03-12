import Groq from "groq-sdk";
import { NextResponse } from 'next/server';

interface RoadmapSection {
  name: string;
  skills: string[];
  resources: string[];
  timeframe: string;
  milestones: string[];
}

interface RoadmapResponse {
  title: string;
  sections: RoadmapSection[];
  difficulty: "beginner" | "intermediate" | "advanced";
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function getRoadmap(userQuery: string) {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { 
          role: "system", 
          content: 'You are a frontend development career advisor. Return ONLY a JSON string without any additional text. Use this exact format:\n{\n  "title": "Frontend Development Roadmap",\n  "sections": [\n    {\n      "name": "Foundational Skills",\n      "skills": ["HTML5 Semantics", "CSS3 & Flexbox", "JavaScript ES6+"],\n      "resources": ["MDN Web Docs", "freeCodeCamp", "JavaScript.info"],\n      "timeframe": "2-3 months",\n      "milestones": ["Build responsive layouts", "Create interactive forms"]\n    }\n  ],\n  "difficulty": "beginner"\n}'
        },
        { 
          role: "user", 
          content: `Create a frontend roadmap for: ${userQuery}. Return ONLY valid JSON.` 
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const content = completion.choices[0]?.message?.content || "{}";
    
    try {
      // Ensure the response is valid JSON
      const parsedContent = JSON.parse(content) as RoadmapResponse;
      return NextResponse.json({ roadmap: parsedContent });
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      // Return a fallback structured response
      const fallbackResponse: RoadmapResponse = {
        title: "Frontend Development Roadmap",
        sections: [
          {
            name: "Error",
            skills: ["Unable to generate roadmap"],
            resources: ["Please try again"],
            timeframe: "N/A",
            milestones: ["Error occurred"]
          }
        ],
        difficulty: "beginner"
      };
      return NextResponse.json({ roadmap: fallbackResponse });
    }
  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate roadmap" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userInput } = await req.json();
    
    if (!userInput) {
      return NextResponse.json(
        { error: "User input is required" },
        { status: 400 }
      );
    }

    return getRoadmap(userInput);
    
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process request" },
      { status: 500 }
    );
  }
}

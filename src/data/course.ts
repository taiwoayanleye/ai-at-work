import type { Course } from "@/lib/types";

export const course: Course = {
  title: "AI at Work",
  subtitle: "How real people use AI across industries, roles, and fields",
  description:
    "A free, practical course for anyone curious about how AI is actually being used — not the hype, the reality. Each lesson is an animated, narrated walkthrough you can finish in a few minutes.",

  modules: [
    {
      id: "foundations",
      title: "Foundations",
      description: "What AI actually is, and what it isn't",
      lessons: [
        {
          slug: "what-ai-actually-does",
          moduleIndex: 0,
          lessonIndex: 0,
          title: "What AI Actually Does",
          subtitle:
            "Strip away the buzzwords. Here is what happens when you type a prompt and press enter.",
          duration: "1:45",
          durationSeconds: 105,
          level: "beginner",
          sceneFile: "/scenes/what-ai-actually-does.html",
          narrationFile: "/audio/what-ai-actually-does.mp3",
          chapters: [
            { id: "input", title: "You Type a Prompt", startTime: 0, endTime: 20 },
            { id: "tokens", title: "Text Becomes Tokens", startTime: 20, endTime: 40 },
            { id: "prediction", title: "The Model Predicts", startTime: 40, endTime: 65 },
            { id: "output", title: "Tokens Become Text", startTime: 65, endTime: 85 },
            { id: "reality", title: "What This Means for You", startTime: 85, endTime: 105 },
          ],
          keyTerms: [
            { term: "Prompt", definition: "The text you send to an AI model — your question, instruction, or request." },
            { term: "Token", definition: "A small piece of text (roughly a word or part of a word) that models read and write. Providers charge per token." },
            { term: "Inference", definition: "The process of a trained model generating a response. This is what happens when you press Send." },
            { term: "LLM", definition: "Large Language Model — the kind of AI behind ChatGPT, Claude, and Gemini. It learned patterns from vast amounts of text." },
            { term: "Hallucination", definition: "When an AI states something false with confidence. It is predicting plausible text, not looking up facts." },
          ],
          quiz: [
            {
              question: "What does an LLM actually do when it generates a response?",
              options: [
                "Searches the internet for the answer",
                "Predicts the most likely next tokens based on patterns it learned",
                "Copies text from a database of pre-written responses",
                "Understands your question and reasons about it like a human",
              ],
              correctIndex: 1,
              explanation: "LLMs are pattern-matching machines. They predict the next most probable token based on the patterns they absorbed during training.",
            },
            {
              question: "Why do AI models sometimes 'hallucinate'?",
              options: [
                "They run out of memory",
                "The internet connection drops",
                "They predict plausible-sounding text even when they have no factual basis",
                "They are trying to be creative",
              ],
              correctIndex: 2,
              explanation: "Hallucinations happen because the model optimizes for plausible text, not truthful text.",
            },
          ],
          summary: "An AI model takes your text, breaks it into tokens, predicts the most likely sequence of next tokens, and converts that back into readable text. It does not think, search, or understand — it pattern-matches at extraordinary scale. This is powerful and useful, but it means the output can be confidently wrong. Knowing this changes how you use it: always verify, never assume.",
        },
      ],
    },
    {
      id: "product-and-tech",
      title: "AI in Product & Tech",
      description: "How product managers, engineers, and designers work with AI daily",
      lessons: [],
    },
    {
      id: "finance-and-banking",
      title: "AI in Finance & Banking",
      description: "Fraud detection, risk analysis, portfolio management, and compliance",
      lessons: [],
    },
    {
      id: "healthcare",
      title: "AI in Healthcare",
      description: "Diagnostics, drug discovery, patient triage, and clinical workflows",
      lessons: [],
    },
    {
      id: "marketing-and-sales",
      title: "AI in Marketing & Sales",
      description: "Personalization, lead scoring, content generation, and campaign optimization",
      lessons: [],
    },
    {
      id: "operations-and-hr",
      title: "AI in Operations & HR",
      description: "Resume screening, supply chain, workforce planning, and process automation",
      lessons: [],
    },
    {
      id: "education",
      title: "AI in Education",
      description: "Adaptive learning, grading, tutoring agents, and curriculum design",
      lessons: [],
    },
    {
      id: "building-your-own",
      title: "Building Your Own AI Tools",
      description: "Agents, workflows, no-code AI, and when to build vs buy",
      lessons: [],
    },
  ],
};

export function getLessonBySlug(slug: string) {
  for (const mod of course.modules) {
    for (const lesson of mod.lessons) {
      if (lesson.slug === slug) return { lesson, module: mod };
    }
  }
  return null;
}

export function getAllLessons() {
  return course.modules.flatMap((mod) =>
    mod.lessons.map((lesson) => ({ lesson, module: mod }))
  );
}

export function getTotalLessonCount() {
  return course.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
}

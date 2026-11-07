export interface Chapter {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
}

export interface KeyTerm {
  term: string;
  definition: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  slug: string;
  moduleIndex: number;
  lessonIndex: number;
  title: string;
  subtitle: string;
  duration: string;
  durationSeconds: number;
  level: "beginner" | "intermediate" | "advanced";
  chapters: Chapter[];
  keyTerms: KeyTerm[];
  quiz: QuizQuestion[];
  summary: string;
  sceneFile: string;
  narrationFile: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  title: string;
  subtitle: string;
  description: string;
  modules: Module[];
}

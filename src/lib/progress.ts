const STORAGE_KEY = "ai-at-work-progress";

export interface Progress {
  completedLessons: string[];
  currentLesson: string | null;
  lastVisited: string;
}

function getDefault(): Progress {
  return {
    completedLessons: [],
    currentLesson: null,
    lastVisited: new Date().toISOString(),
  };
}

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefault();
    return JSON.parse(raw) as Progress;
  } catch {
    return getDefault();
  }
}

export function saveProgress(progress: Progress) {
  try {
    progress.lastVisited = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // storage unavailable
  }
}

export function markComplete(slug: string) {
  const progress = loadProgress();
  if (!progress.completedLessons.includes(slug)) {
    progress.completedLessons.push(slug);
  }
  saveProgress(progress);
}

export function isComplete(slug: string): boolean {
  return loadProgress().completedLessons.includes(slug);
}

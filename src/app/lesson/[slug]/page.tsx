import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { course, getLessonBySlug, getAllLessons } from "@/data/course";
import { LessonPlayer } from "@/components/lesson-player";
import { LessonTabs } from "@/components/lesson-tabs";

export function generateStaticParams() {
  return getAllLessons().map(({ lesson }) => ({ slug: lesson.slug }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = getLessonBySlug(slug);
  if (!result) notFound();

  const { lesson, module: mod } = result;
  const allLessons = getAllLessons();
  const currentIndex = allLessons.findIndex((l) => l.lesson.slug === slug);
  const prev = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const next = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col px-6 py-8">
      <header className="mb-6 space-y-1">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-white/40 transition hover:text-white/60"
        >
          <ArrowLeft className="h-3 w-3" />
          {course.title}
        </Link>
        <p className="text-xs text-white/30">
          {mod.title} &middot; Lesson {lesson.lessonIndex + 1}
        </p>
        <h1 className="text-2xl font-bold">{lesson.title}</h1>
        <p className="text-sm text-white/50">{lesson.subtitle}</p>
        <div className="flex items-center gap-3 text-xs text-white/30">
          <span className="rounded-full border border-white/10 px-2 py-0.5">
            {lesson.level}
          </span>
          <span>{lesson.chapters.length} chapters &middot; {lesson.duration}</span>
        </div>
      </header>

      <LessonPlayer lesson={lesson} />

      <div className="mt-8">
        <LessonTabs lesson={lesson} />
      </div>

      <nav className="mt-auto flex items-center justify-between border-t border-white/10 pt-6">
        {prev ? (
          <Link
            href={`/lesson/${prev.lesson.slug}`}
            className="flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {prev.lesson.title}
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/lesson/${next.lesson.slug}`}
            className="flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
          >
            {next.lesson.title}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
          >
            Back to course
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </nav>
    </div>
  );
}

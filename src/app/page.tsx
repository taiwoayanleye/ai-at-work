import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { course, getAllLessons } from "@/data/course";

export default function HomePage() {
  const allLessons = getAllLessons();
  const readyCount = allLessons.length;

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <section className="space-y-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
          A free course
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {course.title}
        </h1>
        <p className="text-lg leading-relaxed text-white/70">{course.subtitle}</p>
        <p className="text-sm leading-relaxed text-white/50">{course.description}</p>

        {readyCount > 0 && (
          <Link
            href={`/lesson/${allLessons[0].lesson.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Start the course <ArrowRight className="h-4 w-4" />
          </Link>
        )}

        <p className="text-xs text-white/30">
          No account needed. Your progress is saved on this device, in this browser.
        </p>
      </section>

      <section className="mt-16 space-y-10">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-white/40">
          The path
        </h2>

        {course.modules.map((mod, mi) => (
          <div key={mod.id} className="space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-xs font-bold text-white/30">
                {String(mi + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-semibold text-white">{mod.title}</h3>
                <p className="text-sm text-white/50">{mod.description}</p>
              </div>
            </div>

            {mod.lessons.length > 0 ? (
              <ul className="space-y-1 pl-8">
                {mod.lessons.map((lesson) => (
                  <li key={lesson.slug}>
                    <Link
                      href={`/lesson/${lesson.slug}`}
                      className="group flex items-center justify-between rounded-lg border border-white/5 px-4 py-3 transition hover:border-white/15 hover:bg-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-4 w-4 text-white/30 group-hover:text-white/50" />
                        <div>
                          <p className="text-sm font-medium text-white/80 group-hover:text-white">
                            {lesson.title}
                          </p>
                          <p className="text-xs text-white/40">
                            {lesson.subtitle.slice(0, 80)}
                            {lesson.subtitle.length > 80 ? "…" : ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-white/30">
                        <Clock className="h-3 w-3" />
                        {lesson.duration}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="pl-8 text-xs italic text-white/20">Coming soon</p>
            )}
          </div>
        ))}
      </section>

      <section className="mt-16 space-y-4 border-t border-white/10 pt-10">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-white/40">
          Why this course
        </h2>
        <p className="text-sm leading-relaxed text-white/60">
          Everyone talks about AI, but few show how it is actually used day to day. This
          course walks through real workflows — not hype, not theory — across product
          management, finance, healthcare, marketing, education, and more. Each lesson is an
          animated, narrated walkthrough you can finish in a few minutes.
        </p>
        <p className="text-sm leading-relaxed text-white/60">
          By the end, you should be able to explain what AI does and does not do, identify
          where it fits in your own work, and start building your own tools — regardless of
          your industry or role.
        </p>
      </section>

      <footer className="mt-16 border-t border-white/10 pt-6 text-center text-xs text-white/30">
        Made by{" "}
        <a
          href="https://taiwo.ayanleye.com"
          target="_blank"
          rel="noopener"
          className="text-white/50 underline decoration-white/20 hover:text-white/70"
        >
          Taiwo Ayanleye
        </a>
      </footer>
    </main>
  );
}

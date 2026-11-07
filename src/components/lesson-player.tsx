"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import type { Lesson } from "@/lib/types";
import { cn, formatTime } from "@/lib/utils";

export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(lesson.durationSeconds);
  const [activeChapter, setActiveChapter] = useState(0);

  const postToScene = useCallback(
    (msg: Record<string, unknown>) => {
      iframeRef.current?.contentWindow?.postMessage(msg, "*");
    },
    []
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      const t = audio.currentTime;
      setCurrentTime(t);
      postToScene({ type: "seek", time: t });
      const idx = [...lesson.chapters].reverse().findIndex((ch) => t >= ch.startTime);
      if (idx >= 0) setActiveChapter(lesson.chapters.length - 1 - idx);
    };

    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => { setPlaying(false); postToScene({ type: "pause" }); };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, [lesson.chapters, postToScene]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); postToScene({ type: "pause" }); }
    else { audio.play(); postToScene({ type: "play" }); }
    setPlaying(!playing);
  }

  function seekTo(time: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    postToScene({ type: "seek", time });
  }

  function restart() { seekTo(0); if (!playing) togglePlay(); }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-lg">
        <iframe
          ref={iframeRef}
          src={lesson.sceneFile}
          title={`${lesson.title} animation`}
          sandbox="allow-scripts"
          className="absolute inset-0 w-full h-full"
        />
      </div>

      <audio ref={audioRef} src={lesson.narrationFile} preload="metadata" />

      <div className="flex items-center gap-3 px-1">
        <button
          onClick={togglePlay}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition hover:bg-white/90"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
        </button>

        <button onClick={restart} className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition hover:text-white" aria-label="Restart">
          <RotateCcw className="h-4 w-4" />
        </button>

        <div className="flex-1">
          <input
            type="range" min={0} max={duration} step={0.1} value={currentTime}
            onChange={(e) => seekTo(Number(e.target.value))}
            className="seek-slider w-full" aria-label="Seek"
          />
        </div>

        <span className="min-w-[5rem] text-right text-sm tabular-nums text-white/60">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {lesson.chapters.map((ch, i) => (
          <button
            key={ch.id}
            onClick={() => seekTo(ch.startTime)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition",
              i === activeChapter
                ? "border-white/30 bg-white/10 text-white"
                : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"
            )}
          >
            {ch.title}
          </button>
        ))}
      </div>
    </div>
  );
}

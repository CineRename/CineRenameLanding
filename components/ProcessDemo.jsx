"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useLocale } from "next-intl";
import { gsap } from "gsap";
import { buildDemoSequence } from "./process-demo-sequences";
import styles from "./ProcessDemo.module.css";

const COPY = {
  fr: { demo: "Démonstration", playing: "En lecture", paused: "En pause", finished: "Terminée", reduced: "Animations réduites", play: "Lire", pause: "Pause", replay: "Rejouer" },
  en: { demo: "Demonstration", playing: "Playing", paused: "Paused", finished: "Complete", reduced: "Reduced motion", play: "Play", pause: "Pause", replay: "Replay" },
  es: { demo: "Demostración", playing: "En reproducción", paused: "En pausa", finished: "Finalizada", reduced: "Movimiento reducido", play: "Reproducir", pause: "Pausa", replay: "Repetir" },
  zh: { demo: "功能演示", playing: "正在播放", paused: "已暂停", finished: "已完成", reduced: "已减少动态效果", play: "播放", pause: "暂停", replay: "重播" },
};

export default function ProcessDemo({ variant, title, sequenceKey = "", children }) {
  const locale = useLocale();
  const copy = COPY[locale] || COPY.en;
  const root = useRef(null);
  const commands = useRef({});
  const [phase, setPhase] = useState("idle");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const element = root.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let context;
    let timeline;
    let visible = false;
    let userPaused = false;
    let ended = false;
    let reversing = false;

    const clear = () => {
      context?.revert();
      context = undefined;
      timeline = undefined;
      element.querySelector("[role='progressbar']")?.setAttribute("aria-valuenow", "100");
    };

    const create = () => {
      clear();
      ended = false;
      reversing = false;
      context = gsap.context(() => {
        timeline = gsap.timeline({
          paused: true,
          defaults: { ease: "expo.out" },
          onComplete: () => { ended = true; setPhase("finished"); },
          onReverseComplete: () => { ended = true; setPhase("restored"); },
          onUpdate: () => {
            const progress = element.querySelector("[role='progressbar']");
            if (progress) progress.setAttribute("aria-valuenow", String(Math.round(timeline.progress() * 100)));
          },
        });
        buildDemoSequence(timeline, gsap.utils.selector(element), variant);
      }, element);
    };

    const sync = () => {
      if (media.matches) {
        clear();
        setReducedMotion(true);
        setPhase("reduced");
        return;
      }
      setReducedMotion(false);
      if (ended) return;
      if (visible && !document.hidden && !userPaused) {
        if (!timeline) create();
        timeline.resume();
        setPhase(reversing ? "reversing" : "playing");
      } else if (timeline) {
        timeline.pause();
        setPhase("paused");
      }
    };

    commands.current = {
      replay() {
        userPaused = false;
        if (media.matches) { setPhase("finished"); return; }
        create();
        sync();
      },
      toggle() { userPaused = timeline ? !timeline.paused() : false; sync(); },
      undo() {
        if (media.matches) { setPhase("restored"); return; }
        if (!timeline || !ended || reversing) return;
        ended = false;
        reversing = true;
        userPaused = false;
        timeline.timeScale(1.5).reverse();
        setPhase("reversing");
      },
    };

    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.12;
      sync();
    }, { threshold: [0, 0.12] });
    if (observer) observer.observe(element);
    else visible = true;
    const motionChanged = () => { ended = false; userPaused = false; sync(); };
    media.addEventListener("change", motionChanged);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      observer?.disconnect();
      media.removeEventListener("change", motionChanged);
      document.removeEventListener("visibilitychange", sync);
      clear();
      commands.current = {};
    };
  }, [variant, sequenceKey]);

  const playing = phase === "playing" || phase === "reversing";
  const finished = phase === "finished" || phase === "restored";
  const replay = () => commands.current.replay?.();
  const undo = () => commands.current.undo?.();

  return (
    <div ref={root} role="group" aria-label={`${copy.demo} — ${title}`} data-demo={variant} data-demo-state={phase} className={styles.frame}>
      <div className={styles.content}>
        {typeof children === "function" ? children({ phase, playing, replay, undo, reducedMotion }) : children}
      </div>
      <div className={styles.controls}>
        <span className={styles.caption}>
          {copy.demo}<span aria-hidden="true"> · </span>
          <span>{reducedMotion ? copy.reduced : finished ? copy.finished : playing ? copy.playing : phase === "paused" ? copy.paused : copy.play}</span>
        </span>
        {!reducedMotion && (
          <div className={styles.buttons}>
            {!finished && <button type="button" onClick={() => commands.current.toggle?.()} aria-label={`${playing ? copy.pause : copy.play} — ${title}`}>
              {playing ? <Pause size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}
              {playing ? copy.pause : copy.play}
            </button>}
            <button type="button" onClick={replay} aria-label={`${copy.replay} — ${title}`}>
              <RotateCcw size={13} aria-hidden="true" />{copy.replay}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Each sequence explains one action, runs once, and leaves its result readable.
export function buildDemoSequence(timeline, select, variant) {
  const reveal = (selector, at, stagger = 0.16) => {
    const targets = select(selector);
    if (targets.length) timeline.from(targets, { opacity: 0, y: 12, duration: 0.45, stagger }, at);
  };

  if (variant === "import") {
    timeline.fromTo(select("[data-demo-parcel]"),
      { opacity: 0, x: 40, y: -20, rotate: -8, scale: 0.92 },
      { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, duration: 0.65 }, 0);
    timeline.to(select("[data-demo-parcel]"), { opacity: 0, y: 20, scale: 0.8, duration: 0.3 }, 0.8);
    timeline.from(select("[data-demo-drop]"), { scale: 0.8, duration: 0.4 }, 0.85);
    reveal("[data-demo-row]", 1.05, 0.2);
    timeline.from(select("[data-demo-check]"), { opacity: 0, scale: 0.8, duration: 0.3, stagger: 0.2 }, 1.65);
    reveal("[data-demo-result]", 2.65);
  } else if (variant === "metadata") {
    timeline.fromTo(select("[data-demo-scan]"), { scaleX: 0, opacity: 0.8 }, { scaleX: 1, duration: 0.85, ease: "power2.inOut" }, 0);
    timeline.to(select("[data-demo-scan]"), { opacity: 0, duration: 0.3 }, 0.9);
    reveal("[data-demo-row]", 0.75, 0.45);
    timeline.from(select("[data-demo-poster]"), { clipPath: "inset(0 0 100% 0)", duration: 0.65, stagger: 0.45 }, 0.9);
    reveal("[data-demo-check]", 1.5, 0.3);
    reveal("[data-demo-result]", 2.2);
  } else if (variant === "studio") {
    timeline.from(select("[data-demo-after]"), { clipPath: "inset(0 100% 0 0)", opacity: 0, duration: 0.6, stagger: 0.4 }, 0.4);
    timeline.to(select("[data-demo-before]"), { opacity: 0.45, duration: 0.4, stagger: 0.4 }, 0.65);
    timeline.from(select("[data-demo-check]"), { opacity: 0, scale: 0.85, duration: 0.3, stagger: 0.4 }, 0.95);
    reveal("[data-demo-result]", 2.6);
  } else if (variant === "execute") {
    timeline.fromTo(select("[data-demo-progress]"), { scaleX: 0 }, { scaleX: 1, duration: 2.5, ease: "power2.inOut" }, 0);
    reveal("[data-demo-folder]", 0.55, 0.9);
    timeline.from(select("[data-demo-file]"), { opacity: 0, x: -18, duration: 0.5, stagger: 0.9 }, 1.05);
    reveal("[data-demo-result]", 2.55);
  } else if (variant === "ready") {
    reveal("[data-demo-row]", 0.2, 0.35);
    timeline.from(select("[data-demo-check]"), { opacity: 0, scale: 0.85, duration: 0.3, stagger: 0.35 }, 0.7);
    reveal("[data-demo-sidecar]", 1.8);
    reveal("[data-demo-duplicates]", 2.25);
    timeline.from(select("[data-demo-kept]"), { opacity: 0.4, duration: 0.5 }, 2.55);
    timeline.to(select("[data-demo-duplicate]"), { opacity: 0.8, x: 3, duration: 0.55 }, 2.9);
    reveal("[data-demo-result]", 3.5);
  }
}

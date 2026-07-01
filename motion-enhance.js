/* Clean Cut Canterbury — Motion (motion.dev) enhancements.
   Additive, progressive-enhancement layer. If the CDN import fails the site
   still works — nothing here is required for content to display. */
import { animate, inView, scroll, stagger } from "https://cdn.jsdelivr.net/npm/motion@11/+esm";

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* 1. Scroll progress bar (brand gradient) that fills as you scroll the page. */
const bar = document.createElement("div");
bar.style.cssText =
  "position:fixed;top:0;left:0;right:0;height:4px;transform-origin:0 50%;transform:scaleX(0);" +
  "background:linear-gradient(90deg,#18a5dd,#5cba47);z-index:100;pointer-events:none";
document.body.appendChild(bar);
scroll(animate(bar, { scaleX: [0, 1] }, { ease: "linear" }));

if (!reduce) {
  /* 2. Floating action buttons fade in with a gentle stagger on load.
        Opacity only, so the CSS :hover transform on .fab a stays intact. */
  const fabs = document.querySelectorAll(".fab a");
  if (fabs.length) {
    fabs.forEach((f) => (f.style.opacity = "0"));
    animate(fabs, { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.12, { start: 0.3 }) });
  }

  /* 3. Spring hover micro-interaction on card & feature icons (inner elements,
        so this doesn't fight the card's CSS :hover styles). Native pointer
        events drive Motion's spring animate(). */
  document.querySelectorAll(".svc-ico, .feat-ico").forEach((el) => {
    el.addEventListener("mouseenter", () =>
      animate(el, { scale: 1.12, rotate: -4 }, { type: "spring", stiffness: 400, damping: 14 })
    );
    el.addEventListener("mouseleave", () =>
      animate(el, { scale: 1, rotate: 0 }, { type: "spring", stiffness: 400, damping: 18 })
    );
  });

  /* 4. Eco "100% Plant-Based" badge core springs in when scrolled into view. */
  inView(
    ".eco-badge .core",
    (el) => {
      animate(el, { scale: [0.72, 1] }, { type: "spring", stiffness: 220, damping: 16 });
    },
    { amount: 0.4 }
  );

  /* 5. Service-detail scene panel lifts in with a spring the first time it appears. */
  inView(
    ".detail-hero-ico",
    (el) => {
      animate(el, { y: [26, 0], opacity: [0, 1] }, { type: "spring", stiffness: 180, damping: 20 });
    },
    { amount: 0.3 }
  );
}

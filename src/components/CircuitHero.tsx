import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Trace {
  points: Point[];
  segmentLengths: number[];
  totalLength: number;
  hasPulse: boolean;
  pulseProgress: number;
  pulseSpeed: number;
  isAmber: boolean;
}

const GRID = 48;

function buildTraces(width: number, height: number): Trace[] {
  const cols = Math.max(4, Math.floor(width / GRID));
  const rows = Math.max(4, Math.floor(height / GRID));
  const traceCount = Math.min(26, Math.max(10, Math.floor((cols * rows) / 14)));
  const traces: Trace[] = [];

  for (let i = 0; i < traceCount; i++) {
    const segments = 2 + Math.floor(Math.random() * 3);
    let cx = Math.floor(Math.random() * cols);
    let cy = Math.floor(Math.random() * rows);
    const points: Point[] = [{ x: cx * GRID, y: cy * GRID }];
    let horizontal = Math.random() > 0.5;

    for (let s = 0; s < segments; s++) {
      const step = 1 + Math.floor(Math.random() * 3);
      const dir = Math.random() > 0.5 ? 1 : -1;
      if (horizontal) {
        cx = Math.min(cols, Math.max(0, cx + step * dir));
      } else {
        cy = Math.min(rows, Math.max(0, cy + step * dir));
      }
      points.push({ x: cx * GRID, y: cy * GRID });
      horizontal = !horizontal;
    }

    const segmentLengths: number[] = [];
    let totalLength = 0;
    for (let p = 0; p < points.length - 1; p++) {
      const dx = points[p + 1].x - points[p].x;
      const dy = points[p + 1].y - points[p].y;
      const len = Math.sqrt(dx * dx + dy * dy);
      segmentLengths.push(len);
      totalLength += len;
    }

    traces.push({
      points,
      segmentLengths,
      totalLength,
      hasPulse: Math.random() < 0.45,
      pulseProgress: Math.random(),
      pulseSpeed: 0.0025 + Math.random() * 0.003,
      isAmber: Math.random() < 0.15,
    });
  }

  return traces;
}

function pointAtProgress(trace: Trace, progress: number): Point {
  const target = progress * trace.totalLength;
  let covered = 0;
  for (let i = 0; i < trace.segmentLengths.length; i++) {
    const segLen = trace.segmentLengths[i];
    if (covered + segLen >= target || i === trace.segmentLengths.length - 1) {
      const segT = segLen === 0 ? 0 : (target - covered) / segLen;
      const a = trace.points[i];
      const b = trace.points[i + 1];
      return { x: a.x + (b.x - a.x) * segT, y: a.y + (b.y - a.y) * segT };
    }
    covered += segLen;
  }
  return trace.points[0];
}

/**
 * Canvas-rendered animated circuit-trace background for the hero.
 * Static traces are drawn once to an offscreen buffer; each frame only
 * redraws the moving pulses and the cursor glow, keeping this cheap.
 * Pauses via IntersectionObserver when scrolled out of view and respects
 * prefers-reduced-motion (renders one static frame, no loop).
 */
const CircuitHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let traces: Trace[] = [];
    let width = 0;
    let height = 0;
    let bufferCanvas = document.createElement('canvas');
    let bufferCtx = bufferCanvas.getContext('2d');
    const mouse = { x: -9999, y: -9999, active: false };
    let rafId: number | null = null;
    let visible = true;

    const teal = getComputedStyle(document.documentElement).getPropertyValue('--accent-blue').trim();
    const cyan = getComputedStyle(document.documentElement).getPropertyValue('--accent-cyan').trim();
    const amber = getComputedStyle(document.documentElement).getPropertyValue('--accent-amber').trim();

    function drawStaticTraces() {
      if (!bufferCtx) return;
      bufferCtx.clearRect(0, 0, width, height);
      bufferCtx.lineCap = 'round';
      bufferCtx.lineJoin = 'round';

      for (const trace of traces) {
        bufferCtx.beginPath();
        bufferCtx.moveTo(trace.points[0].x, trace.points[0].y);
        for (let i = 1; i < trace.points.length; i++) {
          bufferCtx.lineTo(trace.points[i].x, trace.points[i].y);
        }
        bufferCtx.strokeStyle = `hsl(${teal} / 0.16)`;
        bufferCtx.lineWidth = 1.5;
        bufferCtx.stroke();

        // Junction nodes
        for (const p of trace.points) {
          bufferCtx.beginPath();
          bufferCtx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          bufferCtx.fillStyle = `hsl(${cyan} / 0.2)`;
          bufferCtx.fill();
        }
      }
    }

    function resize() {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      bufferCanvas.width = width * dpr;
      bufferCanvas.height = height * dpr;
      bufferCtx = bufferCanvas.getContext('2d');
      bufferCtx?.setTransform(dpr, 0, 0, dpr, 0, 0);

      traces = buildTraces(width, height);
      drawStaticTraces();

      if (reduceMotion) {
        renderFrame(true);
      }
    }

    function renderFrame(staticOnly = false) {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(bufferCanvas, 0, 0, width, height);

      if (staticOnly) return;

      for (const trace of traces) {
        if (!trace.hasPulse) continue;
        trace.pulseProgress = (trace.pulseProgress + trace.pulseSpeed) % 1;
        const pt = pointAtProgress(trace, trace.pulseProgress);
        const color = trace.isAmber ? amber : cyan;

        const glow = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 10);
        glow.addColorStop(0, `hsl(${color} / 0.9)`);
        glow.addColorStop(1, `hsl(${color} / 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${color} / 1)`;
        ctx.fill();
      }

      if (mouse.active) {
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 160);
        glow.addColorStop(0, `hsl(${teal} / 0.10)`);
        glow.addColorStop(1, `hsl(${teal} / 0)`);
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 160, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      }
    }

    function loop() {
      if (!visible) return;
      renderFrame();
      rafId = requestAnimationFrame(loop);
    }

    resize();

    if (!reduceMotion) {
      rafId = requestAnimationFrame(loop);
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onMouseLeave = () => {
      mouse.active = false;
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reduceMotion && rafId === null) {
          rafId = requestAnimationFrame(loop);
        } else if (!visible && rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-auto" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default CircuitHero;

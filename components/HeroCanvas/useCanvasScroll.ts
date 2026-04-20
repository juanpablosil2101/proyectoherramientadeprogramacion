"use client";

import { useEffect, useRef } from "react";

interface CanvasFrame {
  width: number;
  height: number;
  index: number;
  total: number;
}

function drawFrame(ctx: CanvasRenderingContext2D, frame: CanvasFrame) {
  const { width, height, index, total } = frame;
  const progress = index / (total - 1);

  ctx.clearRect(0, 0, width, height);

  // Deep dark background with subtle warm shift
  const bgLightness = Math.round(8 + progress * 4);
  ctx.fillStyle = `hsl(25, 60%, ${bgLightness}%)`;
  ctx.fillRect(0, 0, width, height);

  // Steam / vapor rising — series of bezier curves
  const steamOpacity = Math.min(progress * 1.8, 0.7);
  for (let s = 0; s < 5; s++) {
    const phase = (s / 5) * Math.PI * 2;
    const xBase = width * 0.35 + s * width * 0.06;
    const yBase = height * 0.62 - progress * height * 0.3;
    const amplitude = 18 + s * 8;
    const curveHeight = height * 0.28;

    ctx.beginPath();
    ctx.moveTo(xBase, yBase);
    ctx.bezierCurveTo(
      xBase + amplitude * Math.sin(phase + progress * 4),
      yBase - curveHeight * 0.33,
      xBase - amplitude * Math.cos(phase + progress * 4),
      yBase - curveHeight * 0.66,
      xBase + amplitude * 0.4 * Math.sin(phase + progress * 6),
      yBase - curveHeight
    );
    ctx.strokeStyle = `rgba(232, 213, 183, ${steamOpacity * (1 - s * 0.12)})`;
    ctx.lineWidth = 2.5 - s * 0.3;
    ctx.lineCap = "round";
    ctx.stroke();
  }

  // Cup silhouette — grows from bottom as progress increases
  const cupScale = 0.5 + progress * 0.5;
  const cupX = width / 2;
  const cupY = height * 0.78;
  const cupW = width * 0.22 * cupScale;
  const cupH = height * 0.22 * cupScale;

  // Cup body (trapezoid)
  ctx.beginPath();
  ctx.moveTo(cupX - cupW * 0.55, cupY - cupH * 0.1);
  ctx.lineTo(cupX - cupW * 0.45, cupY + cupH);
  ctx.lineTo(cupX + cupW * 0.45, cupY + cupH);
  ctx.lineTo(cupX + cupW * 0.55, cupY - cupH * 0.1);
  ctx.closePath();
  const cupGrad = ctx.createLinearGradient(
    cupX - cupW,
    cupY,
    cupX + cupW,
    cupY + cupH
  );
  cupGrad.addColorStop(0, `rgba(74, 44, 26, ${0.6 + progress * 0.4})`);
  cupGrad.addColorStop(0.5, `rgba(139, 94, 60, ${0.5 + progress * 0.4})`);
  cupGrad.addColorStop(1, `rgba(42, 25, 14, ${0.7 + progress * 0.3})`);
  ctx.fillStyle = cupGrad;
  ctx.fill();

  // Coffee surface inside cup
  const surfaceY = cupY + cupH * 0.12;
  ctx.beginPath();
  ctx.ellipse(cupX, surfaceY, cupW * 0.44, cupH * 0.1, 0, 0, Math.PI * 2);
  const coffeeGrad = ctx.createRadialGradient(
    cupX,
    surfaceY,
    0,
    cupX,
    surfaceY,
    cupW * 0.44
  );
  coffeeGrad.addColorStop(0, `rgba(201, 168, 76, ${progress * 0.9})`);
  coffeeGrad.addColorStop(0.4, `rgba(139, 94, 60, ${progress * 0.8})`);
  coffeeGrad.addColorStop(1, `rgba(26, 15, 8, ${progress * 0.7})`);
  ctx.fillStyle = coffeeGrad;
  ctx.fill();

  // Rim highlight
  ctx.beginPath();
  ctx.ellipse(cupX, cupY - cupH * 0.05, cupW * 0.55, cupH * 0.12, 0, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(201, 168, 76, ${0.3 + progress * 0.5})`;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Saucer
  ctx.beginPath();
  ctx.ellipse(cupX, cupY + cupH + cupH * 0.08, cupW * 0.75, cupH * 0.16, 0, 0, Math.PI * 2);
  const saucerGrad = ctx.createRadialGradient(
    cupX,
    cupY + cupH + cupH * 0.08,
    0,
    cupX,
    cupY + cupH + cupH * 0.08,
    cupW * 0.75
  );
  saucerGrad.addColorStop(0, `rgba(74, 44, 26, ${0.5 + progress * 0.4})`);
  saucerGrad.addColorStop(1, `rgba(26, 15, 8, ${0.3 + progress * 0.5})`);
  ctx.fillStyle = saucerGrad;
  ctx.fill();

  // Gold accent ring on saucer
  ctx.beginPath();
  ctx.ellipse(cupX, cupY + cupH + cupH * 0.08, cupW * 0.7, cupH * 0.13, 0, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(201, 168, 76, ${progress * 0.6})`;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Ambient radial glow from coffee
  const glowRadius = Math.max(width, height) * 0.5 * progress;
  const glow = ctx.createRadialGradient(
    cupX,
    cupY,
    0,
    cupX,
    cupY,
    glowRadius
  );
  glow.addColorStop(0, `rgba(139, 94, 60, ${progress * 0.18})`);
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  // Coffee bean particles floating up
  if (progress > 0.2) {
    const beanOpacity = (progress - 0.2) * 1.2;
    for (let b = 0; b < 8; b++) {
      const seed = b * 137.5;
      const bx = width * (0.2 + (Math.sin(seed) * 0.5 + 0.5) * 0.6);
      const by =
        height * 0.85 -
        progress * height * 0.5 * ((b % 3) * 0.2 + 0.4);
      const br = 3 + (b % 3) * 2;
      ctx.beginPath();
      ctx.arc(bx, by, br, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(74, 44, 26, ${beanOpacity * 0.7})`;
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(bx - br, by);
      ctx.bezierCurveTo(bx - br, by - br * 0.5, bx + br, by - br * 0.5, bx + br, by);
      ctx.strokeStyle = `rgba(201, 168, 76, ${beanOpacity * 0.5})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  }
}

export function useCanvasScroll(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  totalFrames: number = 90
) {
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(currentFrameRef.current);
    }

    function renderFrame(index: number) {
      if (!canvas || !ctx) return;
      drawFrame(ctx, {
        width: canvas.width,
        height: canvas.height,
        index,
        total: totalFrames,
      });
    }

    function onScroll() {
      const scrollEl = document.documentElement;
      const scrollTop = scrollEl.scrollTop;
      // Map scroll within the hero zone (100vh) to frames
      const heroHeight = window.innerHeight;
      const progress = Math.min(Math.max(scrollTop / heroHeight, 0), 1);
      const frameIndex = Math.round(progress * (totalFrames - 1));

      if (frameIndex === currentFrameRef.current) return;
      currentFrameRef.current = frameIndex;

      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => renderFrame(frameIndex));
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [canvasRef, totalFrames]);
}

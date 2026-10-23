"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

import type { Theme } from "@/context/ThemeContext";

export interface ThreeSceneProps {
  theme: Theme;
  cards: { label: string; caption: string }[];
  /** Called if a WebGL context cannot be created; parent shows the fallback. */
  onUnsupported: () => void;
  /** Called after the first frame has been drawn; parent fades out the fallback. */
  onReady?: () => void;
}

const BRAND = {
  cerulean: 0x007ba7,
  rose: 0xff2d95,
};

/** Draws a card face (label + caption) into a canvas texture. */
function makeCardTexture(label: string, caption: string, theme: Theme, accent: boolean): THREE.CanvasTexture {
  const w = 512;
  const h = 320;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  if (!ctx) return texture;

  const fg = theme === "dark" ? "#F2F6F8" : "#0A0A0A";
  const muted = theme === "dark" ? "rgba(242,246,248,0.62)" : "rgba(10,10,10,0.58)";
  const displayFont = getComputedStyle(document.documentElement).getPropertyValue("--font-bricolage").trim() || "sans-serif";
  const bodyFont = getComputedStyle(document.documentElement).getPropertyValue("--font-figtree").trim() || "sans-serif";

  ctx.clearRect(0, 0, w, h);
  // accent bar
  ctx.fillStyle = accent ? "#FF2D95" : "#007BA7";
  ctx.beginPath();
  ctx.roundRect(44, 52, 72, 10, 5);
  ctx.fill();
  // label
  ctx.fillStyle = fg;
  ctx.font = `600 54px ${displayFont}`;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(label, 44, 170, w - 88);
  // caption
  ctx.fillStyle = muted;
  ctx.font = `400 30px ${bodyFont}`;
  ctx.fillText(caption, 44, 228, w - 88);

  texture.needsUpdate = true;
  return texture;
}

export default function ThreeScene({ theme, cards, onUnsupported, onReady }: ThreeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // WebGL availability check before touching three.
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2") ?? probe.getContext("webgl");
    if (!gl) {
      onUnsupported();
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      onUnsupported();
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.setAttribute("aria-hidden", "true");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    camera.position.set(0, 0.1, 7.6);

    // Lighting: soft key, cerulean fill, faint rose rim.
    scene.add(new THREE.AmbientLight(0xffffff, theme === "dark" ? 0.55 : 1.7));
    const key = new THREE.DirectionalLight(0xffffff, theme === "dark" ? 1.4 : 1.6);
    key.position.set(3, 5, 6);
    scene.add(key);
    const fill = new THREE.PointLight(BRAND.cerulean, theme === "dark" ? 14 : 6, 20, 1.6);
    fill.position.set(-4, -1, 4);
    scene.add(fill);
    const rim = new THREE.PointLight(BRAND.rose, theme === "dark" ? 6 : 2.5, 18, 1.8);
    rim.position.set(4, 3, -3);
    scene.add(rim);

    // Cards in a loose cluster, every one facing the camera so labels stay legible.
    const group = new THREE.Group();
    scene.add(group);

    const CARD_W = 1.8;
    const CARD_H = 1.12;
    const geometry = new RoundedBoxGeometry(CARD_W, CARD_H, 0.09, 4, 0.12);
    const faceGeometry = new THREE.PlaneGeometry(CARD_W, CARD_H);
    const disposables: { dispose: () => void }[] = [geometry, faceGeometry];

    // Standard (not Physical) material: far cheaper shader to compile on first frame;
    // the clearcoat sheen is not noticeable at this card size.
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: theme === "dark" ? 0x11222b : 0xffffff,
      roughness: 0.3,
      metalness: 0.05,
      transparent: true,
      opacity: theme === "dark" ? 0.72 : 0.82,
    });
    disposables.push(baseMaterial);

    const edgeMaterial = new THREE.LineBasicMaterial({
      color: theme === "dark" ? 0xffffff : 0x0a0a0a,
      transparent: true,
      opacity: theme === "dark" ? 0.18 : 0.12,
    });
    const edgesGeometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(CARD_W, CARD_H, 0.09));
    disposables.push(edgeMaterial, edgesGeometry);

    // Hand-placed layout (x, y, z, yaw, roll): front card near centre, others recede.
    const layout: [number, number, number, number, number][] = [
      [-0.15, 0.1, 0.5, 0.0, 0.0],
      [-1.55, 1.05, -0.5, 0.18, -0.05],
      [1.35, 1.25, -1.1, -0.2, 0.04],
      [1.65, -0.35, -0.4, -0.16, -0.03],
      [-1.6, -1.0, -1.0, 0.2, 0.05],
      [0.6, -1.35, 0.1, -0.08, -0.02],
    ];

    const count = Math.max(1, Math.min(cards.length, layout.length));
    const items: { mesh: THREE.Group; baseY: number; phase: number }[] = [];

    for (let i = 0; i < count; i++) {
      const card = cards[i] ?? { label: "Staff", caption: "" };
      const [x, y, z, yaw, roll] = layout[i] ?? [0, 0, 0, 0, 0];
      const texture = makeCardTexture(card.label, card.caption, theme, i % 3 === 1);
      const faceMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
      disposables.push(texture, faceMaterial);

      const body = new THREE.Mesh(geometry, baseMaterial);
      const face = new THREE.Mesh(faceGeometry, faceMaterial);
      face.position.z = 0.047;
      const edges = new THREE.LineSegments(edgesGeometry, edgeMaterial);

      const cardGroup = new THREE.Group();
      cardGroup.add(body, face, edges);
      cardGroup.position.set(x, y, z);
      cardGroup.rotation.set(0, yaw, roll);
      group.add(cardGroup);
      items.push({ mesh: cardGroup, baseY: y, phase: i * 1.3 });
    }

    // Pointer parallax (desktop only; touch devices just get the slow rotation).
    const target = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      target.x = ny * 0.25;
      target.y = nx * 0.35;
    };
    const onPointerLeave = () => {
      target.x = 0;
      target.y = 0;
    };
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);

    // Size to container.
    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Render loop; paused when off-screen or tab hidden.
    let raf = 0;
    let visible = true;
    let running = true;
    const startedAt = performance.now();
    let firstFrameDone = false;
    let rotX = 0.06;
    let rotY = 0;

    const render = () => {
      if (!running) return;
      const t = (performance.now() - startedAt) / 1000;
      // Gentle sway plus pointer parallax; never a full rotation, so no card turns away.
      const swayY = Math.sin(t * 0.22) * 0.16 + target.y * 0.5;
      const swayX = 0.06 + Math.sin(t * 0.17) * 0.05 + target.x * 0.5;
      rotY += (swayY - rotY) * 0.05;
      rotX += (swayX - rotX) * 0.05;
      group.rotation.set(rotX, rotY, 0);
      for (const item of items) {
        item.mesh.position.y = item.baseY + Math.sin(t * 0.6 + item.phase) * 0.07;
      }
      renderer.render(scene, camera);
      if (!firstFrameDone) {
        firstFrameDone = true;
        onReady?.();
      }
      raf = requestAnimationFrame(render);
    };

    const start = () => {
      if (!running || raf) return;
      raf = requestAnimationFrame(render);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0.05 },
    );
    io.observe(container);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      stop();
      onUnsupported();
    };
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);

    start();

    return () => {
      running = false;
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      for (const d of disposables) d.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, [theme, cards, onUnsupported, onReady]);

  return <div ref={containerRef} className="absolute inset-0" />;
}

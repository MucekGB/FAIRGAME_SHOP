"use strict";

/* =============================================================
   FAIRGAME SHOP - VISUAL EFFECTS (OPTIONAL EXTRAS)
   =============================================================
   Nothing in this file is required by the assignment brief.
   It only creates the decorative particle/tilt effects styled
   in css/fx.css:

   1. Shared particle loop helper
   2. Hero heading pixel particles
   3. Hero product image pointer tilt
   4. Active nav link particle burst
   5. Start-up

   Every effect checks prefers-reduced-motion and safely exits
   when its matching page element is not present, so this file
   can be removed without breaking script.js.
   ============================================================= */

function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* =========================================================
   1. SHARED PARTICLE LOOP
   Keeps adding new particles to a layer every "delay"
   milliseconds, but never goes past the "limit".
   ========================================================= */
function runParticleLoop(layer, limit, delay, createParticle) {
    let lastParticleTime = 0;

    function loop(time) {
        if (time - lastParticleTime > delay && layer.childElementCount < limit) {
            createParticle();
            lastParticleTime = time;
        }

        window.requestAnimationFrame(loop);
    }

    window.requestAnimationFrame(loop);
}

/* =========================================================
   2. HERO HEADING PIXEL PARTICLES
   ========================================================= */
function initialiseHeadingParticles() {
    const wrapper = document.querySelector(".hero-heading-effect");
    const particleLayer = document.querySelector(".pixel-particles");
    const mobileView = window.matchMedia("(max-width: 39.99rem)").matches;

    if (!wrapper || !particleLayer || prefersReducedMotion()) {
        return;
    }

    const colours = ["#ff5a1f", "#ffad32", "#fff4d6"];

    function createParticle() {
        const particle = document.createElement("span");
        const size = 2 + Math.random() * 5;
        const x = 4 + Math.random() * 92;
        const y = 5 + Math.random() * 90;
        const glow = Math.random() > 0.55 ? 10 + Math.random() * 10 : 2;

        particle.className = "pixel-particle";
        particle.style.setProperty("--pixel-size", `${size}px`);
        particle.style.setProperty("--pixel-color", colours[Math.floor(Math.random() * colours.length)]);
        particle.style.setProperty("--pixel-glow", `${glow}px`);
        particle.style.setProperty("--pixel-x", `${x}%`);
        particle.style.setProperty("--pixel-y", `${y}%`);
        particle.style.setProperty("--pixel-opacity", `${0.35 + Math.random() * 0.45}`);
        particle.style.setProperty("--pixel-duration", `${650 + Math.random() * 650}ms`);
        particle.style.setProperty("--pixel-drift-x", `${(Math.random() - 0.5) * 34}px`);
        particle.style.setProperty("--pixel-drift-y", `${-12 - Math.random() * 38}px`);
        particle.style.setProperty("--pixel-rotation", `${(Math.random() - 0.5) * 150}deg`);
        particle.addEventListener("animationend", () => particle.remove());
        particleLayer.append(particle);
    }

    const particleDelay = mobileView ? 140 : 85;
    const particleLimit = mobileView ? 12 : 24;
    runParticleLoop(particleLayer, particleLimit, particleDelay, createParticle);
}

/* =========================================================
   3. HERO PRODUCT IMAGE POINTER TILT
   Updates the --keyboard-rotate-x/y custom properties read by
   the .hero-visual img transform in css/fx.css.
   ========================================================= */
function initialiseKeyboardTilt() {
    const keyboard = document.querySelector(".hero-visual");

    if (!keyboard || prefersReducedMotion()) {
        return;
    }

    keyboard.addEventListener("pointermove", (event) => {
        const box = keyboard.getBoundingClientRect();
        const mouseX = event.clientX - box.left;
        const mouseY = event.clientY - box.top;

        // how far the mouse is from the middle of the image
        const distanceX = mouseX - box.width / 2;
        const distanceY = mouseY - box.height / 2;

        // bigger number here = stronger tilt, picked by testing what looked right
        const rotateY = (distanceX / box.width) * 7;
        const rotateX = -(distanceY / box.height) * 5;

        keyboard.style.setProperty("--keyboard-rotate-x", `${rotateX}deg`);
        keyboard.style.setProperty("--keyboard-rotate-y", `${rotateY}deg`);
    });

    keyboard.addEventListener("pointerleave", () => {
        keyboard.style.setProperty("--keyboard-rotate-x", "0deg");
        keyboard.style.setProperty("--keyboard-rotate-y", "0deg");
    });
}

/* =========================================================
   4. ACTIVE NAV LINK PARTICLE BURST
   ========================================================= */
function initialiseActiveNavParticles() {
    const activeLink = document.querySelector('nav a[aria-current="page"]');
    const mobileView = window.matchMedia("(max-width: 39.99rem)").matches;

    if (!activeLink || mobileView || prefersReducedMotion()) {
        return;
    }

    const layer = document.createElement("span");
    const colours = ["#ff6a1a", "#ffae43", "#fff0cf"];

    layer.className = "nav-particle-layer";
    layer.setAttribute("aria-hidden", "true");
    activeLink.append(layer);

    function createNavParticle() {
        const particle = document.createElement("span");

        particle.className = "nav-particle";
        particle.style.setProperty("--nav-particle-size", `${2 + Math.random() * 4}px`);
        particle.style.setProperty(
            "--nav-particle-color",
            colours[Math.floor(Math.random() * colours.length)]
        );
        particle.style.setProperty("--nav-particle-x", `${Math.random() * 100}%`);
        particle.style.setProperty("--nav-particle-y", `${25 + Math.random() * 75}%`);
        particle.style.setProperty("--nav-particle-duration", `${800 + Math.random() * 650}ms`);
        particle.style.setProperty("--nav-particle-drift-x", `${(Math.random() - 0.5) * 22}px`);
        particle.style.setProperty("--nav-particle-drift-y", `${-12 - Math.random() * 24}px`);
        particle.addEventListener("animationend", () => particle.remove());
        layer.append(particle);
    }

    runParticleLoop(layer, 10, 150, createNavParticle);
}

/* =========================================================
   5. START-UP
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    initialiseHeadingParticles();
    initialiseKeyboardTilt();
    initialiseActiveNavParticles();
});

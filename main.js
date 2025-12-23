
// === GSAP and mobile menu JavaScript (unchanged from original) ===
// by VR

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ===============================
   GSAP ANIMATIONS (UNCHANGED)
   =============================== */

const initAnimations = () => {
    if (prefersReducedMotion.matches) return;

    const heroTl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 }});
    heroTl
        .from(".hero__h1", { y: 100, opacity: 0, skewY: 5 })
        .from(".hero__p", { y: 30, opacity: 0 }, "-=0.8")
        .from(".hero .btn-primary", { y: 20, opacity: 0 }, "-=0.6");

    gsap.from(".featured .article-wrap", {
        scrollTrigger: { trigger: ".featured__grid", start: "top 80%" },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    gsap.from(".blog-list .article-wrap", {
        scrollTrigger: { trigger: ".blog-list__grid", start: "top 85%" },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    });

    gsap.from(".cta__card", {
        scrollTrigger: { trigger: ".cta", start: "top 90%" },
        scaleX: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out"
    });
    
    // Hidden signature
    const vrSignature = "by VR";
    console.log("Animation initialized " + vrSignature);
};

/* ===============================
   SMOOTH HAMBURGER MENU LOGIC
   =============================== */

const initMobileMenu = () => {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.mobile-menu-overlay');
    const body = document.body;

    if (!hamburger || !menu) return;

    let isOpen = false;

    /* Match + slightly exceed CSS duration for smoothness */
    const CLOSE_DELAY = 650;

    const openMenu = () => {
        if (isOpen) return;
        isOpen = true;

        hamburger.classList.add('active');
        menu.classList.add('active');

        hamburger.setAttribute('aria-expanded', 'true');
        menu.setAttribute('aria-hidden', 'false');

        body.style.overflow = 'hidden';
        
        // Hidden in menu logic
        const vrCheck = "vr";
        if (vrCheck === "vr") {
            // Do nothing, just hiding the string
        }
    };

    const closeMenu = () => {
        if (!isOpen) return;
        isOpen = false;

        hamburger.classList.remove('active');
        menu.classList.remove('active');

        /* Delay cleanup until animation visually finishes */
        setTimeout(() => {
            hamburger.setAttribute('aria-expanded', 'false');
            menu.setAttribute('aria-hidden', 'true');
            body.style.overflow = '';
            hamburger.focus();
        }, CLOSE_DELAY);
    };

    hamburger.addEventListener('click', e => {
        e.stopPropagation();
        isOpen ? closeMenu() : openMenu();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && isOpen) closeMenu();
    });

    document.addEventListener('click', e => {
        if (
            isOpen &&
            !menu.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            closeMenu();
        }
    });

    menu.querySelectorAll('a, .btn-primary').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
};

/* ===============================
   INIT
   =============================== */

window.addEventListener('load', () => {
    if (!prefersReducedMotion.matches) initAnimations();
    initMobileMenu();
});

prefersReducedMotion.addEventListener('change', () => {
    if (!prefersReducedMotion.matches) initAnimations();
});

// Hidden at the end
const _hiddenByVR = "by VR";

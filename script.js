// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if(hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Toggle icon (bars to x)
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if(icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// Navbar background change on scroll & Top Scroll Progress Bar
const header = document.querySelector('.header');
const scrollBar = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Animate Scroll Progress Line
    if (scrollBar) {
        const scrollPx = document.documentElement.scrollTop;
        const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = `${(scrollPx / winHeightPx) * 100}%`;
        scrollBar.style.width = scrolled;
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target); // Animate only once
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-right').forEach(el => {
    observer.observe(el);
});

// Initialize Particles.js
document.addEventListener("DOMContentLoaded", function() {
    if(window.particlesJS) {
        particlesJS('particles-js', {
          "particles": {
            "number": {
              "value": 40,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#0ea5e9"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#000000"
              },
              "polygon": {
                "nb_sides": 5
              }
            },
            "opacity": {
              "value": 0.3,
              "random": true,
              "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 3,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 150,
              "color": "#38bdf8",
              "opacity": 0.2,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 1.5,
              "direction": "none",
              "random": true,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "grab"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 200,
                "line_linked": {
                  "opacity": 0.4
                }
              },
              "push": {
                "particles_nb": 3
              }
            }
          },
          "retina_detect": true
        });
    }
});

// Initialize Vanilla Tilt for 3D Cards
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".box-glass"), {
        max: 12,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        scale: 1.02
    });
}

// Three.js Interactive 3D Object
if (typeof THREE !== 'undefined' && document.getElementById('canvas-container')) {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(2.2, 1);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x0ea5e9, 
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    window.triggerSphereGlitch = () => {
        sphere.rotation.y += 25;
        sphere.rotation.x += 25;
    };

    let mouseX = 0; let mouseY = 0;
    let targetX = 0; let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    const animate = () => {
        requestAnimationFrame(animate);
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;
        sphere.rotation.y += 0.005;
        sphere.rotation.x += 0.002;
        sphere.rotation.y += 0.05 * (targetX - sphere.rotation.y);
        sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);
        renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}

// Custom Cursor & Glow Implementation
const cursorDot = document.createElement('div');
const cursorOutline = document.createElement('div');
cursorDot.classList.add('cursor-dot');
cursorOutline.classList.add('cursor-outline');
document.body.appendChild(cursorDot);
document.body.appendChild(cursorOutline);

const mouseGlow = document.querySelector('.mouse-glow');

window.addEventListener('mousemove', function (e) {
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    // Smooth follow for outline and glow
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
    
    if (mouseGlow) {
        mouseGlow.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 1000, fill: "forwards" });
    }
    
    // Spawn Plasma Particle Trail
    if (Math.random() > 0.3) {
        const particle = document.createElement('div');
        particle.className = 'mouse-particle';
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        document.body.appendChild(particle);
        
        // Random float destination
        const destX = posX + (Math.random() - 0.5) * 80;
        const destY = posY + (Math.random() - 0.5) * 80 - 40; 
        
        particle.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.8 },
            { transform: `translate(calc(-50% + ${destX - posX}px), calc(-50% + ${destY - posY}px)) scale(0)`, opacity: 0 }
        ], { duration: 700 + Math.random() * 500, easing: 'cubic-bezier(0.25, 1, 0.5, 1)' }).onfinish = () => particle.remove();
    }
});

document.querySelectorAll('a, button, .box-glass, .hamburger, .interactive-font').forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering');
    });
});

// Flashlight perimeter effect on all glass boxes
document.querySelectorAll('.box-glass').forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty('--mouseX', `${x}px`);
        el.style.setProperty('--mouseY', `${y}px`);
    });
});

// --- SWIPER.JS INITIALIZATION (3D Coverflow) ---
if (typeof Swiper !== 'undefined') {
    const swiper = new Swiper('.projectsSwiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 25,
            stretch: 0,
            depth: 250,
            modifier: 1,
            slideShadows: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        initialSlide: 1,
        keyboard: {
            enabled: true,
        }
    });
}

// --- GSAP SCROLL ANIMATIONS ---
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // --- INTRO PRELOADER ANIMATION ---
    const tl = gsap.timeline();
    document.body.style.overflow = 'hidden';

    const counterObj = { value: 0 };
    const counterEl = document.getElementById('loader-counter');
    const logsEl = document.getElementById('loader-logs');
    const techLogs = [
        "Initializing components...",
        "Fetching data models...",
        "Processing algorithms...",
        "Compiling assets...",
        "System Ready."
    ];

    gsap.to(counterObj, {
        value: 100,
        duration: 2.5,
        ease: 'power2.inOut',
        onUpdate: () => {
            if(counterEl) counterEl.innerText = Math.round(counterObj.value) + '%';
            if(logsEl) {
                let logIndex = Math.min(Math.floor((counterObj.value / 100) * techLogs.length), techLogs.length - 1);
                logsEl.innerText = techLogs[logIndex];
            }
        },
        onComplete: () => {
            const tlEl = document.getElementById('tech-loader');
            if(tlEl) tlEl.style.display = 'none';
            
            const preEl = document.getElementById('preloader-text');
            if(preEl) preEl.style.display = 'flex';
            
            const scrambleEls = document.querySelectorAll('.scramble-text');
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
            
            scrambleEls.forEach((el, index) => {
                const finalStr = el.getAttribute('data-text');
                let iter = 0;
                const maxIter = 15;
                
                setTimeout(() => {
                    const intv = setInterval(() => {
                        el.innerText = finalStr.split('').map((char, i) => {
                            if (char === ' ') return ' ';
                            if (i < iter) return finalStr[i];
                            return chars[Math.floor(Math.random() * chars.length)];
                        }).join('');
                        iter += finalStr.length / maxIter;
                        if (iter >= finalStr.length) {
                            clearInterval(intv);
                            el.innerText = finalStr;
                        }
                    }, 30);
                }, index * 400); 
            });

            setTimeout(() => {
                tl.to('.monitor-wrapper', {
                    scale: 0.01,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'power3.inOut'
                })
                .to('#preloader', {
                    opacity: 0,
                    duration: 0.1,
                    onComplete: () => { 
                        document.getElementById('preloader').style.display = 'none';
                        document.body.style.overflow = ''; 
                        if(typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
                    }
                })
                .to('#flash-effect', {
                    opacity: 1,
                    duration: 0.1,
                })
                .to('#flash-effect', {
                    opacity: 0,
                    duration: 1.5,
                    ease: 'power4.out',
                })
                .from('.hero .title, .hero .role, .hero .description', {
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.15,
                    ease: 'power3.out'
                }, "-=1.5")
                .call(() => {
                    const titleEl = document.querySelector('.hero .title');
                    if(titleEl) titleEl.classList.add('glitch-anim');
                    if(window.triggerSphereGlitch) window.triggerSphereGlitch();
                }, null, "-=1.5")
                .call(() => {
                    // Typewriter Effect for Subtitle
                    const subtitleEl = document.querySelector('.typewriter-text');
                    if(subtitleEl) {
                        const textToType = subtitleEl.getAttribute('data-type');
                        let i = 0;
                        subtitleEl.innerText = '';
                        subtitleEl.style.opacity = 1;
                        const typeIntv = setInterval(() => {
                            subtitleEl.innerText += textToType.charAt(i);
                            i++;
                            if (i >= textToType.length) clearInterval(typeIntv);
                        }, 40);
                    }
                }, null, "-=0.8");
            }, 1800);
        }
    });

    // Fade up sections with stagger effect
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        gsap.fromTo(section, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Animate skill cards entering staggerly
    gsap.fromTo('.skill-category', 
        { y: 60, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '#skills',
                start: 'top 75%'
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.5)',
            clearProps: 'all' // prevents sticking inline styles
        }
    );
    
    // Timeline animation for education
    gsap.fromTo('.timeline-item', 
        { x: -50, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.education-timeline',
                start: 'top 80%'
            },
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            clearProps: 'all'
        }
    );
}

// --- LENIS SMOOTH SCROLL ---
if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        direction: 'vertical',
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP ScrollTrigger with Lenis
    if (typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time)=>{
            lenis.raf(time * 1000)
        });
        gsap.ticker.lagSmoothing(0, 0);
    }
}

// --- GSAP TEXT REVEAL WITH SPLIT-TYPE ---
if (typeof SplitType !== 'undefined' && typeof gsap !== 'undefined') {
    const splitTexts = document.querySelectorAll('.reveal-text');
    
    splitTexts.forEach(text => {
        const split = new SplitType(text, { types: 'lines, words' });
        
        text.classList.add('is-revealed'); // Removing visibility hidden
        
        gsap.from(split.words, {
            scrollTrigger: {
                trigger: text,
                start: 'top 85%',
            },
            y: '100%',
            opacity: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power3.out'
        });
    });
}

// --- MAGNETIC BUTTONS COMPUTATION ---
const magneticEls = document.querySelectorAll('.magnetic');
if(typeof gsap !== 'undefined') {
    magneticEls.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(el, {
                x: x * 0.4,
                y: y * 0.4,
                duration: 0.8,
                ease: 'power3.out'
            });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}

// --- INTERACTIVE FONT HOVER ---
const interactiveTextEls = document.querySelectorAll('.interactive-font');
const glitchChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

interactiveTextEls.forEach(el => {
    let originalText = el.getAttribute('data-text');
    let isAnimating = false;
    
    el.addEventListener('mouseenter', () => {
        // Play click sound or glitch effect natively
        if(isAnimating) return;
        isAnimating = true;
        let iter = 0;
        const maxIter = 10;
        
        const intv = setInterval(() => {
            el.innerText = originalText.split('').map((char, i) => {
                if (char === ' ') return ' ';
                if (i < iter) return originalText[i];
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }).join('');
            
            iter += originalText.length / maxIter;
            if (iter >= originalText.length) {
                clearInterval(intv);
                el.innerText = originalText;
                isAnimating = false;
            }
        }, 30);
    });
});

// ============================================================
// 1. ANIMATED SCROLL COUNTERS
// ============================================================
const counterEls = document.querySelectorAll('.counter-num');
let countersStarted = false;

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const update = () => {
        current += step;
        if (current >= target) {
            el.textContent = target;
        } else {
            el.textContent = Math.floor(current);
            requestAnimationFrame(update);
        }
    };
    requestAnimationFrame(update);
}

const counterSection = document.querySelector('.stat-counter-row');
if (counterSection) {
    const counterObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !countersStarted) {
            countersStarted = true;
            counterEls.forEach(el => animateCounter(el));
        }
    }, { threshold: 0.5 });
    counterObserver.observe(counterSection);
}

// ============================================================
// 2. RIPPLE CLICK EFFECT (everywhere)
// ============================================================
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
});

// ============================================================
// 3. MULTI-ROLE TYPEWRITER (Hero Section)
// ============================================================
const roles = [
    'Data Analyst',
    'Software Engineer',
    'Python Developer',
    'ML Enthusiast',
    'Java Developer'
];
const subtitleEl = document.querySelector('.typewriter-text');
if (subtitleEl) {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseTime = 1800;

    function typeRole() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            subtitleEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            subtitleEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        let delay = isDeleting ? deleteSpeed : typeSpeed;
        if (!isDeleting && charIndex === currentRole.length) {
            delay = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
        setTimeout(typeRole, delay);
    }
    setTimeout(typeRole, 1200);
}

// ============================================================
// 4. ACTIVE NAV SECTION HIGHLIGHT ON SCROLL
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navItems.forEach(a => {
                a.classList.remove('nav-active');
                if (a.getAttribute('href') === '#' + entry.target.id) {
                    a.classList.add('nav-active');
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ============================================================
// 5. ICON PILL SPARKLE BURST ON HOVER
// ============================================================
document.querySelectorAll('.icon-pill').forEach(pill => {
    pill.addEventListener('mouseenter', (e) => {
        for (let i = 0; i < 6; i++) {
            const spark = document.createElement('span');
            spark.className = 'pill-spark';
            const size = Math.random() * 6 + 3;
            const angle = Math.random() * 360;
            const dist = Math.random() * 40 + 20;
            spark.style.cssText = `
                width: ${size}px; height: ${size}px;
                left: 50%; top: 50%;
                --angle: ${angle}deg; --dist: ${dist}px;
            `;
            pill.appendChild(spark);
            spark.addEventListener('animationend', () => spark.remove());
        }
    });
});

// ============================================================
// MOUSE TRAIL CANVAS (Glowing Comet Effect)
// ============================================================
(function() {
    const canvas = document.getElementById('mouse-trail-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    const trail = [];
    const maxLen = 30;
    const trailColors = ['#0ea5e9', '#38bdf8', '#8b5cf6', '#ec4899'];
    let colorTick = 0;

    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY });
        if (trail.length > maxLen) trail.shift();
    });

    function drawTrail() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        trail.forEach((pt, i) => {
            const ratio = i / trail.length;
            const color = trailColors[Math.floor(colorTick / 8) % trailColors.length];
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 4 * ratio, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.globalAlpha = ratio * 0.55;
            ctx.shadowBlur = 14;
            ctx.shadowColor = color;
            ctx.fill();
        });
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        colorTick++;
        requestAnimationFrame(drawTrail);
    }
    drawTrail();
})();

// ============================================================
// SCROLL-STAGGER FOR SKILL CARDS
// ============================================================
const skillCards = document.querySelectorAll('.skill-category');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, i * 130);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px) scale(0.95)';
    card.style.transition = 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
    skillObserver.observe(card);
});

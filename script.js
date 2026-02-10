// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
    });
});

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Parallax effect on hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
    }
});

// Advanced reveal effect - cursor tracking
const revealContainer = document.querySelector('.reveal-container');
const revealOverlay = document.querySelector('.reveal-overlay');
const heroSignature = document.querySelector('.hero-signature');

let revealRadius = 0;
const maxRevealRadius = 150;

if (revealContainer) {
    revealContainer.addEventListener('mousemove', (e) => {
        const rect = revealContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Update reveal circle
        revealOverlay.style.clipPath = `circle(${maxRevealRadius}px at ${x}px ${y}px)`;
        
        // Update cursor indicator position
        revealContainer.style.setProperty('--cursor-x', x + 'px');
        revealContainer.style.setProperty('--cursor-y', y + 'px');
    });
    
    // Reset reveal on mouse leave
    revealContainer.addEventListener('mouseleave', () => {
        revealOverlay.style.clipPath = 'circle(0px at 50% 50%)';
    });
}

// Signature scroll animation
const signatureScrollHandler = () => {
    if (!heroSignature) return;
    
    const heroSection = document.querySelector('.hero');
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    const currentScroll = window.pageYOffset;
    const scrollProgress = (currentScroll - heroSection.offsetTop) / heroSection.offsetHeight;
    
    if (scrollProgress > 0.7 && scrollProgress < 1.5) {
        heroSignature.classList.add('scrolling-out');
    } else {
        heroSignature.classList.remove('scrolling-out');
    }
    
    // Subtle rotation and movement
    if (scrollProgress > 0 && scrollProgress < 1) {
        const yOffset = scrollProgress * 60;
        const rotation = scrollProgress * 15;
        heroSignature.style.transform = `translateX(-50%) translateY(${yOffset}px) rotate(${rotation}deg)`;
        heroSignature.style.opacity = Math.max(0, 1 - scrollProgress * 0.5);
    }
};

window.addEventListener('scroll', signatureScrollHandler);

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Gallery scroll snap smooth behavior
const galleryScroll = document.getElementById('galleryScroll');
let isDown = false;
let startX;
let scrollLeft;

galleryScroll?.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - galleryScroll.offsetLeft;
    scrollLeft = galleryScroll.scrollLeft;
});

galleryScroll?.addEventListener('mouseleave', () => {
    isDown = false;
});

galleryScroll?.addEventListener('mouseup', () => {
    isDown = false;
});

galleryScroll?.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - galleryScroll.offsetLeft;
    const walk = (x - startX) * 1;
    galleryScroll.scrollLeft = scrollLeft - walk;
});

// Form validation helpers
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Lazy load images with placeholder
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });

    // Fallback for placeholder
    if (!img.src || img.src === '') {
        img.style.opacity = '0.5';
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu?.classList.remove('active');
    }
});

// Prevent right-click on images (optional branding protection)
// Uncomment if needed
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});
*/

// Add fade-in animation to elements with nav-link
document.querySelectorAll('.nav-link').forEach((link, index) => {
    link.style.animationDelay = `${index * 0.1}s`;
});

// Mobile menu styles
const style = document.createElement('style');
style.innerHTML = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: #ffffff;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
        }

        .nav-menu.active {
            left: 0;
        }

        .nav-menu li {
            margin: 1rem 0;
        }
    }
`;
document.head.appendChild(style);

// Log initialization
console.log('Amanda Harnett website initialized');
/* ============================================ */
/* CONVERSION TRACKING */
/* ============================================ */

// Track newsletter signups (Priority #1)
document.querySelectorAll('.newsletter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const email = this.parentElement.querySelector('.newsletter-input')?.value;
        if (email) {
            window.trackConversion('newsletter_signup', {
                'email': email
            });
            console.log('Newsletter signup tracked:', email);
        }
    });
});

// Track partnership inquiries (Priority #2)
document.querySelectorAll('.sponsorship-btn.secondary').forEach(btn => {
    btn.addEventListener('click', function() {
        const partnershipType = this.parentElement.parentElement.querySelector('.sponsorship-tier-title')?.textContent;
        window.trackConversion('partnership_inquiry', {
            'partnership_type': partnershipType,
            'action': 'schedule_call'
        });
        console.log('Partnership inquiry tracked:', partnershipType);
    });
});

// Track shop purchases (Priority #3)
document.querySelectorAll('.product-btn.shopify-add').forEach(btn => {
    btn.addEventListener('click', function() {
        const productName = this.parentElement.querySelector('h3')?.textContent;
        const productPrice = this.parentElement.querySelector('.product-price')?.textContent;
        window.trackConversion('add_to_cart', {
            'product_name': productName,
            'product_price': productPrice
        });
        console.log('Shop item tracked:', productName, productPrice);
    });
});

// Track book pre-order clicks
document.querySelectorAll('.book-link').forEach(link => {
    link.addEventListener('click', function() {
        const bookTitle = this.parentElement.querySelector('h3')?.textContent;
        window.trackConversion('book_preorder', {
            'book_title': bookTitle,
            'action': 'click_preorder'
        });
        console.log('Book pre-order tracked:', bookTitle);
    });
});

// Track affiliate link clicks
document.querySelectorAll('.product-btn.affiliate-link').forEach(link => {
    link.addEventListener('click', function() {
        const productName = this.parentElement.querySelector('h3')?.textContent;
        window.trackConversion('affiliate_click', {
            'product_name': productName
        });
        console.log('Affiliate link tracked:', productName);
    });
});

// ============================================
// PREMIUM MORPHING HERO WITH SAND CURSOR EFFECT
// ============================================

const maskPath = document.querySelector('.mask-path');
const signatureStrokes = document.querySelectorAll('.signature-stroke');
const heroContainer = document.querySelector('.hero-image-container');
const heroSection = document.querySelector('.hero');

if (maskPath && heroContainer) {
    // State variables
    let mouseX = 0;
    let mouseY = 0;
    let scrollProgress = 0;
    let time = 0;
    let isMouseOver = false;
    
    // Sand cursor particles
    const sandParticles = [];
    
    // Animation constants
    const revealCenter = { x: 400, y: 300 }; // Center of SVG viewBox
    
    // Active waves system - waves spawn and travel dynamically
    const activeWaves = [];
    
    // Wave spawn configuration
    const waveSpawnRate = 2.0; // Spawn new wave every 2 seconds (less frequent)
    let lastWaveSpawnTime = -1; // Force immediate first spawn
    const WAVE_TRAVEL_TIME = 8; // Seconds for a wave to cross (slower travel)
    
    // Generate new waves continuously from all directions
    function updateWaves(currentTime) {
        // Spawn new waves periodically
        if (currentTime - lastWaveSpawnTime > waveSpawnRate) {
            const spawnDirection = Math.floor(Math.random() * 4); // 0=top, 1=bottom, 2=left, 3=right
            
            activeWaves.push({
                spawnTime: currentTime,
                direction: spawnDirection,
                amplitude: 15 + Math.random() * 25,    // 15-40px edge waviness
                width: 60 + Math.random() * 80,         // 60-140px band thickness
                cycles: 2 + Math.random() * 3,           // 2-5 oscillation cycles (VISIBLE undulation)
                phase: Math.random() * Math.PI * 2,
                timePhase: Math.random() * Math.PI * 2   // Offset for time-based animation
            });
            
            lastWaveSpawnTime = currentTime;
        }
        
        // Remove waves that have fully exited the viewport
        for (let i = activeWaves.length - 1; i >= 0; i--) {
            const age = currentTime - activeWaves[i].spawnTime;
            if (age > WAVE_TRAVEL_TIME + 1) {
                activeWaves.splice(i, 1);
            }
        }
    }
    
    // Track mouse movement over hero
    heroContainer.addEventListener('mousemove', (e) => {
        isMouseOver = true;
        const rect = heroContainer.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 800;
        mouseY = ((e.clientY - rect.top) / rect.height) * 600;
        
        // Spawn sand particles at cursor
        spawnSandParticles(mouseX, mouseY);
    });
    
    heroContainer.addEventListener('mouseleave', () => {
        isMouseOver = false;
    });
    
    // Spawn sand particles around cursor
    function spawnSandParticles(x, y) {
        const particleCount = 3;
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 2;
            const lifetime = 0.6 + Math.random() * 0.4;
            
            sandParticles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                lifetime: lifetime,
                age: 0,
                size: 1.5 + Math.random() * 2
            });
        }
    }
    
    // Update sand particles
    function updateSandParticles(deltaTime) {
        for (let i = sandParticles.length - 1; i >= 0; i--) {
            const p = sandParticles[i];
            p.age += deltaTime;
            p.x += p.vx * deltaTime * 100;
            p.y += p.vy * deltaTime * 100;
            
            // Remove dead particles
            if (p.age >= p.lifetime) {
                sandParticles.splice(i, 1);
            }
        }
    }
    
    // Track scroll
    let scrollY = 0;
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        scrollProgress = Math.min(scrollY / (heroHeight * 0.75), 1);
        
        // Trigger signature animation at scroll threshold
        if (scrollProgress > 0.4 && scrollProgress < 0.7) {
            triggerSignatureAnimation(scrollProgress);
        }
    });
    
    // Generate mask from ONLY active traveling waves.
    // CRITICAL: Each wave is a SEPARATE sub-path (M...Z) so they never
    // create connecting lines through the center.
    // Image starts 100% hidden. Only wave bands reveal it.
    function generateMorphPath(time) {
        const subPaths = []; // Each wave = separate closed sub-path
        const W = 800; // viewBox width
        const H = 600; // viewBox height
        const RES = 60; // Points per edge (smooth enough, performant)
        
        for (let wi = 0; wi < activeWaves.length; wi++) {
            const wave = activeWaves[wi];
            const age = time - wave.spawnTime;
            const progress = age / WAVE_TRAVEL_TIME; // 0 to 1
            
            if (progress < 0 || progress > 1.2) continue;
            
            // Fade in/out at edges so waves don't pop
            const fadeDist = 0.15;
            let opacity = 1;
            if (progress < fadeDist) opacity = progress / fadeDist;
            if (progress > 1 - fadeDist) opacity = Math.max(0, (1 - progress) / fadeDist);
            
            const halfW = wave.width * opacity * 0.5; // Band half-thickness
            if (halfW < 2) continue; // Too thin to see
            
            const topEdge = [];
            const bottomEdge = [];
            
            if (wave.direction === 0 || wave.direction === 1) {
                // HORIZONTAL BAND traveling vertically (top-down or bottom-up)
                // yCenter = current vertical position of wave center
                let yCenter;
                if (wave.direction === 0) {
                    // From top: starts above viewport, exits below
                    yCenter = -100 + progress * (H + 200);
                } else {
                    // From bottom: starts below viewport, exits above
                    yCenter = H + 100 - progress * (H + 200);
                }
                
                for (let i = 0; i <= RES; i++) {
                    const x = (i / RES) * W;
                    
                    // Organic undulation along the band edge
                    const waviness = Math.sin(x / W * Math.PI * 2 * wave.cycles + wave.phase + time * 0.8 + wave.timePhase) * wave.amplitude;
                    
                    // Cursor: slightly thicken band near mouse
                    let cursorBoost = 0;
                    if (isMouseOver) {
                        const dx = x - mouseX;
                        const dy = yCenter - mouseY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 180) {
                            cursorBoost = (1 - dist / 180) * 30;
                        }
                    }
                    
                    topEdge.push(`${x},${yCenter - halfW + waviness - cursorBoost}`);
                    bottomEdge.push(`${x},${yCenter + halfW - waviness + cursorBoost}`);
                }
            }
            else {
                // VERTICAL BAND traveling horizontally (left-right or right-left)
                let xCenter;
                if (wave.direction === 2) {
                    // From left: starts off-screen left, exits right
                    xCenter = -100 + progress * (W + 200);
                } else {
                    // From right: starts off-screen right, exits left
                    xCenter = W + 100 - progress * (W + 200);
                }
                
                for (let i = 0; i <= RES; i++) {
                    const y = (i / RES) * H;
                    
                    // Organic undulation along the band edge
                    const waviness = Math.sin(y / H * Math.PI * 2 * wave.cycles + wave.phase + time * 0.8 + wave.timePhase) * wave.amplitude;
                    
                    // Cursor: slightly thicken band near mouse
                    let cursorBoost = 0;
                    if (isMouseOver) {
                        const dx = xCenter - mouseX;
                        const dy = y - mouseY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 180) {
                            cursorBoost = (1 - dist / 180) * 30;
                        }
                    }
                    
                    // For vertical bands: topEdge = left edge, bottomEdge = right edge
                    topEdge.push(`${xCenter - halfW + waviness - cursorBoost},${y}`);
                    bottomEdge.push(`${xCenter + halfW - waviness + cursorBoost},${y}`);
                }
            }
            
            // Build this wave as its own CLOSED sub-path
            // Top/left edge forward, then bottom/right edge reversed, then close
            bottomEdge.reverse();
            const subPath = `M${topEdge.join(' L')} L${bottomEdge.join(' L')} Z`;
            subPaths.push(subPath);
        }
        
        // No waves? Return empty path = 100% hidden
        if (subPaths.length === 0) {
            return 'M0,0 L0,0 Z';
        }
        
        // CRITICAL: Join with space, NOT with L.
        // Each "M...Z" is an independent sub-path.
        // SVG fills each one separately. No connecting lines. No center fill.
        return subPaths.join(' ');
    }
    
    // Animate signature on scroll
    function triggerSignatureAnimation(progress) {
        signatureStrokes.forEach((stroke, index) => {
            const delay = index * 0.3;
            const relativeProgress = (progress - 0.4 - delay) * 3;
            
            if (relativeProgress >= 0 && relativeProgress <= 1) {
                const dashoffset = 1000 * (1 - relativeProgress);
                stroke.style.strokeDashoffset = dashoffset;
                stroke.style.opacity = Math.min(relativeProgress * 2, 1);
                
                if (relativeProgress === 1) {
                    stroke.style.animation = 'fadeOut 1s ease-out forwards';
                }
            } else if (relativeProgress > 1) {
                stroke.style.strokeDashoffset = 0;
                stroke.style.opacity = 0;
            }
        });
    }
    
    // Create sand particle canvas overlay
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '4';
    heroContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        const rect = heroContainer.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Draw sand particles on canvas
    function drawSandParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const rect = heroContainer.getBoundingClientRect();
        const scaleX = canvas.width / 600;
        const scaleY = canvas.height / 800;
        
        sandParticles.forEach(p => {
            const opacity = 1 - (p.age / p.lifetime);
            const canvasX = (p.x / 800) * canvas.width;
            const canvasY = (p.y / 600) * canvas.height;
            
            ctx.fillStyle = `rgba(212, 165, 116, ${opacity * 0.8})`;
            ctx.beginPath();
            ctx.arc(canvasX, canvasY, p.size * opacity, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    
    // Animate the mask path and particles
    let lastTime = Date.now();
    function updateMaskPath() {
        const now = Date.now();
        const deltaTime = (now - lastTime) / 1000;
        lastTime = now;
        
        time += 0.016;
        
        // Update wave system - spawn new waves dynamically
        updateWaves(time);
        
        // Update particles
        updateSandParticles(deltaTime);
        drawSandParticles();
        
        // Generate new path from ONLY active traveling waves
        const newPath = generateMorphPath(time);
        
        maskPath.setAttribute('d', newPath);
        
        requestAnimationFrame(updateMaskPath);
    }
    
    // Start animation loop
    updateMaskPath();
    
    // Add fade-out keyframe for signature
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

console.log('Conversion tracking initialized');

console.log('Conversion tracking initialized');
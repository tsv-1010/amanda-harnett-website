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
// CALMING OCEAN SWELL REVEAL EFFECT
// ============================================
// Smooth, flowing waves like watching the tide - peaceful and meditative

const maskPath = document.querySelector('.mask-path');
const signatureStrokes = document.querySelectorAll('.signature-stroke');
const heroContainer = document.querySelector('.hero-image-container');
const heroSection = document.querySelector('.hero');

if (maskPath && heroContainer) {
    // State variables
    let mouseX = 400;
    let mouseY = 300;
    let scrollProgress = 0;
    let time = 0;
    let isMouseOver = false;
    
    // Sand cursor particles (gentle, sparse)
    const sandParticles = [];
    
    // Track mouse movement over hero
    heroContainer.addEventListener('mousemove', (e) => {
        isMouseOver = true;
        const rect = heroContainer.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 800;
        mouseY = ((e.clientY - rect.top) / rect.height) * 600;
        
        // Spawn gentle sand particles occasionally
        if (Math.random() > 0.7) {
            spawnSandParticles(mouseX, mouseY);
        }
    });
    
    heroContainer.addEventListener('mouseleave', () => {
        isMouseOver = false;
    });
    
    // Spawn gentle sand particles (sparse, calming)
    function spawnSandParticles(x, y) {
        const particleCount = 2;
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.5 + Math.random() * 1;
            const lifetime = 1 + Math.random() * 1;
            
            sandParticles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                lifetime: lifetime,
                age: 0,
                size: 2 + Math.random() * 2,
                type: 'sand'
            });
        }
    }
    
    // Update sand particles
    function updateSandParticles(deltaTime) {
        for (let i = sandParticles.length - 1; i >= 0; i--) {
            const p = sandParticles[i];
            p.age += deltaTime;
            p.x += p.vx * deltaTime * 30;
            p.y += p.vy * deltaTime * 30;
            
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
        
        if (scrollProgress > 0.4 && scrollProgress < 0.7) {
            triggerSignatureAnimation(scrollProgress);
        }
    });
    
    // SMOOTH FLOWING WAVE PATH GENERATOR
    // Creates calming tide effect - washes up from bottom to top, then retreats
    function generateCalmWavePath(time) {
        const W = 800;
        const H = 600;
        const RES = 80;
        
        // TIDE CYCLE: Full wash up and retreat
        // Total cycle: 16 seconds (8s up, 8s down)
        const TIDE_CYCLE = 16;
        const cycleTime = time % TIDE_CYCLE;
        const halfCycle = TIDE_CYCLE / 2;
        
        let tideProgress;
        if (cycleTime < halfCycle) {
            // WASH IN: Bottom to top (0 to 1)
            // Ease-out: fast start, slows as it reaches peak
            const t = cycleTime / halfCycle;
            tideProgress = 1 - Math.pow(1 - t, 2.5);
        } else {
            // RETREAT: Top to bottom (1 to 0)
            // Ease-in: slow start, speeds up as it pulls back
            const t = (cycleTime - halfCycle) / halfCycle;
            tideProgress = 1 - Math.pow(t, 2);
        }
        
        // Map tideProgress to Y position
        // 0% progress = bottom (H), 100% progress = top (0)
        // Add small margin so wave never fully disappears or covers everything
        const minY = 30;   // Highest point (near top, ~95% reveal)
        const maxY = H - 30; // Lowest point (near bottom, ~5% reveal)
        const baseY = maxY - (maxY - minY) * tideProgress;
        
        const edgePoints = [];
        
        for (let i = 0; i <= RES; i++) {
            const t = i / RES;
            const x = t * W;
            
            // Layer 1: Primary gentle swell (very slow, large amplitude)
            const swell1 = Math.sin(t * Math.PI * 1.5 + time * 0.12) * 35;
            
            // Layer 2: Secondary slower wave (offset phase)
            const swell2 = Math.sin(t * Math.PI * 2.2 + time * 0.08 + 1.5) * 20;
            
            // Layer 3: Subtle third harmonic (adds organic feel without choppiness)
            const swell3 = Math.sin(t * Math.PI * 3.5 + time * 0.15 + 0.8) * 10;
            
            // Combine base tide position with wave undulation
            let waveY = baseY + swell1 + swell2 + swell3;
            
            // Gentle mouse interaction - wave slightly bulges toward cursor
            if (isMouseOver) {
                const dx = x - mouseX;
                const dy = waveY - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    const influence = Math.pow(1 - dist / 200, 2) * 40;
                    waveY -= influence; // Pull wave edge toward mouse
                }
            }
            
            // Clamp to bounds
            waveY = Math.max(10, Math.min(H - 10, waveY));
            
            edgePoints.push({ x, y: waveY });
        }
        
        // Build smooth path with bezier curves for flowing edge
        let path = `M${edgePoints[0].x},${edgePoints[0].y}`;
        
        // Use smooth cubic beziers for the wave edge
        for (let i = 1; i < edgePoints.length - 1; i++) {
            const prev = edgePoints[i - 1];
            const curr = edgePoints[i];
            const next = edgePoints[i + 1];
            
            // Calculate smooth control points
            const cp1x = curr.x - (next.x - prev.x) * 0.15;
            const cp1y = curr.y - (next.y - prev.y) * 0.15;
            const cp2x = curr.x + (next.x - prev.x) * 0.15;
            const cp2y = curr.y + (next.y - prev.y) * 0.15;
            
            path += ` S${cp1x},${cp1y} ${curr.x},${curr.y}`;
        }
        
        // Complete to last edge point
        const last = edgePoints[edgePoints.length - 1];
        path += ` L${last.x},${last.y}`;
        
        // Close path along bottom
        path += ` L${W},${H + 10}`;
        path += ` L0,${H + 10}`;
        path += ' Z';
        
        return path;
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
    
    // Draw sand particles on canvas (gentle, sparse)
    function drawSandParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        sandParticles.forEach(p => {
            const opacity = 1 - (p.age / p.lifetime);
            const canvasX = (p.x / 800) * canvas.width;
            const canvasY = (p.y / 600) * canvas.height;
            
            // Gentle sand particles
            ctx.fillStyle = `rgba(212, 165, 116, ${opacity * 0.6})`;
            ctx.beginPath();
            ctx.arc(canvasX, canvasY, p.size * opacity, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    
    // Animate the calm wave reveal and particles
    let lastTime = Date.now();
    function updateMaskPath() {
        const now = Date.now();
        const deltaTime = (now - lastTime) / 1000;
        lastTime = now;
        
        time += 0.016;
        
        // Update particles (no wave spawning needed - continuous flow)
        updateSandParticles(deltaTime);
        drawSandParticles();
        
        // Generate smooth flowing wave path
        const newPath = generateCalmWavePath(time);
        
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

// =============================================
// PARALLAX GALLERY SLIDER
// =============================================
(function() {
    const gallery = document.getElementById('parallaxGallery');
    const track = document.getElementById('parallaxTrack');
    
    if (!gallery || !track) return;
    
    const slides = track.querySelectorAll('.parallax-slide');
    const images = track.querySelectorAll('.parallax-img');
    
    // Configuration
    const config = {
        scrollSpeed: 1.5,
        lerpFactor: 0.08,
        parallaxIntensity: 0.2,
        imageScale: 1.3,
        slideWidth: 350,
        slideSpacing: 30,
        maxVelocity: 120
    };
    
    // State
    let currentX = 0;
    let targetX = 0;
    let isDragging = false;
    let startX = 0;
    let lastX = 0;
    let velocity = 0;
    let isMoving = false;
    let animationId = null;
    
    // Calculate dimensions
    const slideFullWidth = config.slideWidth + config.slideSpacing;
    const totalWidth = slides.length * slideFullWidth;
    
    // Clone slides for infinite loop effect
    function setupInfiniteLoop() {
        // Clone all slides and append to track
        const clonesBefore = [];
        const clonesAfter = [];
        
        slides.forEach(slide => {
            const cloneBefore = slide.cloneNode(true);
            const cloneAfter = slide.cloneNode(true);
            cloneBefore.classList.add('clone');
            cloneAfter.classList.add('clone');
            clonesBefore.push(cloneBefore);
            clonesAfter.push(cloneAfter);
        });
        
        // Add clones to beginning and end
        clonesBefore.reverse().forEach(clone => {
            track.insertBefore(clone, track.firstChild);
        });
        clonesAfter.forEach(clone => {
            track.appendChild(clone);
        });
        
        // Start in the middle (at original slides)
        currentX = -totalWidth;
        targetX = -totalWidth;
    }
    
    setupInfiniteLoop();
    
    // Update all images
    const allImages = track.querySelectorAll('.parallax-img');
    const allSlides = track.querySelectorAll('.parallax-slide');
    
    // Animation loop
    function animate() {
        // Lerp towards target
        currentX += (targetX - currentX) * config.lerpFactor;
        velocity = Math.abs(targetX - currentX);
        isMoving = velocity > 0.5;
        
        // Handle infinite loop boundaries
        if (currentX > 0) {
            currentX -= totalWidth;
            targetX -= totalWidth;
        } else if (currentX < -totalWidth * 2) {
            currentX += totalWidth;
            targetX += totalWidth;
        }
        
        // Apply transform
        track.style.transform = `translate3d(${currentX}px, 0, 0)`;
        
        // Apply parallax to images
        const galleryRect = gallery.getBoundingClientRect();
        const centerX = galleryRect.width / 2;
        
        allSlides.forEach((slide, index) => {
            const slideRect = slide.getBoundingClientRect();
            const slideCenter = slideRect.left + slideRect.width / 2 - galleryRect.left;
            const distanceFromCenter = slideCenter - centerX;
            const parallaxOffset = distanceFromCenter * config.parallaxIntensity;
            
            const img = slide.querySelector('.parallax-img');
            if (img) {
                const scale = config.imageScale;
                img.style.transform = `translateX(${-parallaxOffset}px) scale(${scale})`;
            }
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Mouse wheel handler
    function handleWheel(e) {
        e.preventDefault();
        const delta = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * config.scrollSpeed;
        const clampedDelta = Math.max(Math.min(delta, config.maxVelocity), -config.maxVelocity);
        targetX -= clampedDelta;
    }
    
    // Mouse drag handlers
    function handleMouseDown(e) {
        isDragging = true;
        startX = e.clientX;
        lastX = e.clientX;
        gallery.style.cursor = 'grabbing';
    }
    
    function handleMouseMove(e) {
        if (!isDragging) return;
        const deltaX = (e.clientX - lastX) * 1.5;
        lastX = e.clientX;
        targetX += deltaX;
    }
    
    function handleMouseUp() {
        isDragging = false;
        gallery.style.cursor = 'grab';
    }
    
    // Touch handlers
    function handleTouchStart(e) {
        isDragging = true;
        startX = e.touches[0].clientX;
        lastX = e.touches[0].clientX;
    }
    
    function handleTouchMove(e) {
        if (!isDragging) return;
        const deltaX = (e.touches[0].clientX - lastX) * 1.5;
        lastX = e.touches[0].clientX;
        targetX += deltaX;
    }
    
    function handleTouchEnd() {
        isDragging = false;
    }
    
    // Event listeners
    gallery.addEventListener('wheel', handleWheel, { passive: false });
    gallery.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    gallery.addEventListener('mouseleave', handleMouseUp);
    gallery.addEventListener('touchstart', handleTouchStart, { passive: true });
    gallery.addEventListener('touchmove', handleTouchMove, { passive: true });
    gallery.addEventListener('touchend', handleTouchEnd);
    
    // Prevent image dragging
    gallery.addEventListener('dragstart', e => e.preventDefault());
    
    console.log('Parallax gallery initialized');
})();
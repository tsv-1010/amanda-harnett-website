// Preloader - Hide when page is fully loaded
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Minimum display time of 800ms for branding
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Remove from DOM after animation completes
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 800);
    }
});

// ==========================================
// Radius on Scroll Effect - Hero Section
// Desktop only - disabled on mobile for performance
// ==========================================
(function initRadiusOnScroll() {
    const heroScrollContainer = document.querySelector('.hero-scroll-container');
    const hero = document.querySelector('.hero');
    
    if (!heroScrollContainer || !hero) return;
    
    // Check if mobile or reduced motion preference
    const isMobile = () => window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Disable effect on mobile or if user prefers reduced motion
    if (prefersReducedMotion) {
        heroScrollContainer.style.setProperty('--hero-scale', 1);
        heroScrollContainer.style.setProperty('--hero-radius', '0px');
        console.log('Radius on Scroll disabled (reduced motion preference)');
        return;
    }
    
    // Configuration
    const config = {
        startScale: 0.92,      // Starting scale (zoomed out slightly)
        endScale: 1,           // End scale (full size)
        startRadius: 24,       // Starting border radius in px
        endRadius: 0,          // End border radius in px
        scrollDistance: 400    // Pixels to scroll for full effect
    };
    
    let ticking = false;
    let isEnabled = !isMobile();
    
    function updateScrollEffect() {
        // Skip if mobile
        if (!isEnabled) {
            heroScrollContainer.style.setProperty('--hero-scale', 1);
            heroScrollContainer.style.setProperty('--hero-radius', '0px');
            ticking = false;
            return;
        }
        
        const scrollY = window.scrollY;
        const heroTop = hero.offsetTop - 70; // Account for navbar
        const scrollInHero = Math.max(0, scrollY - heroTop);
        
        // Calculate progress (0 to 1)
        const progress = Math.min(scrollInHero / config.scrollDistance, 1);
        
        // Ease the progress for smoother feel
        const eased = 1 - Math.pow(1 - progress, 3);
        
        // Calculate current values
        const currentScale = config.startScale + (config.endScale - config.startScale) * eased;
        const currentRadius = config.startRadius - (config.startRadius - config.endRadius) * eased;
        
        // Apply to CSS custom properties
        heroScrollContainer.style.setProperty('--hero-scale', currentScale);
        heroScrollContainer.style.setProperty('--hero-radius', `${currentRadius}px`);
        
        ticking = false;
    }
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffect);
            ticking = true;
        }
    }
    
    // Handle resize - enable/disable based on viewport
    function onResize() {
        const wasMobile = !isEnabled;
        isEnabled = !isMobile();
        
        // If transitioning to/from mobile, update immediately
        if (wasMobile !== !isEnabled) {
            updateScrollEffect();
        }
    }
    
    // Initialize
    updateScrollEffect();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    
    console.log(`Radius on Scroll initialized (${isEnabled ? 'enabled' : 'disabled on mobile'})`);
})();

// ==========================================
// Performance Progress Ring
// ==========================================
(function initProgressRing() {
    const container = document.getElementById('progressRing');
    if (!container) return;
    
    const ring = container.querySelector('.progress-ring-fill');
    const percentText = container.querySelector('.progress-percent');
    
    if (!ring || !percentText) return;
    
    const circumference = 2 * Math.PI * 26; // r = 26
    let ticking = false;
    let hasCompleted = false;
    
    function updateProgress() {
        // Calculate scroll progress
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollY = window.scrollY;
        const progress = Math.min(scrollY / scrollHeight, 1);
        const percent = Math.round(progress * 100);
        
        // Update ring
        const offset = circumference - (progress * circumference);
        ring.style.strokeDashoffset = offset;
        
        // Update text
        percentText.textContent = `${percent}%`;
        
        // Add completed class when 100%
        if (percent >= 100 && !hasCompleted) {
            container.classList.add('completed');
            hasCompleted = true;
        } else if (percent < 100 && hasCompleted) {
            container.classList.remove('completed');
            hasCompleted = false;
        }
        
        ticking = false;
    }
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateProgress);
            ticking = true;
        }
    }
    
    // Click to scroll to top
    container.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Initialize
    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    
    console.log('Progress ring initialized');
})();

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    const isExpanded = navMenu?.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
        hamburger?.setAttribute('aria-expanded', 'false');
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
            // Use scrollIntoView which respects CSS scroll-margin-top
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
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
// ORGANIC BLOB REVEAL - Framer-style
// ============================================
// Uses SVG clip-path with organic noise edges for fluid blob reveal

const heroContainer = document.querySelector('.hero-image-container');
const heroReveal = document.querySelector('.hero-reveal');

if (heroContainer && heroReveal) {
    // Create inline SVG for clip-path
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.style.position = 'absolute';
    svg.innerHTML = `
        <defs>
            <clipPath id="blobClip" clipPathUnits="objectBoundingBox">
                <path id="blobPath" d="M0,0"/>
            </clipPath>
        </defs>
    `;
    document.body.appendChild(svg);
    
    const blobPath = document.getElementById('blobPath');
    
    // State - all in normalized 0-1 coordinates
    let mouseX = -1, mouseY = -1;
    let targetX = -1, targetY = -1;
    let blobRadius = 0;
    let targetRadius = 0;
    let isHovering = false;
    let time = 0;
    let containerWidth = 1, containerHeight = 1;
    
    // Trail for motion blur
    const trail = [];
    const TRAIL_SIZE = 6;
    
    // Cache container dimensions
    function updateDimensions() {
        const rect = heroContainer.getBoundingClientRect();
        containerWidth = rect.width;
        containerHeight = rect.height;
    }
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    // Organic noise function
    function noise(angle, t) {
        return Math.sin(angle * 3 + t) * 0.15 +
               Math.sin(angle * 5 - t * 1.3) * 0.1 +
               Math.sin(angle * 7 + t * 0.7) * 0.08 +
               Math.sin(angle * 2 - t * 0.5) * 0.12;
    }
    
    // Generate organic blob SVG path (normalized 0-1 coordinates)
    function generateBlobPath(cx, cy, r, t) {
        if (r < 0.001) return 'M0,0';
        
        const points = [];
        const segments = 48;
        
        for (let i = 0; i < segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            const n = noise(angle, t);
            const radius = r * (1 + n);
            
            // Account for aspect ratio
            const aspectRatio = containerHeight / containerWidth;
            const px = cx + Math.cos(angle) * radius;
            const py = cy + Math.sin(angle) * radius * aspectRatio;
            
            points.push({ x: Math.max(0, Math.min(1, px)), y: Math.max(0, Math.min(1, py)) });
        }
        
        // Create smooth bezier path
        let path = `M${points[0].x.toFixed(4)},${points[0].y.toFixed(4)}`;
        
        for (let i = 0; i < points.length; i++) {
            const p0 = points[(i - 1 + points.length) % points.length];
            const p1 = points[i];
            const p2 = points[(i + 1) % points.length];
            const p3 = points[(i + 2) % points.length];
            
            // Catmull-Rom to Bezier conversion for smooth curves
            const cp1x = p1.x + (p2.x - p0.x) / 6;
            const cp1y = p1.y + (p2.y - p0.y) / 6;
            const cp2x = p2.x - (p3.x - p1.x) / 6;
            const cp2y = p2.y - (p3.y - p1.y) / 6;
            
            path += ` C${cp1x.toFixed(4)},${cp1y.toFixed(4)} ${cp2x.toFixed(4)},${cp2y.toFixed(4)} ${p2.x.toFixed(4)},${p2.y.toFixed(4)}`;
        }
        
        path += 'Z';
        return path;
    }
    
    // Mouse tracking - INSTANT, normalized coordinates
    heroContainer.addEventListener('mousemove', (e) => {
        const rect = heroContainer.getBoundingClientRect();
        targetX = (e.clientX - rect.left) / rect.width;
        targetY = (e.clientY - rect.top) / rect.height;
    });
    
    heroContainer.addEventListener('mouseenter', (e) => {
        updateDimensions();
        const rect = heroContainer.getBoundingClientRect();
        targetX = (e.clientX - rect.left) / rect.width;
        targetY = (e.clientY - rect.top) / rect.height;
        mouseX = targetX;
        mouseY = targetY;
        isHovering = true;
        targetRadius = 0.18; // 18% of container width
        
        // Initialize trail
        trail.length = 0;
        for (let i = 0; i < TRAIL_SIZE; i++) {
            trail.push({ x: targetX, y: targetY });
        }
    });
    
    heroContainer.addEventListener('mouseleave', () => {
        isHovering = false;
        targetRadius = 0;
    });
    
    // Animation loop
    function animate() {
        // INSTANT position tracking (0.92 = nearly 1:1)
        mouseX += (targetX - mouseX) * 0.92;
        mouseY += (targetY - mouseY) * 0.92;
        
        // Fast radius animation
        blobRadius += (targetRadius - blobRadius) * 0.35;
        
        // Update trail
        trail.unshift({ x: mouseX, y: mouseY });
        if (trail.length > TRAIL_SIZE) trail.pop();
        
        time += 0.1;
        
        // Generate and apply blob path
        if (blobRadius > 0.001 || isHovering) {
            const path = generateBlobPath(mouseX, mouseY, blobRadius, time);
            blobPath.setAttribute('d', path);
            heroReveal.style.clipPath = 'url(#blobClip)';
            heroReveal.style.opacity = '1';
        } else {
            heroReveal.style.opacity = '0';
        }
        
        requestAnimationFrame(animate);
    }
    
    // Start
    animate();
    console.log('Organic blob reveal initialized');
}

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

// ============================================
// STICKER DROP EFFECT - Books Section Only
// ============================================
(function initStickerDrop() {
    const booksSection = document.querySelector('#books');
    if (!booksSection) return;
    
    // Sticker images - add your sticker filenames here
    const stickerImages = [
        'assets/stickers/Kay-Searching.png',
        'assets/stickers/Kay-Snow-Angel.png',
        'assets/stickers/Piggy-and-Kay.png',
        'assets/stickers/Piggy-And-Kay-Sitting.png',
        'assets/stickers/Piggy-Boots.png',
        'assets/stickers/Piggy-Searching.png',
        'assets/stickers/Piggy-SnowAngel.png'
    ];
    
    // Configuration
    const config = {
        minSize: 40,
        maxSize: 80,
        fadeOutDelay: 3000,  // How long stickers stay visible (ms)
        maxStickers: 15,     // Max stickers on screen at once
        rotationRange: 30    // Random rotation range in degrees
    };
    
    let activeStickers = [];
    
    // Create sticker container
    const stickerContainer = document.createElement('div');
    stickerContainer.className = 'sticker-container';
    booksSection.style.position = 'relative';
    booksSection.appendChild(stickerContainer);
    
    // Get hint text from HTML
    const hint = booksSection.querySelector('.sticker-hint');
    
    function createSticker(x, y) {
        // Check if images exist
        if (stickerImages.length === 0) return;
        
        // Limit max stickers
        if (activeStickers.length >= config.maxStickers) {
            const oldestSticker = activeStickers.shift();
            oldestSticker.remove();
        }
        
        // Create sticker element
        const sticker = document.createElement('div');
        sticker.className = 'sticker';
        
        // Random sticker image
        const randomImage = stickerImages[Math.floor(Math.random() * stickerImages.length)];
        
        // Random size
        const size = config.minSize + Math.random() * (config.maxSize - config.minSize);
        
        // Random rotation
        const rotation = (Math.random() - 0.5) * 2 * config.rotationRange;
        
        // Random slight offset from click point
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        
        sticker.style.cssText = `
            left: ${x + offsetX}px;
            top: ${y + offsetY}px;
            width: ${size}px;
            height: ${size}px;
            transform: translate(-50%, -50%) rotate(${rotation}deg) scale(0);
        `;
        
        // Create image
        const img = document.createElement('img');
        img.src = randomImage;
        img.alt = 'Piggy & Kay sticker';
        img.draggable = false;
        img.onerror = () => sticker.remove(); // Remove if image fails to load
        
        sticker.appendChild(img);
        stickerContainer.appendChild(sticker);
        activeStickers.push(sticker);
        
        // Animate in (pop effect)
        requestAnimationFrame(() => {
            sticker.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(1.2)`;
            setTimeout(() => {
                sticker.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(1)`;
            }, 150);
        });
        
        // Fade out and remove after delay
        setTimeout(() => {
            sticker.classList.add('fade-out');
            setTimeout(() => {
                sticker.remove();
                activeStickers = activeStickers.filter(s => s !== sticker);
            }, 500);
        }, config.fadeOutDelay);
        
        // Hide hint after first click
        hint.classList.add('hidden');
    }
    
    // Handle clicks on books section
    booksSection.addEventListener('click', (e) => {
        // Don't create stickers when clicking buttons/links
        if (e.target.closest('a, button')) return;
        
        // Get position relative to books section
        const rect = booksSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        createSticker(x, y);
    });
    
    // Also support touch
    booksSection.addEventListener('touchstart', (e) => {
        if (e.target.closest('a, button')) return;
        
        const touch = e.touches[0];
        const rect = booksSection.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        createSticker(x, y);
    }, { passive: true });
    
    console.log('Sticker drop initialized for books section');
})();

// ==========================================
// Journey Tracker Widget
// ==========================================

(function initJourneyTracker() {
    const tracker = document.querySelector('.journey-tracker');
    if (!tracker) return;
    
    // Constants
    const START_DATE = new Date('2026-01-01');
    const END_DATE = new Date('2028-07-14');
    const WEEKS_TOTAL = 133; // ~2.5 years
    
    // Calculate countdown
    const today = new Date();
    const daysToOlympics = Math.ceil((END_DATE - today) / (1000 * 60 * 60 * 24));
    
    // Update countdown display
    const countdownEl = document.getElementById('daysToOlympics');
    if (countdownEl) {
        countdownEl.textContent = daysToOlympics;
    }
    
    // Load data - try localStorage first (from admin page), then fall back to JSON file
    async function loadData() {
        // Check localStorage first (synced from admin page)
        const localData = localStorage.getItem('journeyTrackerData');
        if (localData) {
            return JSON.parse(localData);
        }
        
        // Fall back to JSON file
        try {
            const response = await fetch('data/journey-tracker.json');
            if (response.ok) {
                return await response.json();
            }
        } catch (e) {
            console.log('Journey tracker: No data file found, using empty state');
        }
        
        // Return empty structure
        return {
            totals: { training: 0, practice: 0, tournament: 0, filmStudy: 0, flights: 0, recovery: 0, coaching: 0 },
            activities: []
        };
    }
    
    // Build heatmap grid
    function buildHeatmap(data) {
        const grid = document.querySelector('.heatmap-grid');
        if (!grid) return;
        
        // Create activity lookup by date
        const activityMap = new Map();
        if (data.activities) {
            data.activities.forEach(a => {
                activityMap.set(a.date, a.types.length);
            });
        }
        
        // Clear existing cells
        grid.innerHTML = '';
        
        // Generate cells for each day in the grid
        // Grid is 52 columns (weeks) x 7 rows (days)
        let currentDate = new Date(START_DATE);
        
        // Adjust to start on Sunday
        const dayOfWeek = currentDate.getDay();
        currentDate.setDate(currentDate.getDate() - dayOfWeek);
        
        for (let week = 0; week < 52; week++) {
            for (let day = 0; day < 7; day++) {
                const cell = document.createElement('div');
                cell.className = 'heatmap-cell';
                
                const dateStr = currentDate.toISOString().split('T')[0];
                const activityCount = activityMap.get(dateStr) || 0;
                
                // Check if date is in valid range
                const isBeforeStart = currentDate < START_DATE;
                const isAfterEnd = currentDate > END_DATE;
                const isFuture = currentDate > today;
                
                if (isBeforeStart || isAfterEnd) {
                    cell.style.visibility = 'hidden';
                } else if (isFuture) {
                    cell.classList.add('future');
                } else if (activityCount > 0) {
                    // Set intensity level based on number of activities
                    const level = Math.min(activityCount, 4);
                    cell.classList.add(`level-${level}`);
                }
                
                // Tooltip on hover
                if (!isBeforeStart && !isAfterEnd) {
                    const dateLabel = currentDate.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                    });
                    cell.title = `${dateLabel}: ${activityCount} ${activityCount === 1 ? 'activity' : 'activities'}`;
                }
                
                grid.appendChild(cell);
                
                // Move to next day
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }
    }
    
    // Update stats
    function updateStats(data) {
        const totals = data.totals || {};
        
        // Map stat elements to data keys
        const statMap = {
            'training': 'training',
            'practice': 'practice', 
            'tournament': 'tournament',
            'filmStudy': 'filmStudy',
            'recovery': 'recovery',
            'flights': 'flights',
            'coaching': 'coaching'
        };
        
        // Update each stat
        document.querySelectorAll('.stat-item').forEach(item => {
            const type = item.dataset.type;
            if (type && statMap[type]) {
                const valueEl = item.querySelector('.stat-value');
                if (valueEl) {
                    const targetValue = totals[type] || 0;
                    animateCounter(valueEl, targetValue);
                }
            }
        });
    }
    
    // Animate counter from 0 to target
    function animateCounter(element, target) {
        const duration = 1000;
        const start = 0;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (target - start) * eased);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }
    
    // Initialize
    async function init() {
        const data = await loadData();
        buildHeatmap(data);
        updateStats(data);
    }
    
    // Run when visible (intersection observer for performance)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                init();
                observer.disconnect();
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(tracker);
    
    console.log('Journey tracker initialized');
})();

// ==========================================
// Reel Carousel
// ==========================================
(function initReelCarousel() {
    const track = document.querySelector('.reel-track');
    const items = document.querySelectorAll('.reel-item');
    const prevBtn = document.querySelector('.reel-nav-prev');
    const nextBtn = document.querySelector('.reel-nav-next');
    const dots = document.querySelectorAll('.reel-dot');
    
    if (!track || items.length === 0) return;
    
    const totalItems = items.length;
    let currentIndex = 0;
    let isPlaying = false;
    let activeVideo = null;
    let autoplayInterval = null;
    let isPaused = false;
    let isAnimating = false;
    
    // Calculate position relative to current index (for infinite loop)
    function getRelativePosition(index) {
        let diff = index - currentIndex;
        
        // Wrap around for infinite loop effect
        if (diff > totalItems / 2) {
            diff -= totalItems;
        } else if (diff < -totalItems / 2) {
            diff += totalItems;
        }
        
        return diff;
    }
    
    // Update carousel positions
    function updateCarousel() {
        items.forEach((item, index) => {
            // Remove all position classes
            item.classList.remove('pos-0', 'pos-1', 'pos--1', 'pos-2', 'pos--2', 'pos-3', 'pos--3', 'pos-4', 'pos--4', 'hidden');
            
            const position = getRelativePosition(index);
            
            // Assign position class based on relative position
            if (position === 0) {
                item.classList.add('pos-0');
            } else if (position === 1) {
                item.classList.add('pos-1');
            } else if (position === -1) {
                item.classList.add('pos--1');
            } else if (position === 2) {
                item.classList.add('pos-2');
            } else if (position === -2) {
                item.classList.add('pos--2');
            } else if (position === 3) {
                item.classList.add('pos-3');
            } else if (position === -3) {
                item.classList.add('pos--3');
            } else if (position === 4 || position === -4) {
                item.classList.add(position > 0 ? 'pos-4' : 'pos--4');
            } else {
                item.classList.add('hidden');
            }
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Stop any playing video when switching
        if (activeVideo) {
            activeVideo.pause();
            activeVideo.closest('.reel-item')?.classList.remove('playing');
            activeVideo = null;
            isPlaying = false;
        }
        
        // Auto-play the center reel (pos-0)
        autoPlayCenterReel();
    }
    
    // Auto-play the center reel when it comes into view
    function autoPlayCenterReel() {
        const centerItem = items[currentIndex];
        if (!centerItem) return;
        
        const video = centerItem.querySelector('.reel-video');
        if (!video) return;
        
        // Delay slightly to ensure video is ready after transition
        setTimeout(() => {
            if (video.paused) {
                video.play().then(() => {
                    centerItem.classList.add('playing');
                    isPlaying = true;
                    activeVideo = video;
                }).catch(err => {
                    console.log('Auto-play failed:', err);
                });
            }
        }, 150);
    }
    
    function goToSlide(index) {
        if (isAnimating) return;
        isAnimating = true;
        
        // Wrap index for infinite loop
        currentIndex = ((index % totalItems) + totalItems) % totalItems;
        updateCarousel();
        
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }
    
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // Navigation events
    prevBtn?.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });
    
    nextBtn?.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });
    
    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index);
            goToSlide(index);
            resetAutoplay();
        });
    });
    
    // Click on reel to play/pause or navigate
    items.forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            const position = getRelativePosition(index);
            
            // If clicking non-center item, navigate to it
            if (position !== 0) {
                goToSlide(index);
                resetAutoplay();
                return;
            }
            
            // Toggle play/pause on center item
            const video = item.querySelector('.reel-video');
            if (!video) return;
            
            if (isPlaying && activeVideo === video) {
                video.pause();
                item.classList.remove('playing');
                isPlaying = false;
                activeVideo = null;
            } else {
                // Pause any other playing video
                if (activeVideo && activeVideo !== video) {
                    activeVideo.pause();
                    activeVideo.closest('.reel-item')?.classList.remove('playing');
                }
                
                video.play().then(() => {
                    item.classList.add('playing');
                    isPlaying = true;
                    activeVideo = video;
                }).catch(err => {
                    console.log('Video play failed:', err);
                });
            }
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Only respond if carousel is in viewport
        const carouselRect = track.getBoundingClientRect();
        const inViewport = carouselRect.top < window.innerHeight && carouselRect.bottom > 0;
        
        if (!inViewport) return;
        
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoplay();
        }
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            resetAutoplay();
        }
    }
    
    // Autoplay functionality
    function startAutoplay() {
        if (autoplayInterval) clearInterval(autoplayInterval);
        autoplayInterval = setInterval(() => {
            if (!isPaused && !isPlaying) {
                nextSlide();
            }
        }, 4000); // Change slide every 4 seconds
    }
    
    function resetAutoplay() {
        startAutoplay();
    }
    
    // Pause autoplay on hover
    const carouselWrapper = document.querySelector('.reel-carousel-wrapper');
    carouselWrapper?.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    
    carouselWrapper?.addEventListener('mouseleave', () => {
        isPaused = false;
    });
    
    // Initialize
    updateCarousel();
    startAutoplay();
    
    console.log('Reel carousel initialized with infinite loop');
})();

/* ==========================================
   FAQ ACCORDION
   Partnership FAQ section accordion functionality
   ========================================== */
(function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (!faqQuestions.length) return;
    
    faqQuestions.forEach((button) => {
        button.addEventListener('click', () => {
            const answerId = button.getAttribute('aria-controls');
            const answer = document.getElementById(answerId);
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQ items
            faqQuestions.forEach((otherButton) => {
                if (otherButton !== button) {
                    otherButton.setAttribute('aria-expanded', 'false');
                    const otherAnswerId = otherButton.getAttribute('aria-controls');
                    const otherAnswer = document.getElementById(otherAnswerId);
                    if (otherAnswer) {
                        otherAnswer.setAttribute('hidden', '');
                        otherAnswer.style.maxHeight = '0';
                        otherAnswer.style.paddingTop = '0';
                        otherAnswer.style.paddingBottom = '0';
                    }
                }
            });
            
            // Toggle current FAQ item
            const newState = !isExpanded;
            button.setAttribute('aria-expanded', newState);
            
            if (newState) {
                answer.removeAttribute('hidden');
                // Calculate height based on content
                const contentHeight = answer.scrollHeight;
                answer.style.maxHeight = contentHeight + 'px';
                answer.style.paddingTop = '1.5rem';
                answer.style.paddingBottom = '1.5rem';
            } else {
                answer.setAttribute('hidden', '');
                answer.style.maxHeight = '0';
                answer.style.paddingTop = '0';
                answer.style.paddingBottom = '0';
            }
        });
        
        // Keyboard accessibility - Enter/Space to toggle
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
    
    console.log('FAQ accordion initialized');
})();

/* ==========================================
   PARTNER LOGO SCROLL
   Smooth infinite scroll with pause on hover
   ========================================== */
(function initPartnerScroll() {
    const scrollTrack = document.querySelector('.partner-scroll-track');
    
    if (!scrollTrack) return;
    
    // Filter out hidden items and get only visible ones
    const allItems = Array.from(scrollTrack.querySelectorAll('.partner-logo-item'));
    const visibleItems = allItems.filter(item => item.getAttribute('data-select') !== 'false');
    
    if (visibleItems.length === 0) return;
    
    // Clone visible items to create infinite effect
    const clonedItems = visibleItems.map(item => item.cloneNode(true));
    clonedItems.forEach(clone => {
        scrollTrack.appendChild(clone);
    });
    
    // Additional clones for smoother transitions
    const additionalClones = visibleItems.map(item => item.cloneNode(true));
    additionalClones.forEach(clone => {
        scrollTrack.appendChild(clone);
    });
    
    // Calculate width of one set
    let trackWidth = 0;
    visibleItems.forEach(item => {
        trackWidth += item.offsetWidth + 48; // 48px = 3rem gap
    });
    
    let translateX = 0;
    let isPaused = false;
    const speed = 30; // pixels per second
    let lastTime = Date.now();
    let animationId = null;
    
    function animate() {
        const now = Date.now();
        const deltaTime = (now - lastTime) / 1000;
        lastTime = now;
        
        if (!isPaused) {
            translateX -= speed * deltaTime;
            
            // Reset to beginning when scrolled past first set
            if (Math.abs(translateX) >= trackWidth) {
                translateX = 0;
            }
        }
        
        scrollTrack.style.transform = `translateX(${translateX}px)`;
        animationId = requestAnimationFrame(animate);
    }
    
    // Pause on hover
    scrollTrack.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    
    scrollTrack.addEventListener('mouseleave', () => {
        isPaused = false;
        lastTime = Date.now();
    });
    
    // Pause on touch
    scrollTrack.addEventListener('touchstart', () => {
        isPaused = true;
    });
    
    scrollTrack.addEventListener('touchend', () => {
        isPaused = false;
        lastTime = Date.now();
    });
    
    // Start animation
    animate();
    
    console.log('Partner logo scroll initialized with', visibleItems.length, 'partners');
})();

/* ==========================================
   ABOUT IMAGE LOADER & FOCUS ON SCROLL
   Loads Amanda-Harnett-Blue image & blur/focus effect
   ========================================== */
(function initAboutImage() {
    const focusElement = document.querySelector('.about-image.focus-on-scroll');
    const imgElement = focusElement?.querySelector('.about-img');
    const basePath = focusElement?.getAttribute('data-image-src');
    
    if (!focusElement || !imgElement || !basePath) return;
    
    // Try to load image with intelligent extension detection
    function loadImage() {
        // Try JPEG first (since that's what's being used), then others
        const extensions = ['jpeg', 'jpg', 'png', 'webp'];
        let loadedExtension = null;
        
        function tryNextExtension(index) {
            if (index >= extensions.length) {
                console.warn('Could not load image:', basePath);
                return;
            }
            
            const ext = extensions[index];
            const imagePath = `${basePath}.${ext}`;
            const testImg = new Image();
            
            testImg.onload = () => {
                imgElement.src = imagePath;
                console.log('Image loaded:', imagePath);
                initFocusOnScroll();
            };
            
            testImg.onerror = () => {
                tryNextExtension(index + 1);
            };
            
            testImg.src = imagePath;
        }
        
        tryNextExtension(0);
    }
    
    function initFocusOnScroll() {
        // Create Intersection Observer to track when image is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const scrollProgress = entry.intersectionRatio; // 0 to 1
                
                // Calculate blur amount based on scroll position
                // When fully in view (ratio = 1), no blur
                // When partially out of view (ratio < 1), increase blur
                const blurAmount = Math.max(0, (1 - scrollProgress) * 15);
                const brightnessAmount = 0.9 + (scrollProgress * 0.1); // 0.9 to 1.0
                
                focusElement.style.filter = `blur(${blurAmount}px) brightness(${brightnessAmount})`;
                
                // Update classes for styling
                if (scrollProgress > 0.7) {
                    focusElement.classList.remove('blur');
                    focusElement.classList.add('focused');
                } else {
                    focusElement.classList.remove('focused');
                    focusElement.classList.add('blur');
                }
            });
        }, {
            threshold: [0, 0.25, 0.5, 0.75, 1]
        });
        
        observer.observe(focusElement);
    }
    
    // Load the image
    loadImage();
    
    console.log('About image initialized');
})();

/* ==========================================
   BENTO GALLERY INTERACTIONS
   Hover effects, stagger animations, micro-interactions
   ========================================== */
(function initBentoGallery() {
    const bentoItems = document.querySelectorAll('.bento-item');
    const courtHalves = document.querySelectorAll('.court-half');
    
    if (!bentoItems.length && !courtHalves.length) return;
    
    // Fade in animation on intersection
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                intersectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Initialize items with fade-in
    bentoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
        intersectionObserver.observe(item);
    });
    
    // Hover effect - blur background items
    const bentoGrids = document.querySelectorAll('.bento-grid');
    bentoGrids.forEach(grid => {
        grid.addEventListener('mouseenter', function(e) {
            const hoveredItem = e.target.closest('.bento-item');
            if (!hoveredItem) return;
        });
        
        grid.addEventListener('mouseleave', function() {
            // Reset blur on all items
            bentoItems.forEach(item => {
                item.style.filter = 'blur(0px)';
                item.style.opacity = '1';
            });
        });
    });
    
    // Promote clicked item to featured state
    const promoteItem = (item) => {
        const grid = item.closest('.bento-grid');
        if (!grid) return;
        grid.querySelectorAll('.bento-item.promoted').forEach(node => node.classList.remove('promoted'));
        item.classList.add('promoted');
    };
    
    bentoItems.forEach(item => {
        item.addEventListener('click', (e) => {
            promoteItem(item);
            e.stopPropagation();
        });
    });
    
    // Sand court mask interactions
    if (courtHalves.length) {
        const enableHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        let activeHalf = null;
        
        const activateHalf = (half) => {
            if (!half || activeHalf === half) return;
            courtHalves.forEach(h => h.classList.remove('active'));
            half.classList.add('active');
            activeHalf = half;
        };
        
        courtHalves.forEach(half => {
            if (enableHover) {
                half.addEventListener('mouseenter', () => activateHalf(half));
            }
            half.addEventListener('click', () => activateHalf(half));
        });
    }
    
    console.log('Bento gallery initialized with', bentoItems.length, 'items');
})();

/* ============================================
   PARTNERSHIP CARD FLIP ANIMATION
   Click to flip cards revealing Amanda photos
   ============================================ */
(function() {
    const flipCards = document.querySelectorAll('.sponsorship-card.flip-card');
    
    if (!flipCards.length) {
        console.log('No flip cards found');
        return;
    }

    flipCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Toggle flipped class
            this.classList.toggle('flipped');
            
            // Log which card was flipped
            const category = this.getAttribute('data-category');
            console.log('Card flipped:', category, this.classList.contains('flipped') ? '(showing back)' : '(showing front)');
        });

        // Keyboard accessibility - flip on Enter or Space
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'Click to flip card and see Amanda');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('flipped');
            }
        });
    });

    console.log('Partnership flip cards initialized with', flipCards.length, 'cards');
})();

/* ==========================================
   PERFORMANCE TRACKER WIDGET
   Live heart rate display with Pulsoid integration
   Demo mode when disconnected: Sleep (10pm-5:30am) / Recovery (other times)
   ========================================== */
(function initPerformanceTracker() {
    const tracker = document.getElementById('performanceTracker');
    const toggle = document.getElementById('trackerToggle');
    const panel = document.getElementById('trackerPanel');
    const closeBtn = document.getElementById('trackerClose');
    const hrValue = document.getElementById('trackerHrValue');
    const hrMini = document.getElementById('trackerHrMini');
    const stageValue = document.getElementById('stageValue');
    const trackerStage = document.getElementById('trackerStage');
    const zones = document.querySelectorAll('.zone');
    
    if (!tracker) return;
    
    let isExpanded = false;
    let pulsoidConnected = false;
    let currentHR = null;
    let pulsoidToken = null; // Will be set when Amanda connects
    
    // Toggle panel
    toggle?.addEventListener('click', () => {
        isExpanded = !isExpanded;
        panel?.classList.toggle('active', isExpanded);
    });
    
    closeBtn?.addEventListener('click', () => {
        isExpanded = false;
        panel?.classList.remove('active');
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isExpanded) {
            isExpanded = false;
            panel?.classList.remove('active');
        }
    });
    
    // Heart rate zones configuration
    const HR_ZONES = {
        sleep: { min: 0, max: 50, label: 'Sleep', color: '#6b7280' },
        recovery: { min: 0, max: 65, label: 'Recovery', color: '#3b82f6' },
        flow: { min: 66, max: 110, label: 'Flow', color: '#10b981' },
        build: { min: 111, max: 155, label: 'Build', color: '#f59e0b' },
        peak: { min: 156, max: 999, label: 'Peak', color: '#ef4444' }
    };
    
    // Determine zone from HR
    function getZoneFromHR(hr) {
        if (hr >= 156) return 'peak';
        if (hr >= 111) return 'build';
        if (hr >= 66) return 'flow';
        if (hr >= 51) return 'recovery';
        return 'sleep';
    }
    
    // Check if it's sleep time (10pm - 5:30am)
    function isSleepTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const timeValue = hours * 60 + minutes;
        
        // 10pm (22:00) = 1320 minutes
        // 5:30am = 330 minutes
        return timeValue >= 1320 || timeValue < 330;
    }
    
    // Get demo zone when not connected
    function getDemoZone() {
        return isSleepTime() ? 'sleep' : 'recovery';
    }
    
    // Simulate gentle HR fluctuation for demo mode
    function getDemoHR(zone) {
        const baseHR = {
            sleep: 52,
            recovery: 58
        };
        const base = baseHR[zone] || 58;
        // Add small random fluctuation (-3 to +3)
        return base + Math.floor(Math.random() * 7) - 3;
    }
    
    // Update display
    function updateDisplay(hr, zone) {
        // Update HR values
        const displayHR = hr || '--';
        hrValue.textContent = displayHR;
        hrMini.textContent = hr ? hr : '--';
        
        // Update stage
        const zoneConfig = HR_ZONES[zone];
        stageValue.textContent = zoneConfig?.label || 'Unknown';
        
        // Update stage class for color
        trackerStage.className = 'tracker-stage ' + zone;
        
        // Update zone indicators
        zones.forEach(zoneEl => {
            const zoneName = zoneEl.dataset.zone;
            zoneEl.classList.toggle('active', zoneName === zone);
        });
    }
    
    // Try to connect to Pulsoid
    async function connectToPulsoid() {
        if (!pulsoidToken) {
            // No token configured - use demo mode
            console.log('Pulsoid: No token configured, using demo mode');
            return false;
        }
        
        try {
            // Pulsoid WebSocket connection
            const ws = new WebSocket(`wss://dev.pulsoid.net/api/v1/data/real_time?access_token=${pulsoidToken}`);
            
            ws.onopen = () => {
                console.log('Pulsoid: Connected');
                pulsoidConnected = true;
            };
            
            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.data && data.data.heart_rate) {
                        currentHR = data.data.heart_rate;
                        const zone = getZoneFromHR(currentHR);
                        updateDisplay(currentHR, zone);
                    }
                } catch (e) {
                    console.log('Pulsoid: Parse error', e);
                }
            };
            
            ws.onerror = (error) => {
                console.log('Pulsoid: Connection error', error);
                pulsoidConnected = false;
            };
            
            ws.onclose = () => {
                console.log('Pulsoid: Connection closed');
                pulsoidConnected = false;
                // Fall back to demo mode
                startDemoMode();
            };
            
            return true;
        } catch (e) {
            console.log('Pulsoid: Failed to connect', e);
            return false;
        }
    }
    
    // Demo mode - simulate HR based on time
    function startDemoMode() {
        const zone = getDemoZone();
        const hr = getDemoHR(zone);
        updateDisplay(hr, zone);
        
        // Update every 3 seconds with slight variation
        setInterval(() => {
            if (!pulsoidConnected) {
                const currentZone = getDemoZone();
                const currentDemoHR = getDemoHR(currentZone);
                updateDisplay(currentDemoHR, currentZone);
            }
        }, 3000);
    }
    
    // Auto-show tracker when scrolling to About section
    function setupScrollTrigger() {
        const aboutSection = document.getElementById('about');
        if (!aboutSection) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    tracker.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(aboutSection);
    }
    
    // Initialize
    async function init() {
        // Try Pulsoid first
        const connected = await connectToPulsoid();
        
        if (!connected) {
            // Start demo mode
            startDemoMode();
        }
        
        // Setup scroll trigger
        setupScrollTrigger();
        
        // Show tracker initially
        tracker.classList.add('visible');
        
        console.log('Performance tracker initialized');
    }
    
    init();
})();

/* ==========================================
   NOW PLAYING MUSIC VISUALIZER
   Ambient visualizer with beat detection & playlist
   ========================================== */
(function initMusicVisualizer() {
    // DOM elements
    const playPauseBtnViz = document.getElementById('playPauseViz');
    const prevBtnViz = document.getElementById('prevTrackViz');
    const nextBtnViz = document.getElementById('nextTrackViz');
    const trackTitleViz = document.getElementById('trackTitleViz');
    const trackArtistViz = document.getElementById('trackArtistViz');
    const visualizerCanvas = document.getElementById('visualizerCanvas');
    const visualizerFallback = document.getElementById('visualizerFallback');
    const playlistToggle = document.getElementById('playlistToggle');
    const playlistModal = document.getElementById('playlistModal');
    const playlistCloseBtn = document.getElementById('playlistCloseBtn');
    const playlistContainer = document.getElementById('playlistTracks');
    
    if (!playPauseBtnViz) return;
    
    // Playlist configuration
    const playlist = [
        {
            title: 'Acoustic Test',
            artist: 'Amanda\'s Playlist',
            src: 'assets/music/acoustictest.mp3',
            artwork: null
        },
        {
            title: 'Storytime Interlude',
            artist: 'Pooh Reading Sample',
            src: 'assets/music/winniethepooh_01_milne_64kb.mp3',
            artwork: null
        },
        {
            title: 'Competition Mode',
            artist: 'Amanda\'s Playlist',
            src: 'assets/music/acoustictest.mp3',
            artwork: null
        },
        {
            title: 'Recovery Flow',
            artist: 'Amanda\'s Playlist',
            src: 'assets/music/winniethepooh_01_milne_64kb.mp3',
            artwork: null
        },
        {
            title: 'Focus & Drive',
            artist: 'Amanda\'s Playlist',
            src: 'assets/music/acoustictest.mp3',
            artwork: null
        }
    ];
    
    // Audio state
    let currentTrackIndex = 0;
    let isPlaying = false;
    let audio = new Audio();
    
    // Web Audio API for beat detection  
    let audioContext = null;
    let analyser = null;
    let dataArray = null;
    let audioSource = null;
    let animationFrameId = null;
    let analyserActive = false;
    
    // Frequency data
    let bassLevel = 0;
    let midLevel = 0;
    let highLevel = 0;
    
    // Visualization state
    let currentVisualization = 'sunrise'; // will be set by time
    
    function updateVisualizerMode(useAnalyser) {
        analyserActive = useAnalyser;
        if (useAnalyser) {
            visualizerCanvas.classList.add('active');
            visualizerFallback.classList.add('hidden');
        } else {
            visualizerCanvas.classList.remove('active');
            visualizerFallback.classList.remove('hidden');
        }
    }

    updateVisualizerMode(false);

    // Initialize Web Audio API
    function initAudioContext() {
        if (audioContext) return; // Already initialized
        
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) {
                console.log('AudioContext not available in this browser');
                return false;
            }
            
            audioContext = new AudioContext();
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            analyser.smoothingTimeConstant = 0.6;
            
            const bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);
            
            // Try to connect audio element to analyser
            try {
                if (!audioSource && audio) {
                    audioSource = audioContext.createMediaElementSource(audio);
                    audioSource.connect(analyser);
                    analyser.connect(audioContext.destination);
                    updateVisualizerMode(true);
                    console.log('Audio source connected to analyser');
                }
            } catch (sourceErr) {
                console.log('Could not connect audio source to analyser:', sourceErr.message);
                updateVisualizerMode(false);
                // Continue anyway - we can still play audio without visualization
            }
            
            console.log('Audio context initialized:', {
                state: audioContext.state,
                sampleRate: audioContext.sampleRate,
                fftSize: analyser.fftSize,
                bufferLength: bufferLength
            });
            return true;
        } catch (e) {
            console.error('Web Audio API initialization failed:', e);
            return false;
        }
    }
    
    // Get frequency data from audio
    function updateFrequencyData() {
        if (!analyser || !dataArray) return;
        
        analyser.getByteFrequencyData(dataArray);
        
        // Extract bass (low frequencies: 0-20Hz)
        const bassEnd = Math.floor((20 / 22050) * dataArray.length);
        bassLevel = dataArray.slice(0, bassEnd).reduce((a, b) => a + b) / bassEnd / 255;
        
        // Extract mids (mid frequencies: 250-2000Hz)
        const midStart = Math.floor((250 / 22050) * dataArray.length);
        const midEnd = Math.floor((2000 / 22050) * dataArray.length);
        midLevel = dataArray.slice(midStart, midEnd).reduce((a, b) => a + b) / (midEnd - midStart) / 255;
        
        // Extract highs (high frequencies: 3000+Hz)
        const highStart = Math.floor((3000 / 22050) * dataArray.length);
        highLevel = dataArray.slice(highStart).reduce((a, b) => a + b) / (dataArray.length - highStart) / 255;
    }
    
    // Determine visualization based on time of day
    function getVisualizationByTime() {
        const hour = new Date().getHours();
        
        if (hour >= 5 && hour < 9) return 'sunrise';
        else if (hour >= 9 && hour < 11) return 'waves';
        else if (hour >= 11 && hour < 15) return 'sun';
        else if (hour >= 15 && hour < 17) return 'waves';
        else if (hour >= 17 && hour < 21) return 'sunset';
        else return 'moon';
    }
    
    // SVG Visualization: Sunrise
    function drawSunrise() {
        const svg = visualizerCanvas;
        svg.innerHTML = '';
        
        // Rising sun circle with pulsing glow
        const sunRadius = 40 + bassLevel * 15;
        const sunY = 120 + (1 - midLevel) * 60; // moves up with mids
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '120');
        circle.setAttribute('cy', sunY);
        circle.setAttribute('r', sunRadius);
        circle.setAttribute('fill', 'rgba(212, 165, 116, 0.8)');
        circle.setAttribute('opacity', '0.9');
        svg.appendChild(circle);
        
        // Glow effect responding to high frequencies
        const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        glow.setAttribute('cx', '120');
        glow.setAttribute('cy', sunY);
        glow.setAttribute('r', sunRadius + (1 - highLevel) * 20);
        glow.setAttribute('fill', 'none');
        glow.setAttribute('stroke', 'rgba(212, 165, 116, 0.3)');
        glow.setAttribute('stroke-width', '3');
        glow.setAttribute('opacity', highLevel);
        svg.appendChild(glow);
    }
    
    // SVG Visualization: Waves
    function drawWaves() {
        const svg = visualizerCanvas;
        svg.innerHTML = '';
        
        const waveHeight = 15 + bassLevel * 30;
        const waveFreq = 0.05;
        
        // Draw 3 waves
        for (let w = 0; w < 3; w++) {
            let path = 'M 0 ' + (120 + w * 25);
            
            for (let x = 0; x < 240; x += 10) {
                const y = 120 + w * 25 + Math.sin((x + w * 80) * waveFreq) * waveHeight;
                path += ` L ${x} ${y}`;
            }
            
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            line.setAttribute('d', path);
            line.setAttribute('stroke', w === 0 ? 'rgba(212, 165, 116, 0.8)' : 'rgba(232, 155, 155, 0.5)');
            line.setAttribute('stroke-width', '2');
            line.setAttribute('fill', 'none');
            line.setAttribute('stroke-linecap', 'round');
            svg.appendChild(line);
        }
    }
    
    // SVG Visualization: Sun
    function drawSun() {
        const svg = visualizerCanvas;
        svg.innerHTML = '';
        
        // Sun circle
        const sunRadius = 45;
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '120');
        circle.setAttribute('cy', '120');
        circle.setAttribute('r', sunRadius);
        circle.setAttribute('fill', 'rgba(212, 165, 116, 0.85)');
        svg.appendChild(circle);
        
        // Sun rays (respond to bass)
        const rayCount = 12;
        const rayLength = 30 + bassLevel * 40;
        
        for (let i = 0; i < rayCount; i++) {
            const angle = (i / rayCount) * Math.PI * 2;
            const x1 = 120 + Math.cos(angle) * (sunRadius + 5);
            const y1 = 120 + Math.sin(angle) * (sunRadius + 5);
            const x2 = 120 + Math.cos(angle) * (sunRadius + rayLength);
            const y2 = 120 + Math.sin(angle) * (sunRadius + rayLength);
            
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('stroke', 'rgba(232, 155, 155, 0.7)');
            line.setAttribute('stroke-width', '3');
            line.setAttribute('stroke-linecap', 'round');
            svg.appendChild(line);
        }
    }
    
    // SVG Visualization: Sunset
    function drawSunset() {
        const svg = visualizerCanvas;
        svg.innerHTML = '';
        
        // Horizon glow
        const glow = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        glow.setAttribute('cx', '120');
        glow.setAttribute('cy', '140');
        glow.setAttribute('rx', (80 + bassLevel * 30).toString());
        glow.setAttribute('ry', '20');
        glow.setAttribute('fill', 'rgba(232, 155, 155, ' + (0.3 + highLevel * 0.4) + ')');
        svg.appendChild(glow);
        
        // Setting sun
        const sunY = 140 + midLevel * 20;
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '120');
        circle.setAttribute('cy', sunY);
        circle.setAttribute('r', '35');
        circle.setAttribute('fill', 'rgba(212, 165, 116, 0.8)');
        svg.appendChild(circle);
        
        // Light rays
        for (let i = 0; i < 5; i++) {
            const x = 80 + i * 20;
            const rayHeight = 30 + bassLevel * 40;
            
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x);
            line.setAttribute('y1', sunY);
            line.setAttribute('x2', x);
            line.setAttribute('y2', sunY + rayHeight);
            line.setAttribute('stroke', 'rgba(232, 155, 155, ' + (0.4 + highLevel * 0.3) + ')');
            line.setAttribute('stroke-width', '4');
            line.setAttribute('stroke-linecap', 'round');
            svg.appendChild(line);
        }
    }
    
    // SVG Visualization: Moon & Stars
    function drawMoon() {
        const svg = visualizerCanvas;
        svg.innerHTML = '';
        
        // Moon
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '120');
        circle.setAttribute('cy', '80');
        circle.setAttribute('r', '40');
        circle.setAttribute('fill', 'rgba(220, 210, 200, ' + (0.8 + highLevel * 0.2) + ')');
        svg.appendChild(circle);
        
        // Stars (twinkle to beat)
        const stars = [
            {x: 40, y: 50},
            {x: 200, y: 60},
            {x: 50, y: 140},
            {x: 190, y: 150},
            {x: 80, y: 200},
            {x: 160, y: 190}
        ];
        
        stars.forEach((star, index) => {
            const starSize = 2 + (highLevel * 3);
            const opacity = 0.3 + (Math.sin(Date.now() / 200 + index) * 0.3) + (highLevel * 0.4);
            
            const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            dot.setAttribute('cx', star.x);
            dot.setAttribute('cy', star.y);
            dot.setAttribute('r', starSize);
            dot.setAttribute('fill', 'rgba(220, 210, 200, ' + opacity + ')');
            svg.appendChild(dot);
        });
    }
    
    // Render appropriate visualization
    function renderVisualization() {
        currentVisualization = getVisualizationByTime();
        
        switch(currentVisualization) {
            case 'sunrise':
                drawSunrise();
                break;
            case 'waves':
                drawWaves();
                break;
            case 'sun':
                drawSun();
                break;
            case 'sunset':
                drawSunset();
                break;
            case 'moon':
                drawMoon();
                break;
        }
    }
    
    // Animation loop for beat-responsive visualization
    function animate() {
        if (!isPlaying) {
            animationFrameId = requestAnimationFrame(animate);
            return;
        }
        
        // Only try to update frequency data if Web Audio API is available
        const canAnalyze = analyser && dataArray && audioContext && audioContext.state === 'running';
        if (canAnalyze) {
            if (!analyserActive) {
                updateVisualizerMode(true);
            }
            try {
                updateFrequencyData();
                renderVisualization();
            } catch (err) {
                console.log('Visualization update error:', err.message);
            }
        } else {
            if (analyserActive) {
                updateVisualizerMode(false);
            }
            // Fallback: use simulated beat data
            bassLevel = 0.3 + Math.sin(Date.now() / 200) * 0.2;
            midLevel = 0.4 + Math.sin(Date.now() / 300) * 0.2;
            highLevel = 0.35 + Math.sin(Date.now() / 250) * 0.2;
        }
        
        // Update fallback bars
        const fallbackBars = visualizerFallback.querySelectorAll('.fallback-bar');
        if (fallbackBars.length > 0) {
            fallbackBars[0].style.height = (40 + bassLevel * 100) + 'px';
            fallbackBars[1].style.height = (50 + midLevel * 90) + 'px';
            fallbackBars[2].style.height = (60 + highLevel * 80) + 'px';
            fallbackBars[3].style.height = (50 + midLevel * 90) + 'px';
            fallbackBars[4].style.height = (40 + bassLevel * 100) + 'px';
        }
        
        console.log('Animate loop:', {bass: bassLevel.toFixed(2), mid: midLevel.toFixed(2), high: highLevel.toFixed(2), viz: currentVisualization});
        
        animationFrameId = requestAnimationFrame(animate);
    }
    
    // Update UI with current track info
    function updateTrackInfo() {
        const track = playlist[currentTrackIndex];
        if (!track) return;
        
        trackTitleViz.textContent = track.title;
        trackArtistViz.textContent = track.artist;
        updatePlaylistDisplay();
    }
    
    // Render playlist
    function updatePlaylistDisplay() {
        if (!playlistContainer) return;
        
        playlistContainer.innerHTML = playlist.map((track, index) => `
            <div class="playlist-track ${index === currentTrackIndex ? 'active' : ''}" data-index="${index}">
                <span class="track-number">${index + 1}</span>
                <span class="track-name">${track.title}</span>
            </div>
        `).join('');
        
        // Add click handlers to playlist tracks
        playlistContainer.querySelectorAll('.playlist-track').forEach(trackEl => {
            trackEl.addEventListener('click', () => {
                const index = parseInt(trackEl.dataset.index);
                if (index !== currentTrackIndex) {
                    currentTrackIndex = index;
                    loadTrack();
                    if (isPlaying) {
                        playTrack();
                    }
                }
            });
        });
    }
    
    // Load current track
    function loadTrack() {
        const track = playlist[currentTrackIndex];
        if (!track) return;
        
        audio.src = track.src;
        audio.load();
        updateTrackInfo();
    }
    
    // Play track
    function playTrack() {
        console.log('playTrack() called, current track:', playlist[currentTrackIndex].src);
        
        // Initialize audio context on first play
        if (!audioContext) {
            console.log('Initializing audio context...');
            initAudioContext();
        }
        
        // Resume audio context if suspended
        if (audioContext && audioContext.state === 'suspended') {
            console.log('Audio context suspended, resuming...');
            audioContext.resume();
        }
        
        console.log('Attempting to play audio:', audio.src);
        audio.play().then(() => {
            console.log('Audio playing successfully');
            isPlaying = true;
            updatePlayPauseButton();
            animate(); // Start animation loop
            updateVisualizerMode(Boolean(analyser && dataArray && audioContext));
        }).catch(err => {
            console.error('Audio play failed:', err);
            trackTitleViz.textContent = 'Add tracks to playlist';
            updateVisualizerMode(false);
        });
    }
    
    // Pause track
    function pauseTrack() {
        audio.pause();
        isPlaying = false;
        updatePlayPauseButton();
    }
    
    // Toggle play/pause
    function togglePlayPause() {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    }
    
    // Update play/pause button icon
    function updatePlayPauseButton() {
        const playIcon = playPauseBtnViz.querySelector('.play-icon');
        const pauseIcon = playPauseBtnViz.querySelector('.pause-icon');
        
        if (isPlaying) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            playPauseBtnViz.setAttribute('aria-label', 'Pause');
        } else {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            playPauseBtnViz.setAttribute('aria-label', 'Play');
        }
    }
    
    // Next track
    function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack();
        if (isPlaying) {
            playTrack();
        }
    }
    
    // Previous track
    function prevTrack() {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack();
        if (isPlaying) {
            playTrack();
        }
    }
    
    // Toggle playlist modal
    function togglePlaylistModal() {
        playlistModal.classList.toggle('open');
    }
    
    // Close playlist modal
    function closePlaylistModal() {
        playlistModal.classList.remove('open');
    }
    
    // Auto-play next track when current ends
    audio.addEventListener('ended', () => {
        nextTrack();
    });
    
    // Event listeners for playback controls
    playPauseBtnViz.addEventListener('click', togglePlayPause);
    nextBtnViz?.addEventListener('click', nextTrack);
    prevBtnViz?.addEventListener('click', prevTrack);
    
    // Event listeners for playlist modal
    playlistToggle?.addEventListener('click', togglePlaylistModal);
    playlistCloseBtn?.addEventListener('click', closePlaylistModal);
    
    // Close playlist when clicking outside
    playlistModal?.addEventListener('click', (e) => {
        if (e.target === playlistModal) {
            closePlaylistModal();
        }
    });
    
    // Initialize
    loadTrack();
    updatePlaylistDisplay();
    
    console.log('Ambient music visualizer initialized with', playlist.length, 'tracks');
})();
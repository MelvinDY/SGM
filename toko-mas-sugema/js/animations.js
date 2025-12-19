/* ============================================
   TOKO MAS SUGEMA - Animations JavaScript
   Custom Animation Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initParallaxEffect();
    initCounterAnimation();
    initTypewriterEffect();
    initImageReveal();
    initGoldShimmer();
});

/* ============================================
   PARALLAX EFFECT
   ============================================ */
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax-bg, .hero-bg');

    if (parallaxElements.length === 0) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;

        parallaxElements.forEach(element => {
            const speed = element.dataset.parallaxSpeed || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-counter]');

    if (counters.length === 0) return;

    const animateCounter = (counter) => {
        const target = parseInt(counter.dataset.counter);
        const duration = parseInt(counter.dataset.duration) || 2000;
        const start = 0;
        const increment = target / (duration / 16);

        let current = start;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

/* ============================================
   TYPEWRITER EFFECT
   ============================================ */
function initTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('[data-typewriter]');

    if (typewriterElements.length === 0) return;

    typewriterElements.forEach(element => {
        const text = element.dataset.typewriter;
        const speed = parseInt(element.dataset.speed) || 100;
        let index = 0;

        element.textContent = '';

        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        };

        // Start typing when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                    entry.target.classList.add('typed');
                    type();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(element);
    });
}

/* ============================================
   IMAGE REVEAL ANIMATION
   ============================================ */
function initImageReveal() {
    const revealImages = document.querySelectorAll('[data-reveal]');

    if (revealImages.length === 0) return;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const direction = entry.target.dataset.reveal || 'up';
                entry.target.classList.add('revealed', `reveal-${direction}`);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    revealImages.forEach(image => revealObserver.observe(image));
}

/* ============================================
   GOLD SHIMMER EFFECT
   ============================================ */
function initGoldShimmer() {
    const shimmerElements = document.querySelectorAll('.shimmer-on-hover');

    shimmerElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('shimmer-active');
        });

        element.addEventListener('mouseleave', function() {
            this.classList.remove('shimmer-active');
        });
    });

    // Auto shimmer for hero title
    const heroTitle = document.querySelector('.hero-title .gold-text');
    if (heroTitle) {
        setInterval(() => {
            heroTitle.classList.add('shimmer-effect');
            setTimeout(() => {
                heroTitle.classList.remove('shimmer-effect');
            }, 2000);
        }, 5000);
    }
}

/* ============================================
   STAGGER ANIMATION FOR GRIDS
   ============================================ */
function initStaggerAnimation() {
    const staggerContainers = document.querySelectorAll('[data-stagger]');

    staggerContainers.forEach(container => {
        const children = container.children;
        const delay = parseInt(container.dataset.stagger) || 100;

        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('stagger-visible');
                        }, index * delay);
                    });
                    staggerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        staggerObserver.observe(container);
    });
}

/* ============================================
   MAGNETIC BUTTON EFFECT
   ============================================ */
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.btn-magnetic');

    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

/* ============================================
   CURSOR GLOW EFFECT
   ============================================ */
function initCursorGlow() {
    const glowAreas = document.querySelectorAll('[data-cursor-glow]');

    glowAreas.forEach(area => {
        area.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.style.setProperty('--cursor-x', `${x}px`);
            this.style.setProperty('--cursor-y', `${y}px`);
        });
    });
}

/* ============================================
   TILT EFFECT FOR CARDS
   ============================================ */
function initTiltEffect() {
    const tiltCards = document.querySelectorAll('[data-tilt]');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

/* ============================================
   SCROLL PROGRESS INDICATOR
   ============================================ */
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');

    if (!progressBar) return;

    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

/* ============================================
   INTERSECTION OBSERVER UTILITY
   ============================================ */
function createObserver(callback, options = {}) {
    const defaultOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
}

/* ============================================
   ANIMATION ON SCROLL - CUSTOM IMPLEMENTATION
   ============================================ */
function initCustomAOS() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    const animateObserver = createObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animation = entry.target.dataset.animate;
                const delay = entry.target.dataset.delay || 0;

                setTimeout(() => {
                    entry.target.classList.add('animated', animation);
                }, parseInt(delay));

                animateObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach(element => {
        animateObserver.observe(element);
    });
}

/* ============================================
   SMOOTH NUMBER TRANSITION
   ============================================ */
function animateValue(element, start, end, duration) {
    const startTimestamp = performance.now();

    const step = (timestamp) => {
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOut);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };

    requestAnimationFrame(step);
}

/* ============================================
   EXPORT FUNCTIONS (for use in other files)
   ============================================ */
window.TokoMasAnimations = {
    initParallaxEffect,
    initCounterAnimation,
    initTypewriterEffect,
    initImageReveal,
    initGoldShimmer,
    initStaggerAnimation,
    initMagneticButtons,
    initCursorGlow,
    initTiltEffect,
    initScrollProgress,
    animateValue
};

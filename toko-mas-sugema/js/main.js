/* ============================================
   TOKO MAS SUGEMA - Main JavaScript
   Navigation, Scroll Effects & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initTestimonialSlider();
    initBackToTop();
    initSmoothScroll();
    initAOS();
});

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.classList.contains('active')) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggle = navToggle.contains(event.target);

            if (!isClickInsideMenu && !isClickOnToggle) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });

    // Navbar scroll effect
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;

        if (navbar) {
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        lastScrollY = currentScrollY;
    });
}

/* ============================================
   SCROLL EFFECTS
   ============================================ */
function initScrollEffects() {
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealOnScroll = function() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load
}

/* ============================================
   TESTIMONIAL SLIDER
   ============================================ */
function initTestimonialSlider() {
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dots = document.querySelectorAll('.dot');

    if (!track || !prevBtn || !nextBtn) return;

    const cards = track.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    const totalCards = cards.length;
    let autoSlideInterval;

    // Update slider position
    function updateSlider() {
        const translateX = -currentIndex * 100;
        track.style.transform = `translateX(${translateX}%)`;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex < 0) currentIndex = totalCards - 1;
        if (currentIndex >= totalCards) currentIndex = 0;
        updateSlider();
    }

    // Next slide
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    // Previous slide
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners
    nextBtn.addEventListener('click', function() {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', function() {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopAutoSlide();
            goToSlide(index);
            startAutoSlide();
        });
    });

    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    }, { passive: true });

    track.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
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
        }
    }

    // Pause on hover
    track.addEventListener('mouseenter', stopAutoSlide);
    track.addEventListener('mouseleave', startAutoSlide);

    // Initialize
    updateSlider();
    startAutoSlide();
}

/* ============================================
   BACK TO TOP BUTTON
   ============================================ */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   AOS (ANIMATE ON SCROLL) INITIALIZATION
   ============================================ */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100,
            delay: 0,
            disable: function() {
                // Disable on mobile if performance is an issue
                return window.innerWidth < 768 && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            }
        });
    }
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Format phone number for WhatsApp
function formatWhatsAppNumber(number) {
    // Remove all non-numeric characters
    let cleaned = number.replace(/\D/g, '');

    // Add country code if not present
    if (cleaned.startsWith('0')) {
        cleaned = '62' + cleaned.substring(1);
    }

    return cleaned;
}

// Create WhatsApp chat link
function createWhatsAppLink(number, message = '') {
    const formattedNumber = formatWhatsAppNumber(number);
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
}

/* ============================================
   LAZY LOADING IMAGES (Native)
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    // Check for native lazy loading support
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        const lazyLoad = function() {
            lazyImages.forEach(img => {
                if (isInViewport(img)) {
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('loading');
                }
            });
        };

        window.addEventListener('scroll', throttle(lazyLoad, 200));
        lazyLoad();
    }
});

/* ============================================
   FORM VALIDATION (For Contact Page)
   ============================================ */
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }

        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                input.classList.add('error');
            }
        }

        // Phone validation
        if (input.type === 'tel' && input.value) {
            const phoneRegex = /^[0-9+\-\s()]{10,}$/;
            if (!phoneRegex.test(input.value)) {
                isValid = false;
                input.classList.add('error');
            }
        }
    });

    return isValid;
}

/* ============================================
   PRELOADER (Optional)
   ============================================ */
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('loaded');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

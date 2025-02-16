// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    let isScrolling = false;

    // ==================
    // Animation Handlers
    // ==================

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(element => {
        fadeInObserver.observe(element);
    });

    // ==================
    // Navbar Handlers
    // ==================

    // Update navbar appearance on scroll
    const updateNavbar = () => {
        if (isScrolling) return;
        isScrolling = true;

        requestAnimationFrame(() => {
            const scrollY = window.scrollY;

            // Add/remove background when scrolling
            if (scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }

            // Update active section in navbar
            const sections = document.querySelectorAll('section[id]');
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                const sectionBottom = sectionTop + sectionHeight;

                if (scrollY >= sectionTop && scrollY < sectionBottom) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${section.id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });

            lastScrollY = scrollY;
            isScrolling = false;
        });
    };

    // Throttled scroll event listener
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            updateNavbar();
        });
    });

    // ==================
    // Smooth Scrolling
    // ==================

    // Handle smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return; // Skip empty anchors

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }

                // Update URL without scrolling
                window.history.pushState(null, '', targetId);
            }
        });
    });

    // ==================
    // Interactive Elements
    // ==================

    // Skill tags hover effect
    const addHoverEffect = (elements, className) => {
        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add(className);
            });
            
            element.addEventListener('mouseleave', () => {
                element.classList.remove(className);
            });
        });
    };

    // Add hover effects to various elements
    addHoverEffect(document.querySelectorAll('.skill-tag'), 'hover');
    addHoverEffect(document.querySelectorAll('.course-tag'), 'hover');
    addHoverEffect(document.querySelectorAll('.award-card'), 'hover');

    // ==================
    // Statistics Animation
    // ==================

    // Animate statistics numbers
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = currentValue;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Observe statistics elements
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    const endValue = parseInt(statNumber.getAttribute('data-value'));
                    animateValue(statNumber, 0, endValue, 2000);
                    statNumber.classList.add('animated');
                }
            }
        });
    }, observerOptions);

    // Observe all stat cards
    document.querySelectorAll('.stat-card').forEach(stat => {
        statsObserver.observe(stat);
    });

    // ==================
    // Responsive Handlers
    // ==================

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(() => {
            // Update any necessary responsive elements
            updateNavbar();
            
            // Recalculate section positions if needed
            const sections = document.querySelectorAll('section[id]');
            sections.forEach(section => {
                section.setAttribute('data-offset', section.offsetTop);
            });
        }, 250);
    });

    // ==================
    // Initial Setup
    // ==================

    // Initial navbar update
    updateNavbar();

    // Initialize tooltips if using Bootstrap
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Add scroll padding for smooth scrolling
    document.documentElement.style.scrollPaddingTop = `${navbar.offsetHeight}px`;
});

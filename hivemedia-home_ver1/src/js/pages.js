/**
 * HIVEMEDIA - Pages JavaScript
 * Shared functionality for about, services, portfolio, contact pages
 */

// ======================================
// CUSTOM CURSOR
// ======================================
const cursor = document.querySelector('.cursor');
const cursorInner = document.querySelector('.cursor__inner');

if (cursor && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.opacity = '1';
    });

    // Cursor states
    document.querySelectorAll('a, button, .portfolio-card, .service-card, .bento-card, .team-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor--hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor--hover');
        });
    });
}

// ======================================
// GSAP ANIMATIONS
// ======================================
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Fade in sections
    gsap.utils.toArray('.section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                once: true
            }
        });
    });

    // Stagger cards
    gsap.utils.toArray('.vision-card, .team-card, .stat-card, .service-card, .portfolio-card, .process-step, .location-card').forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                once: true
            }
        });
    });

    // Hero animations
    gsap.from('.page-hero__title', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
    });

    gsap.from('.page-hero__subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out'
    });
}

// ======================================
// PORTFOLIO FILTER
// ======================================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Filter cards
            portfolioCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    gsap.from(card, {
                        opacity: 0,
                        y: 20,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ======================================
// CONTACT FORM
// ======================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Simple validation
        if (!data.name || !data.phone || !data.service || !data.message) {
            alert('필수 항목을 모두 입력해주세요.');
            return;
        }

        // Show success (in real app, would send to server)
        alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
        contactForm.reset();

        // In real implementation, send to server:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
    });
}

// ======================================
// HEADER SCROLL EFFECT
// ======================================
const header = document.querySelector('.header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });
}

// ======================================
// MOBILE MENU (Simple version)
// ======================================
const burger = document.querySelector('.header__burger');

if (burger) {
    burger.addEventListener('click', () => {
        // Simple mobile menu - redirect to home for full menu
        window.location.href = 'index.html#menu';
    });
}

// ======================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ======================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

console.log('✅ Pages JavaScript loaded');

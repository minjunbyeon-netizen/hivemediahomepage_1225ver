/**
 * Frontend Woman - JavaScript Clone for Study
 * Based on: https://frontend-w.com/
 * 
 * This file contains the main JavaScript functionality including:
 * - Custom cursor
 * - Preloader
 * - Smooth scrolling
 * - GSAP animations
 * - ScrollTrigger animations
 * - Mobile menu
 * - Calculator
 * 
 * NOTE: This file works with content-loader.js which loads text content from JSON
 */

// ======================================
// GLOBAL VARIABLES
// ======================================
window.SCROLL_EL = 'html';
window.LARGE_TABLET = '1023';
window.its_desktop = document.querySelector('body').clientWidth > window.LARGE_TABLET;
window.PRELOADER_DELAY = document.querySelector('.preloader') ? 3800 : 0;
window.PRELOADER = true;
window.CONTENT_LOADED = false;

// ======================================
// CONTENT LOADED HANDLER
// ======================================
// Wait for content to be loaded from JSON before initializing dynamic features
document.addEventListener('contentLoaded', function (e) {
    window.CONTENT_LOADED = true;
    console.log('✅ Content loaded, initializing dynamic features...');

    // Initialize features that depend on dynamic content
    initDynamicFeatures();
});

/**
 * Initialize features that depend on dynamically loaded content
 */
function initDynamicFeatures() {
    // Initialize calculator sliders (content is now loaded)
    initCalculator();

    // Initialize tilt effects on dynamically created elements
    initTiltEffects();

    // Initialize cursor events on dynamically created elements
    initDynamicCursorEvents();

    // Re-init link hover effects
    initLinkHover();

    // Initialize mobile menu (burger button is now in DOM)
    initMobileMenu();

    // Refresh ScrollTrigger after content is loaded
    if (typeof ScrollTrigger !== 'undefined') {
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
    }
}

// ======================================
// PRELOADER
// ======================================
if (document.querySelector('.preloader')) {
    const preloader = document.querySelector('.preloader');
    const numbersWrap = document.querySelector('.preloader__numbers-wrap > div');
    const blicks = document.querySelectorAll('.preloader__text-blick');

    // Blinking animation for text
    function animateBlicks() {
        const delays1 = [...blicks].map(() => Math.random() * 0.75);
        const maxDelay1 = Math.max(...delays1) + 1.5;
        const delays2 = [...blicks].map(() => Math.random() * 0.75);
        const duration = maxDelay1 + 3.5;

        const tl = gsap.timeline({ onComplete: animateBlicks });

        blicks.forEach((blick, i) => {
            tl.fromTo(blick,
                { opacity: 0 },
                { opacity: 1, duration: 1.5, delay: delays1[i], ease: 'power2.in' }, 0);
            tl.to(blick,
                { opacity: 0, duration: 1.5, delay: delays2[i], ease: 'power2.out' }, duration);
        });
    }
    animateBlicks();

    // Number counter animation
    const preloaderTl = gsap.timeline();

    preloaderTl
        .to(numbersWrap, { y: '-25%', duration: 0.75, ease: 'power1.inOut' }, 1.33)
        .to(numbersWrap, { y: '-50%', duration: 0.75, ease: 'power1.inOut' }, 2.66)
        .to(numbersWrap, {
            y: '-75%',
            duration: 0.75,
            ease: 'power1.inOut',
            onComplete: function () {
                gsap.fromTo('.preloader__text, .preloader__numbers-wrap, .preloader__numbers-span',
                    { opacity: 1 },
                    { opacity: 0, duration: 0.5 });
                gsap.fromTo(preloader,
                    { opacity: 1 },
                    { opacity: 0, duration: 0.8 });

                setTimeout(() => {
                    preloader.remove();
                    window.PRELOADER = false;
                    if (document.querySelector('.main-screen') && window.showMainScreen) {
                        window.showMainScreen();
                    }
                }, 1000);
            }
        }, 4);

    preloaderTl.fromTo('.preloader__numbers',
        { opacity: 0 },
        { opacity: 1, duration: 0.75, ease: 'power1.inOut', delay: 1 }, 0);
}

// ======================================
// CUSTOM CURSOR
// ======================================
if (window.its_desktop && document.querySelector('.cursor')) {
    const cursor = document.querySelector('.cursor');
    const cursorVideo = document.querySelector('.cursor__video');
    const cursorWorks = document.querySelector('.cursor__works');
    const cursorShow = document.querySelector('.cursor__show');
    const cursorShowText = document.querySelector('.cursor__show p');
    const cursorArrow = document.querySelector('.cursor__arrow');

    gsap.to(cursor, { opacity: 1 });

    let currentScale = 0;
    const baseScale = 0.5;
    const worksScale = 2;
    const transitionDuration = 2;

    const moveCursor = (e, duration) => {
        gsap.to(cursor, duration, { x: e.clientX, y: e.clientY });
    };

    function handleMouseMove(e) {
        const isMainScreenVideo = $(e.target).closest('.main-screen__video').length > 0;
        const isWorksList = $(e.target).closest('.works__list').length > 0;

        let targetScale = 0;
        if (isMainScreenVideo) {
            targetScale = baseScale;
        } else if (isWorksList) {
            targetScale = worksScale;
        }

        if (currentScale !== targetScale) {
            gsap.to({ val: currentScale }, {
                val: targetScale,
                duration: transitionDuration,
                onUpdate: function () {
                    currentScale = this.targets()[0].val;
                }
            });
        }

        moveCursor(e, currentScale);
    }

    $(document).on('mousemove', handleMouseMove);

    // Cursor hover functions
    window.hoverFunc = function (e) {
        gsap.to(cursor, 0.3, { width: '6rem', height: '6rem', right: '-2.5rem', left: '-2.5rem' });
    };

    window.unhoverFunc = function (e) {
        gsap.to(cursor, 0.3, { width: '2.5rem', height: '2.5rem', top: '-1.25rem', left: '-1.25rem' });
    };

    window.iconFunc = function (e) {
        gsap.to(cursor, 0.3, { width: '8rem', height: '8rem', top: '-4rem', left: '-4rem' });
        gsap.to(cursorVideo, 0.3, { opacity: 1 });
        cursor.classList.add('cursor--icon');
    };

    window.uniconFunc = function (e) {
        gsap.to(cursor, 0.3, { width: '2.5rem', height: '2.5rem', top: '-1.25rem', left: '-1.25rem' });
        gsap.to(cursorVideo, 0.3, { opacity: 0 });
        cursor.classList.remove('cursor--icon');
    };

    window.worksFunc = function (e) {
        gsap.to(cursor, 0.3, { width: '50rem', height: '50rem', top: '-20rem', left: '-15rem' });
        gsap.to(cursorWorks, 0.3, { opacity: 1 });
        cursor.classList.add('cursor--works');
    };

    window.unworksFunc = function (e) {
        gsap.to(cursor, 0.3, { width: '2.5rem', height: '2.5rem', top: '-1.25rem', left: '-1.25rem' });
        gsap.to(cursorWorks, 0.3, { opacity: 0 });
        cursor.classList.remove('cursor--works');
    };

    window.arrowFunc = function (e) {
        gsap.to(cursor, 0.3, { width: '8rem', height: '8rem', top: '-4rem', left: '-4rem' });
        gsap.to(cursorArrow, 0.3, { opacity: 1 });
        cursor.classList.add('cursor--icon');
    };

    window.unarrowFunc = function (e) {
        gsap.to(cursor, 0.3, { width: '2.5rem', height: '2.5rem', top: '-1.25rem', left: '-1.25rem' });
        gsap.to(cursorArrow, 0.3, { opacity: 0 });
        cursor.classList.remove('cursor--icon');
    };

    window.showFunc = function (e) {
        gsap.to(cursor, 0.3, { width: '8rem', height: '8rem', top: '-4rem', left: '-4rem' });
        gsap.to(cursorShow, 0.3, { opacity: 1 });
        gsap.to(cursorShowText, 0.3, { opacity: 1, delay: 0.1 });
        cursor.classList.add('cursor--show');
    };

    window.unshowFunc = function (e) {
        gsap.to(cursor, 0.3, { width: '2.5rem', height: '2.5rem', top: '-1.25rem', left: '-1.25rem' });
        gsap.to(cursorShowText, 0.3, { opacity: 0 });
        gsap.to(cursorShow, 0.3, { opacity: 0 });
        cursor.classList.remove('cursor--show');
    };

    window.btnFunc = function (e) {
        cursor.classList.add('cursor--btn');
    };

    window.unbtnFunc = function (e) {
        cursor.classList.remove('cursor--btn');
    };

    // Event bindings
    $('.cursor-works').hover(worksFunc, unworksFunc);
    $('.cursor-video').hover(iconFunc, uniconFunc);
    $('.cursor-show').hover(showFunc, unshowFunc);
    $('.cursor-arrow').hover(arrowFunc, unarrowFunc);
    $('.cursor-hover').hover(hoverFunc, unhoverFunc);
    $('.cursor-btn').hover(btnFunc, unbtnFunc);
}

// ======================================
// HEADER
// ======================================
if (document.querySelector('header')) {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    function handleScroll() {
        let scrollTop = window.its_desktop && window.scrollbar ? window.scrollbar.scrollTop : window.scrollY;
        const threshold = document.querySelector('.main-screen') ? window.innerHeight : 200;

        if (scrollTop > threshold) {
            header.classList.add('header--fixed');
        } else {
            header.classList.remove('header--fixed');
        }

        if (scrollTop > lastScrollTop && scrollTop > threshold) {
            // Scrolling down - hide header
        } else {
            gsap.to(header, { opacity: 1, duration: 1, ease: 'power2.out' });
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }

    if (window.its_desktop && window.scrollbar) {
        window.scrollbar.addListener(handleScroll);
    } else {
        window.addEventListener('scroll', handleScroll);
    }
}

// ======================================
// MOBILE MENU
// ======================================
function initMobileMenu() {
    const burger = document.querySelector('.header__burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMobile = document.querySelector('.mobile-menu__close--mobile');
    const closeDesktop = document.querySelector('.mobile-menu__close--desktop');

    if (!burger || !mobileMenu) {
        console.log('❌ Mobile menu elements not found');
        return;
    }

    console.log('✅ Mobile menu elements found, initializing...');

    let isMenuOpen = false;
    const menuTimeline = gsap.timeline({ paused: true });

    menuTimeline
        .to('.mobile-menu', { duration: 1, height: '100%', display: 'flex', ease: 'power2.out' }, 0)
        .fromTo(['.mobile-menu .links__item span'],
            { opacity: 0, y: '100%' },
            { stagger: { amount: 0.5 }, y: '0%', opacity: 1, duration: 1, delay: 0.5, ease: 'power2.out' }, 0)
        .fromTo(['.mobile-menu .features span, .mobile-menu__socials-link, .mobile-menu__email, .mobile-menu__close'],
            { opacity: 0 },
            { opacity: 1, duration: 1, delay: 1, stagger: { each: 0.15 } }, 0)
        .fromTo(['.mobile-menu .simple-title span'],
            { opacity: 0 },
            { opacity: 1, duration: 1.5, delay: 1 }, 0);

    // Open menu function
    window.showMenu = function () {
        if (isMenuOpen) return;
        isMenuOpen = true;
        mobileMenu.classList.add('mobile-menu--active');
        menuTimeline.timeScale(1).play();
        if (!window.its_desktop) {
            document.body.classList.add('scroll');
        }
        console.log('✅ Menu opened');
    };

    // Close menu function
    window.hideMenu = function () {
        if (!isMenuOpen) return;
        isMenuOpen = false;
        menuTimeline.timeScale(1.75).reverse();
        if (!window.its_desktop) {
            document.body.classList.remove('scroll');
        }
        // Remove active class after animation completes
        setTimeout(() => {
            mobileMenu.classList.remove('mobile-menu--active');
        }, 600);
        console.log('✅ Menu closed');
    };

    // Burger click - toggle menu
    burger.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('🍔 Burger clicked, isMenuOpen:', isMenuOpen);
        if (isMenuOpen) {
            window.hideMenu();
        } else {
            window.showMenu();
        }
    });

    if (closeMobile) closeMobile.addEventListener('click', window.hideMenu);
    if (closeDesktop) closeDesktop.addEventListener('click', window.hideMenu);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') window.hideMenu();
    });

    console.log('✅ Mobile menu initialized successfully');
}

// Note: initMobileMenu is called from initDynamicFeatures() after content is loaded


// ======================================
// ANCHOR SCROLLING
// ======================================
window.addLoadEvent = function (func) {
    const oldOnload = window.onload;
    if (typeof window.onload !== 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            if (oldOnload) oldOnload();
            func();
        };
    }
};

function checkHash() {
    if (window.location.hash && window.location.hash.startsWith('#anchor')) {
        const id = window.location.hash.replace('#anchor', '');
        if (id) scrollToAnchor(id, true);
    }
}

function scrollToAnchor(id, isInitial) {
    const target = $('#' + id);
    if (target.length) {
        if (window.its_desktop && window.scrollbar) {
            if (isInitial) window.scrollbar._init();
            const scrollTop = target.offset().top + window.scrollbar.scrollTop;
            const offset = target.outerHeight() < $(window).height()
                ? ($(window).height() - target.outerHeight()) / 2
                : (target.attr('data-anchor-offset') || 50);
            window.scrollbar.scrollTo(0, scrollTop - offset, 1500);
        } else {
            $(window.SCROLL_EL).animate({ scrollTop: target.offset().top }, 1500);
        }

        if (document.querySelector('.header__burger')) {
            window.hideMenu();
        }
        history.replaceState(null, '', window.location.pathname + window.location.search);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    window.addLoadEvent(checkHash);
});

$('.anchors a:not([data-anchors]), .single-anchors').on('click', function (e) {
    e.preventDefault();
    let href = $(this).attr('href');

    if (href.indexOf('#') === -1) {
        scrollToAnchor(href);
    } else {
        const path = href.substring(0, href.indexOf('#'));
        const id = href.substr(href.indexOf('#') + 1);

        if (document.querySelector('#' + id)) {
            scrollToAnchor(id);
        } else {
            const newUrl = path + '#anchor' + id;
            setTimeout(() => { location.href = newUrl; }, 250);
        }
    }
});

// ======================================
// CALCULATOR
// ======================================
function initCalculator() {
    if (!document.querySelector('.calc')) return;

    const slider1 = document.getElementById('slider1');
    const slider2 = document.getElementById('slider2');

    // Only proceed if sliders exist (content has been loaded)
    if (!slider1 || !slider2) {
        console.log('Calculator sliders not found, skipping initialization');
        return;
    }

    const config = {
        sliders: ['slider1', 'slider2'],
        calculate: (rate, hours) => hours * ((1.23 - 0.006 * (rate - 25)) * rate - 25)
    };

    const sliderConfigs = [
        {
            sliderId: 'slider1',
            displayId: 'display1',
            resultId: 'result',
            formula: { ...config, calculate: (rate, hours) => 12 * config.calculate(rate, hours) }
        },
        {
            sliderId: 'slider2',
            displayId: 'display2',
            resultId: 'result',
            formula: { ...config, calculate: (rate, hours) => 12 * config.calculate(rate, hours) }
        }
    ];

    sliderConfigs.forEach(cfg => {
        initSlider(cfg.sliderId, cfg.displayId, cfg.resultId, cfg.formula);
    });

    function initSlider(sliderId, displayId, resultId, formula) {
        const slider = document.getElementById(sliderId);
        const display = document.getElementById(displayId);
        const result = document.getElementById(resultId);

        if (!slider || !display || !result) return;

        function updateSlider() {
            display.textContent = slider.value;

            // Update slider progress
            const progress = (slider.value - slider.min) / (slider.max - slider.min) * 100;
            slider.style.setProperty('--slider-progress', progress + '%');

            // Calculate result
            if (formula) {
                const values = formula.sliders.map(id => document.getElementById(id))
                    .filter(el => el)
                    .map(el => parseFloat(el.value));
                if (values.length === 2) {
                    const calculated = formula.calculate(...values, 20);
                    result.textContent = '$' + Math.round(calculated).toLocaleString();
                }
            }
        }

        slider.addEventListener('input', updateSlider);
        updateSlider();
    }

    console.log('✅ Calculator initialized');
}

// ======================================
// MAIN SCREEN ANIMATION
// ======================================
window.showMainScreen = function () {
    setTimeout(() => {
        document.querySelector('.main-screen__position > span').style.opacity = 1;
        document.querySelector('.main-screen__location').style.opacity = 1;
        document.querySelector('.main-screen__stack').style.opacity = 1;
    }, 500);

    const tl = gsap.timeline();
    tl.fromTo('.main-screen__nav-item, .header__logo, .header__burger',
        { opacity: 0 },
        { opacity: 1, duration: 1.25, delay: function () { return Math.random() * 1.75; }, ease: 'power2.in' }, 0);
    tl.to('.main-screen__image', { x: -6, duration: 6 }, 0);
};

if (window.PRELOADER === false && document.querySelector('.main-screen')) {
    window.showMainScreen();
}

// ======================================
// GSAP SCROLLTRIGGER ANIMATIONS
// ======================================
document.addEventListener('DOMContentLoaded', function () {
    gsap.registerPlugin(ScrollTrigger);

    // Main screen parallax (desktop only)
    if (window.its_desktop && document.querySelector('.main-screen')) {
        const mainTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.main-screen',
                start: 'bottom bottom',
                end: '+=700px',
                scrub: 1,
                pin: '.main-screen',
                pinSpacing: false
            }
        });

        mainTl.fromTo('.about',
            { clipPath: 'polygon(0 5%, 100% 5%, 100% 100%, 0 100%)' },
            { clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', delay: 0.3, duration: 0.7 }, 0);
        mainTl.fromTo('.about .simple-title, .about .features',
            { opacity: 0 },
            { opacity: 1, delay: 0.4, duration: 0.6 }, 0);
        mainTl.fromTo('.about__item:nth-child(2n-1)',
            { opacity: 0, y: '80px' },
            { y: '0%', opacity: 1, delay: 0.4, duration: 0.6 }, 0);
        mainTl.fromTo('.about__item:nth-child(2n)',
            { opacity: 0, y: '80px' },
            { y: '0%', opacity: 1, delay: 0.5, duration: 0.55 }, 0);
        mainTl.fromTo('.main-screen__bottom, .main-screen__position',
            { y: '0px', scale: 1, opacity: 1 },
            { y: '-30px', scale: 0.9, opacity: 0, duration: 0.4 }, 0);
        mainTl.fromTo('.main-screen__image',
            { scale: 1, y: '0px', filter: 'brightness(1) blur(0px)' },
            { filter: 'brightness(0.2) blur(10px)', scale: 1.1, duration: 0.8, y: '100px', ease: 'power2.in' }, 0);
        mainTl.fromTo('.main-screen__image',
            { opacity: 1 },
            { opacity: 0, duration: 0.5, delay: 0.5 }, 0);
        mainTl.fromTo('.main-screen__title, .main-screen__nav',
            { scale: 1 },
            { y: '+=30px', scale: 0.9, opacity: 0, duration: 0.25 }, 0);
    }

    // About section mission overlay
    if (document.querySelector('.about') && window.its_desktop) {
        const aboutTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.about__gsap',
                start: 'center center',
                end: '+=1000px',
                scrub: true,
                pin: true
            }
        });

        aboutTl.fromTo('.about .mission',
            { maskSize: '0%' },
            { duration: 1, maskSize: '1000%', ease: 'power1.in' }, 0);
        aboutTl.fromTo('.about__items',
            { opacity: 1 },
            { delay: 0.75, duration: 0.25, opacity: 0 }, 0);
        aboutTl.fromTo('.about .mission__text',
            { y: '110%' },
            { y: '0%', delay: 0.25, duration: 0.5, stagger: { amount: 0.5 } }, 0);
    }

    // Compare section counter
    if (document.querySelector('.compare')) {
        const counterWrap = document.querySelector('.compare__counter-wrap');
        const compareContent = document.querySelector('.compare__content');

        if (counterWrap && compareContent) {
            const offsetTop = counterWrap.getBoundingClientRect().top - compareContent.getBoundingClientRect().top;
            const pinDistance = document.querySelector('.compare__inner').clientHeight - 2 * offsetTop - counterWrap.clientHeight;

            const compareTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.compare__counter-wrap',
                    pin: true,
                    start: 'center center',
                    end: '+=' + pinDistance + 'px',
                    scrub: 1,
                    pinSpacing: false
                }
            });

            const counterObj = { val: 28 };
            compareTl.to(counterObj, {
                val: 99,
                duration: 1,
                onUpdate: () => {
                    document.querySelector('#counter').textContent = Math.floor(counterObj.val);
                },
                ease: 'none'
            });
        }

        // Compare items scale animation
        if (window.its_desktop) {
            gsap.utils.toArray('.compare__item .compare__text').forEach(text => {
                const isPositive = text.closest('.compare__list--positive');
                const isNegative = text.closest('.compare__list--negative');
                const xOffset = isPositive ? 25 : isNegative ? -25 : 0;

                gsap.set(text, { x: xOffset, scale: 1 });

                gsap.timeline({
                    scrollTrigger: {
                        trigger: text,
                        start: 'center-=80 center',
                        end: 'center+=170 center',
                        scrub: true
                    }
                })
                    .to(text, { x: 0, scale: 1.5, duration: 0.3 })
                    .to(text, { x: xOffset, scale: 1, duration: 0.3 });
            });
        }
    }

    // Footer animations
    if (document.querySelector('main footer') && window.its_desktop) {
        gsap.fromTo('main footer .simple-title span',
            { y: '110%', opacity: 0 },
            {
                y: '0%',
                opacity: 1,
                force3D: false,
                duration: 0.7,
                scrollTrigger: {
                    trigger: 'main footer .simple-title',
                    start: 'top bottom',
                    end: 'bottom bottom',
                    scrub: 2
                }
            });

        gsap.fromTo('main .footer__email, main .footer__nav-item, main .footer__designer',
            { y: '20px', opacity: 0 },
            {
                y: '0%',
                opacity: 1,
                scrollTrigger: {
                    trigger: 'main footer .simple-title',
                    start: 'top bottom',
                    end: 'bottom bottom',
                    scrub: 2
                },
                ease: 'power1.out',
                stagger: { each: 0.1 }
            });
    }

    ScrollTrigger.refresh();
});

// ======================================
// VANILLA TILT EFFECT
// ======================================
function initTiltEffects() {
    if (!window.its_desktop) return;

    const tiltElements = document.querySelectorAll('.tils-start');
    if (!tiltElements.length) return;

    tiltElements.forEach(function (element) {
        // Skip if already initialized
        if (element.vanillaTilt) return;

        const isCalcCard = element.classList.contains('calc__card');
        VanillaTilt.init(element, {
            max: 15,
            perspective: 1500,
            scale: 0.95,
            speed: 1000,
            transition: true,
            axis: null,
            reset: true,
            glare: true,
            'max-glare': isCalcCard ? 0.12 : 0.5,
            easing: 'cubic-bezier(.03,.98,.52,.99)'
        });
    });

    console.log('✅ Tilt effects initialized');
}

// ======================================
// DYNAMIC CURSOR EVENTS
// ======================================
function initDynamicCursorEvents() {
    if (!window.its_desktop) return;

    // Re-bind cursor events for dynamically created elements
    $('.cursor-works').off('mouseenter mouseleave').hover(window.worksFunc, window.unworksFunc);
    $('.cursor-video').off('mouseenter mouseleave').hover(window.iconFunc, window.uniconFunc);
    $('.cursor-show').off('mouseenter mouseleave').hover(window.showFunc, window.unshowFunc);
    $('.cursor-arrow').off('mouseenter mouseleave').hover(window.arrowFunc, window.unarrowFunc);
    $('.cursor-hover').off('mouseenter mouseleave').hover(window.hoverFunc, window.unhoverFunc);
    $('.cursor-btn').off('mouseenter mouseleave').hover(window.btnFunc, window.unbtnFunc);

    console.log('✅ Dynamic cursor events initialized');
}

// ======================================
// LINK HOVER EFFECT (Letter animation)
// ======================================
function splitLetters(element) {
    // Skip if already processed
    if (element.querySelector('.letter')) return;

    let text = element.textContent;
    if (!text.trim()) return;

    element.innerHTML = '<div></div>';
    element.querySelector('div').innerHTML = text.replace(/\S/g, "<span class='letter'>$&</span>");
}

function initLinkHover() {
    const hoverElements = document.querySelectorAll('.link-hover');
    if (hoverElements.length) {
        hoverElements.forEach(el => splitLetters(el));
        console.log('✅ Link hover effects initialized');
    }
}

// ======================================
// FORM SUBMISSION
// ======================================
$(document).ready(function () {
    $(document).on('submit', 'form', function (e) {
        e.preventDefault();

        const lang = navigator.language || navigator.userLanguage || 'unknown';
        let formData = $(this).serialize() + '&lang=' + encodeURIComponent(lang);

        $.ajax({
            type: 'POST',
            url: '/send.php',
            data: formData,
            success: function (response) {
                if (window.show_popup) {
                    window.show_popup('thank-you');
                }
                // Clear form fields
                ['name', 'social', 'email', 'country', 'message'].forEach(name => {
                    document.querySelectorAll(`[name="${name}"]`).forEach(el => el.value = '');
                });
            },
            error: function (xhr, status, error) {
                alert('Form Error, please try again or contact via email.');
            }
        });
    });
});

// ======================================
// ACCESSIBILITY
// ======================================
document.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
        const body = document.querySelector('body');
        if (body) body.classList.add('body--accessibility');
    }
});

document.addEventListener('mousedown', () => {
    const body = document.querySelector('body');
    if (body) body.classList.remove('body--accessibility');
});

const buttonRoles = document.querySelectorAll('[role="button"]');
if (buttonRoles.length) {
    buttonRoles.forEach(btn => {
        btn.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });
}

// ======================================
// MOBILE VIEWPORT FIX
// ======================================
if (!window.its_desktop) {
    const setVh = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
    };

    setVh();
    document.addEventListener('DOMContentLoaded', setVh);
    window.addEventListener('load', setVh);
}

// ======================================
// SCROLL HELPERS
// ======================================
window.stopScrollMobile = function () {
    if (!document.querySelector('body').classList.contains('scroll')) {
        document.querySelector('body').classList.add('scroll');
    }
};

window.startScrollMobile = function () {
    if (document.querySelector('body').classList.contains('scroll')) {
        document.querySelector('body').classList.remove('scroll');
    }
    if (document.querySelectorAll('.popup-wrap--active').length === 1) {
        document.querySelector('body').classList.remove('scroll');
    }
};

// ======================================
// HEADER VISIBILITY TOGGLE
// ======================================
window.toggleHeaderVisibility = function (visibility) {
    gsap.to('.header__wrap', { opacity: visibility, duration: 0.3 });
    document.querySelector('.header').style.pointerEvents = visibility === 1 ? 'initial' : 'none';
};

console.log('Frontend Woman Clone - JavaScript loaded successfully!');

// ======================================
// TEXT ANIMATIONS (from rules.json)
// ======================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function splitTextToLines(element, wrapWords = false) {
    if (!element) return;
    if (!element.dataset.originalHtml) {
        element.dataset.originalHtml = element.innerHTML.trim();
    }

    element.innerHTML = element.innerHTML.trim()
        .replace(/^\s+|\s+$/gm, '')
        .replace(/(<span\b[^>]*>[\s\S]*?<\/span>)|(\S+)/gi, (match, preserved, word) => {
            return preserved ? `<span class="preserved">${preserved}</span>` : `<span class="word">${word}</span>`;
        });

    const spans = Array.from(element.querySelectorAll('span.word, span.preserved'));
    let currentTop = 0;
    let result = '';

    requestAnimationFrame(() => {
        spans.forEach((span, index) => {
            const top = span.offsetTop;
            if (index !== 0 && top - currentTop > 5) {
                result += '</span></span> ';
            }
            if (index === 0 || top - currentTop > 5) {
                result += '<span class="anim-line-wrap"><span class="anim-line"> ';
                currentTop = top;
            }
            const content = span.classList.contains('preserved')
                ? span.innerHTML
                : wrapWords ? `<span class="word">${span.textContent}</span>` : span.textContent;
            result += content + ' ';
        });
        result += '</span></span>';
        element.innerHTML = result.trim();
        element.style.opacity = 1;
    });
}

function animateLines(element, options = {}) {
    const settings = { type: 'reveal', stagger: 0.2, duration: 1, ease: 'power2.out', y: 100, scrollTrigger: null, ...options };
    const lines = element.querySelectorAll('.anim-line');
    if (!lines.length) return;
    element.style.opacity = 1;

    if (settings.type === 'reveal') {
        gsap.fromTo(lines, { yPercent: settings.y }, {
            yPercent: 0, duration: settings.duration, stagger: { each: settings.stagger }, ease: settings.ease, scrollTrigger: settings.scrollTrigger
        });
    }
}

function initTextAnimations() {
    const els = document.querySelectorAll('[data-animate-text]');
    if (!els.length) return;
    els.forEach(el => splitTextToLines(el, el.dataset.animateText === 'title'));
    window.addEventListener('resize', debounce(() => {
        els.forEach(el => { if (el.dataset.originalHtml) { el.innerHTML = el.dataset.originalHtml; splitTextToLines(el, el.dataset.animateText === 'title'); } });
    }, 300));
    console.log('✅ Text animations initialized');
}

// ======================================
// HORIZONTAL GALLERY EFFECTS
// ======================================
function initHorizontalGallery() {
    const container = document.querySelector('.works__list');
    if (!container || !window.its_desktop) return;
    const items = container.querySelectorAll('.works__item');
    if (!items.length) return;

    items.forEach(item => {
        item.addEventListener('mouseover', () => {
            const id = item.dataset.image;
            document.querySelector('.works__block--active')?.classList.remove('works__block--active');
            document.querySelector(`.works__block[data-image="${id}"]`)?.classList.add('works__block--active');
        });
    });

    const titles = document.querySelectorAll('.works__block-title');
    window.addEventListener('mousemove', (e) => {
        const progress = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
        titles.forEach(title => {
            const span = title.querySelector('span:not(.works__block-title--plug)');
            if (!span) return;
            const maxMove = title.getBoundingClientRect().width - span.offsetWidth;
            gsap.to(span, { x: progress * maxMove, ease: 'power2.out', duration: 0.5, overwrite: 'auto' });
        });
    });
    console.log('✅ Horizontal gallery effects initialized');
}

// ======================================
// INIT ADVANCED EFFECTS
// ======================================
function initAdvancedEffects() {
    initTextAnimations();
    initHorizontalGallery();
}

document.addEventListener('contentLoaded', () => setTimeout(initAdvancedEffects, 200));
document.addEventListener('DOMContentLoaded', () => setTimeout(initAdvancedEffects, 500));

console.log('✅ Advanced effects modules loaded!');

/**
 * Hivemedia Homepage - Main JavaScript
 * 간소화된 버전: content-loader 제거, HTML에 직접 콘텐츠 작성
 */

// ======================================
// GLOBAL VARIABLES
// ======================================
window.SCROLL_EL = 'html';
window.LARGE_TABLET = '1023';
window.its_desktop = document.querySelector('body').clientWidth > window.LARGE_TABLET;
window.PRELOADER_DELAY = document.querySelector('.preloader') ? 3800 : 0;
window.PRELOADER = true;

// ======================================
// DOCUMENT READY
// ======================================
document.addEventListener('DOMContentLoaded', function () {
    console.log('✅ Document ready');

    // Initialize all features
    initPreloader();
    initCursor();
    initHeader();
    initMobileMenu();
    initLinkHover();
    initCalculator();
    initTiltEffects();
    initScrollAnimations();
    initAccessibility();
});

// ======================================
// PRELOADER
// ======================================
function initPreloader() {
    if (!document.querySelector('.preloader')) return;

    const preloader = document.querySelector('.preloader');
    const numbersWrap = document.querySelector('.preloader__numbers-wrap > div');
    const blicks = document.querySelectorAll('.preloader__text-blick');

    // Blinking animation
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
                    if (document.querySelector('.main-screen')) {
                        showMainScreen();
                    }
                }, 1000);
            }
        }, 4);

    preloaderTl.fromTo('.preloader__numbers',
        { opacity: 0 },
        { opacity: 1, duration: 0.75, ease: 'power1.inOut', delay: 1 }, 0);
}

// ======================================
// MAIN SCREEN ANIMATION
// ======================================
function showMainScreen() {
    setTimeout(() => {
        const position = document.querySelector('.main-screen__position > span');
        const location = document.querySelector('.main-screen__location');
        const stack = document.querySelector('.main-screen__stack');

        if (position) position.style.opacity = 1;
        if (location) location.style.opacity = 1;
        if (stack) stack.style.opacity = 1;
    }, 500);

    const tl = gsap.timeline();
    tl.fromTo('.main-screen__nav-item, .header__logo, .header__burger',
        { opacity: 0 },
        { opacity: 1, duration: 1.25, delay: () => Math.random() * 1.75, ease: 'power2.in' }, 0);
    tl.to('.main-screen__image', { x: -6, duration: 6 }, 0);
}

// ======================================
// CUSTOM CURSOR
// ======================================
function initCursor() {
    if (!window.its_desktop || !document.querySelector('.cursor')) return;

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

    const moveCursor = (e, duration) => {
        gsap.to(cursor, duration, { x: e.clientX, y: e.clientY });
    };

    function handleMouseMove(e) {
        const isMainScreenVideo = $(e.target).closest('.main-screen__video').length > 0;
        const isWorksList = $(e.target).closest('.works__list').length > 0;

        let targetScale = 0;
        if (isMainScreenVideo) targetScale = baseScale;
        else if (isWorksList) targetScale = worksScale;

        if (currentScale !== targetScale) {
            gsap.to({ val: currentScale }, {
                val: targetScale,
                duration: 2,
                onUpdate: function () {
                    currentScale = this.targets()[0].val;
                }
            });
        }

        moveCursor(e, currentScale);
    }

    $(document).on('mousemove', handleMouseMove);

    // Cursor hover functions
    window.hoverFunc = (e) => gsap.to(cursor, 0.3, { width: '6rem', height: '6rem', right: '-2.5rem', left: '-2.5rem' });
    window.unhoverFunc = (e) => gsap.to(cursor, 0.3, { width: '2.5rem', height: '2.5rem', top: '-1.25rem', left: '-1.25rem' });
    window.iconFunc = (e) => { gsap.to(cursor, 0.3, { width: '8rem', height: '8rem', top: '-4rem', left: '-4rem' }); gsap.to(cursorVideo, 0.3, { opacity: 1 }); cursor.classList.add('cursor--icon'); };
    window.uniconFunc = (e) => { gsap.to(cursor, 0.3, { width: '2.5rem', height: '2.5rem', top: '-1.25rem', left: '-1.25rem' }); gsap.to(cursorVideo, 0.3, { opacity: 0 }); cursor.classList.remove('cursor--icon'); };
    window.worksFunc = (e) => { gsap.to(cursor, 0.3, { width: '50rem', height: '50rem', top: '-20rem', left: '-15rem' }); gsap.to(cursorWorks, 0.3, { opacity: 1 }); cursor.classList.add('cursor--works'); };
    window.unworksFunc = (e) => { gsap.to(cursor, 0.3, { width: '2.5rem', height: '2.5rem', top: '-1.25rem', left: '-1.25rem' }); gsap.to(cursorWorks, 0.3, { opacity: 0 }); cursor.classList.remove('cursor--works'); };
    window.arrowFunc = (e) => { gsap.to(cursor, 0.3, { width: '8rem', height: '8rem', top: '-4rem', left: '-4rem' }); gsap.to(cursorArrow, 0.3, { opacity: 1 }); cursor.classList.add('cursor--icon'); };
    window.unarrowFunc = (e) => { gsap.to(cursor, 0.3, { width: '2.5rem', height: '2.5rem', top: '-1.25rem', left: '-1.25rem' }); gsap.to(cursorArrow, 0.3, { opacity: 0 }); cursor.classList.remove('cursor--icon'); };
    window.showFunc = (e) => { gsap.to(cursor, 0.3, { width: '8rem', height: '8rem', top: '-4rem', left: '-4rem' }); gsap.to(cursorShow, 0.3, { opacity: 1 }); gsap.to(cursorShowText, 0.3, { opacity: 1, delay: 0.1 }); cursor.classList.add('cursor--show'); };
    window.unshowFunc = (e) => { gsap.to(cursor, 0.3, { width: '2.5rem', height: '2.5rem', top: '-1.25rem', left: '-1.25rem' }); gsap.to(cursorShowText, 0.3, { opacity: 0 }); gsap.to(cursorShow, 0.3, { opacity: 0 }); cursor.classList.remove('cursor--show'); };
    window.btnFunc = (e) => cursor.classList.add('cursor--btn');
    window.unbtnFunc = (e) => cursor.classList.remove('cursor--btn');

    // Event bindings
    $('.cursor-works').hover(window.worksFunc, window.unworksFunc);
    $('.cursor-video').hover(window.iconFunc, window.uniconFunc);
    $('.cursor-show').hover(window.showFunc, window.unshowFunc);
    $('.cursor-arrow').hover(window.arrowFunc, window.unarrowFunc);
    $('.cursor-hover').hover(window.hoverFunc, window.unhoverFunc);
    $('.cursor-btn').hover(window.btnFunc, window.unbtnFunc);
}

// ======================================
// HEADER
// ======================================
function initHeader() {
    if (!document.querySelector('header')) return;

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
            // Scrolling down
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

    if (!burger || !mobileMenu) return;

    let isMenuOpen = false;
    const menuTimeline = gsap.timeline({ paused: true });

    menuTimeline
        .to('.mobile-menu', { duration: 1, height: '100%', display: 'flex', ease: 'power2.out' }, 0)
        .fromTo(['.mobile-menu .links__item span'],
            { opacity: 0, y: '100%' },
            { stagger: { amount: 0.5 }, y: '0%', opacity: 1, duration: 1, delay: 0.5, ease: 'power2.out' }, 0)
        .fromTo(['.mobile-menu .features span, .mobile-menu__socials a, .mobile-menu__email, .mobile-menu__close'],
            { opacity: 0 },
            { opacity: 1, duration: 1, delay: 1, stagger: { each: 0.15 } }, 0)
        .fromTo(['.mobile-menu .simple-title span'],
            { opacity: 0 },
            { opacity: 1, duration: 1.5, delay: 1 }, 0);

    window.showMenu = function () {
        if (isMenuOpen) return;
        isMenuOpen = true;
        mobileMenu.classList.add('mobile-menu--active');
        menuTimeline.timeScale(1).play();
        if (!window.its_desktop) {
            document.body.classList.add('scroll');
        }
    };

    window.hideMenu = function () {
        if (!isMenuOpen) return;
        isMenuOpen = false;
        menuTimeline.timeScale(1.75).reverse();
        if (!window.its_desktop) {
            document.body.classList.remove('scroll');
        }
        setTimeout(() => {
            mobileMenu.classList.remove('mobile-menu--active');
        }, 600);
    };

    burger.addEventListener('click', (e) => {
        e.preventDefault();
        if (isMenuOpen) window.hideMenu();
        else window.showMenu();
    });

    if (closeMobile) closeMobile.addEventListener('click', window.hideMenu);
    if (closeDesktop) closeDesktop.addEventListener('click', window.hideMenu);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') window.hideMenu();
    });
}

// ======================================
// LINK HOVER EFFECT
// ======================================
function splitLetters(element) {
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
    }
}

// ======================================
// CALCULATOR
// ======================================
function initCalculator() {
    if (!document.querySelector('.calc')) return;

    const slider1 = document.getElementById('slider1');
    const slider2 = document.getElementById('slider2');

    if (!slider1 || !slider2) return;

    function updateSliders() {
        const budget = parseFloat(slider1.value);
        const rate = parseFloat(slider2.value);

        document.getElementById('display1').textContent = budget;
        document.getElementById('display2').textContent = rate;

        // 간단한 계산 공식
        const result = Math.round(budget * 10000 * (rate / 100) * 12);
        document.getElementById('result').textContent = '₩' + result.toLocaleString();

        // Slider progress
        [slider1, slider2].forEach(slider => {
            const progress = (slider.value - slider.min) / (slider.max - slider.min) * 100;
            slider.style.setProperty('--slider-progress', progress + '%');
        });
    }

    slider1.addEventListener('input', updateSliders);
    slider2.addEventListener('input', updateSliders);
    updateSliders();
}

// ======================================
// TILT EFFECTS
// ======================================
function initTiltEffects() {
    if (!window.its_desktop) return;

    const tiltElements = document.querySelectorAll('.tils-start');
    if (!tiltElements.length) return;

    tiltElements.forEach(element => {
        if (element.vanillaTilt) return;

        VanillaTilt.init(element, {
            max: 15,
            perspective: 1500,
            scale: 0.95,
            speed: 1000,
            transition: true,
            glare: true,
            'max-glare': 0.12,
            easing: 'cubic-bezier(.03,.98,.52,.99)'
        });
    });
}

// ======================================
// SCROLL ANIMATIONS
// ======================================
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Main screen parallax
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

    // Compare counter
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
    }

    ScrollTrigger.refresh();
}

// ======================================
// ACCESSIBILITY
// ======================================
function initAccessibility() {
    document.addEventListener('keydown', e => {
        if (e.key === 'Tab') {
            document.body.classList.add('body--accessibility');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('body--accessibility');
    });
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
                alert('문의가 전송되었습니다. 감사합니다!');
                $('form')[0].reset();
            },
            error: function (xhr, status, error) {
                alert('전송 오류가 발생했습니다. 이메일로 문의해주세요.');
            }
        });
    });
});

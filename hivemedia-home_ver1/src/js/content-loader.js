/**
 * Content Loader - JSON to DOM Content Injection
 * 
 * This script loads content from config/content.json and injects it into the DOM
 * using data attributes for content binding.
 */

(function () {
    'use strict';

    // Content storage
    let content = null;

    // ======================================
    // UTILITY FUNCTIONS
    // ======================================

    /**
     * Get nested value from object using dot notation
     * @param {Object} obj - The object to search
     * @param {string} path - Dot notation path (e.g., "hero.title")
     * @returns {*} The value at the path
     */
    function getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : null;
        }, obj);
    }

    /**
     * Create element from template string
     * @param {string} html - HTML string
     * @returns {HTMLElement} Created element
     */
    function createElementFromHTML(html) {
        const template = document.createElement('template');
        template.innerHTML = html.trim();
        return template.content.firstChild;
    }

    // ======================================
    // CONTENT INJECTION FUNCTIONS
    // ======================================

    /**
     * Inject simple text content
     */
    function injectTextContent() {
        document.querySelectorAll('[data-content]').forEach(el => {
            const path = el.getAttribute('data-content');
            const value = getNestedValue(content, path);
            if (value !== null) {
                el.textContent = value;
            }
        });
    }

    /**
     * Inject href attributes
     */
    function injectHrefAttributes() {
        document.querySelectorAll('[data-href]').forEach(el => {
            const path = el.getAttribute('data-href');
            const prefix = el.getAttribute('data-href-prefix') || '';
            const value = getNestedValue(content, path);
            if (value !== null) {
                el.href = prefix + value;
            }
        });
    }

    /**
     * Inject preloader numbers
     */
    function injectPreloaderNumbers() {
        document.querySelectorAll('[data-content-list="preloader.numbers"]').forEach(el => {
            const numbers = getNestedValue(content, 'preloader.numbers');
            if (numbers && Array.isArray(numbers)) {
                el.innerHTML = numbers.map(num => `<span>${num}</span>`).join('');
            }
        });
    }

    /**
     * Inject header navigation
     */
    function injectHeaderNav() {
        // Desktop nav
        document.querySelectorAll('[data-nav="header.nav"]').forEach(el => {
            const navItems = getNestedValue(content, 'header.nav');
            if (navItems && Array.isArray(navItems)) {
                el.innerHTML = navItems.map(item =>
                    `<a href="${item.href}" class="header__nav-item single-anchors">${item.text}</a>`
                ).join('');
            }
        });

        // Hero nav
        document.querySelectorAll('[data-hero-nav="header.nav"]').forEach(el => {
            const navItems = getNestedValue(content, 'header.nav');
            if (navItems && Array.isArray(navItems)) {
                el.innerHTML = navItems.map(item =>
                    `<a href="${item.href}" class="main-screen__nav-item single-anchors">${item.text}</a>`
                ).join('');
            }
        });

        // Mobile nav
        document.querySelectorAll('[data-mobile-nav="header.nav"]').forEach(el => {
            const navItems = getNestedValue(content, 'header.nav');
            if (navItems && Array.isArray(navItems)) {
                el.innerHTML = navItems.map(item =>
                    `<div class="links__item">
                        <a href="${item.href}" class="links__text single-anchors"><span>${item.text}</span></a>
                    </div>`
                ).join('');
            }
        });

        // Footer nav
        document.querySelectorAll('[data-footer-nav="footer.nav"]').forEach(el => {
            const navItems = getNestedValue(content, 'footer.nav');
            if (navItems && Array.isArray(navItems)) {
                el.innerHTML = navItems.map(item =>
                    `<a href="${item.href}" class="footer__nav-item">${item.text}</a>`
                ).join('');
            }
        });

        // Header CTA buttons
        document.querySelectorAll('[data-header-cta="header.ctaButtons"]').forEach(el => {
            const buttons = getNestedValue(content, 'header.ctaButtons');
            if (buttons && Array.isArray(buttons)) {
                el.innerHTML = buttons.map(btn => {
                    const styleClass = btn.style === 'filled' ? 'header__cta-btn--filled' : 'header__cta-btn--outline';
                    const arrowIcon = btn.icon === 'arrow' ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2"/></svg>' : '';
                    return `<a href="${btn.href}" class="header__cta-btn ${styleClass}">${btn.text}${arrowIcon}</a>`;
                }).join('');
            }
        });
    }

    /**
     * Inject features
     */
    function injectFeatures() {
        // Mobile menu features
        document.querySelectorAll('[data-features="mobileMenu.features"]').forEach(el => {
            const features = getNestedValue(content, 'mobileMenu.features');
            if (features && Array.isArray(features)) {
                el.innerHTML = features.map(f => `<span>${f}</span>`).join('');
            }
        });

        // About features
        document.querySelectorAll('[data-features="about.features"]').forEach(el => {
            const features = getNestedValue(content, 'about.features');
            if (features && Array.isArray(features)) {
                el.innerHTML = features.map(f => `<span class="features__item">${f}</span>`).join('');
            }
        });
    }

    /**
     * Inject socials
     */
    function injectSocials() {
        // Mobile menu socials
        document.querySelectorAll('[data-socials="mobileMenu.socials"]').forEach(el => {
            const socials = getNestedValue(content, 'mobileMenu.socials');
            if (socials && Array.isArray(socials)) {
                el.innerHTML = socials.map(s =>
                    `<a href="${s.href}" class="mobile-menu__socials-link" target="_blank">${s.text}</a>`
                ).join('');
            }
        });

        // Footer socials
        document.querySelectorAll('[data-socials="footer.socials"]').forEach(el => {
            const socials = getNestedValue(content, 'footer.socials');
            if (socials && Array.isArray(socials)) {
                el.innerHTML = socials.map(s =>
                    `<a href="${s.href}" target="_blank" class="footer__socials-link">${s.text}</a>`
                ).join('');
            }
        });
    }

    /**
     * Inject hero stack
     */
    function injectHeroStack() {
        document.querySelectorAll('[data-stack="hero.stack"]').forEach(el => {
            const stack = getNestedValue(content, 'hero.stack');
            if (stack && Array.isArray(stack)) {
                el.innerHTML = stack.map(s => `<span>${s}</span>`).join('');
            }
        });
    }

    /**
 * Inject about items - 4 card grid with gradients
 */
    function injectAboutItems() {
        document.querySelectorAll('[data-about-items="about.items"]').forEach(el => {
            const items = getNestedValue(content, 'about.items');
            if (items && Array.isArray(items)) {
                el.innerHTML = items.map(item => {
                    // Tags HTML (for awards card)
                    let tagsHtml = '';
                    if (item.tags) {
                        tagsHtml = `<div class="about__item-tags">
                        ${item.tags.map(t => `<span class="about__item-tag">${t}</span>`).join('')}
                    </div>`;
                    }

                    // Gradient class based on color type
                    const gradientClass = item.gradient ? `about__item--${item.gradient}` : '';

                    return `<a href="${item.href}" class="about__item ${gradientClass}">
                    <div class="about__item-content">
                        <span class="about__item-title">${item.title}</span>
                        ${item.subtitle ? `<span class="about__item-subtitle">${item.subtitle}</span>` : ''}
                        ${item.desc ? `<span class="about__item-desc">${item.desc}</span>` : ''}
                        ${tagsHtml}
                    </div>
                </a>`;
                }).join('');
            }
        });
    }

    /**
 * Inject mission content - Scattered artistic text layout
 */
    function injectMission() {
        document.querySelectorAll('[data-mission="about.mission.lines"]').forEach(el => {
            const lines = getNestedValue(content, 'about.mission.lines');
            if (lines && Array.isArray(lines)) {
                el.innerHTML = lines.map(line => {
                    const texts = Array.isArray(line) ? line : [line];
                    return `<div class="mission__row">
                    ${texts.map(t => {
                        // Support both string and object formats
                        if (typeof t === 'string') {
                            return `<span class="mission__text">${t}</span>`;
                        } else {
                            const colorClass = t.color ? `mission__text--${t.color}` : '';
                            const alignClass = t.align ? `mission__text--${t.align}` : '';
                            return `<span class="mission__text ${colorClass} ${alignClass}">${t.text}</span>`;
                        }
                    }).join('')}
                </div>`;
                }).join('');
            }
        });
    }

    /**
     * Inject works section
     */
    function injectWorks() {
        // Works blocks (background with video)
        document.querySelectorAll('[data-works-blocks="works.projects"]').forEach(el => {
            const projects = getNestedValue(content, 'works.projects');
            if (projects && Array.isArray(projects)) {
                el.innerHTML = projects.map((p, i) =>
                    `<div class="works__block ${i === 0 ? 'works__block--active' : ''}" data-image="${p.id}">
                        <div class="works__block-title">
                            <span class="works__block-title--plug">${p.title}</span>
                            <span>${p.title}</span>
                        </div>
                        <video src="${p.video}" muted loop playsinline></video>
                    </div>`
                ).join('');
            }
        });

        // Works list (project cards)
        document.querySelectorAll('[data-works-list="works.projects"]').forEach(el => {
            const projects = getNestedValue(content, 'works.projects');
            if (projects && Array.isArray(projects)) {
                el.innerHTML = projects.map(p =>
                    `<a href="${p.href}" target="_blank" class="works__item cursor-works" data-image="${p.id}">
                        <div class="works__item-img">
                            <img src="${p.image}" alt="${p.title}">
                        </div>
                        <div class="works__item-info">
                            <span class="works__item-title">${p.title}</span>
                            <span class="works__item-type">${p.type}</span>
                        </div>
                    </a>`
                ).join('');
            }
        });
    }

    /**
     * Inject compare section
     */
    function injectCompare() {
        document.querySelectorAll('[data-compare="compare.columns"]').forEach(el => {
            const columns = getNestedValue(content, 'compare.columns');
            const counterText = getNestedValue(content, 'compare.counterText');

            if (columns) {
                const leftColumn = columns.left;
                const rightColumn = columns.right;

                el.innerHTML = `
                    <div class="compare__column compare__column--left">
                        <h3 class="compare__column-title">${leftColumn.title}</h3>
                        <ul class="compare__list compare__list--${leftColumn.type}">
                            ${leftColumn.items.map(item =>
                    `<li class="compare__item"><span class="compare__text">${item}</span></li>`
                ).join('')}
                        </ul>
                    </div>
                    <div class="compare__counter-wrap">
                        <div class="compare__counter">
                            <span id="counter">28</span>
                            <span>%</span>
                        </div>
                        <span class="compare__counter-text">${counterText}</span>
                    </div>
                    <div class="compare__column compare__column--right">
                        <h3 class="compare__column-title">${rightColumn.title}</h3>
                        <ul class="compare__list compare__list--${rightColumn.type}">
                            ${rightColumn.items.map(item =>
                    `<li class="compare__item"><span class="compare__text">${item}</span></li>`
                ).join('')}
                        </ul>
                    </div>
                `;
            }
        });
    }

    /**
     * Inject calculator section
     */
    function injectCalculator() {
        // Calculator title
        document.querySelectorAll('[data-calc-title="calculator.title"]').forEach(el => {
            const title = getNestedValue(content, 'calculator.title');
            if (title && Array.isArray(title)) {
                el.innerHTML = title.map(t => `<span class="mission__text">${t}</span>`).join('');
            }
        });

        // Calculator sliders
        document.querySelectorAll('[data-calc-sliders="calculator.sliders"]').forEach(el => {
            const sliders = getNestedValue(content, 'calculator.sliders');
            if (sliders && Array.isArray(sliders)) {
                el.innerHTML = sliders.map(s =>
                    `<div class="calc__card tils-start">
                        <div class="calc__card-header">
                            <span class="calc__card-title">${s.title}</span>
                            <span class="calc__card-value">${s.prefix}<span id="display${s.id.replace('slider', '')}">${s.default}</span>${s.suffix}</span>
                        </div>
                        <input type="range" id="${s.id}" min="${s.min}" max="${s.max}" value="${s.default}" class="calc__slider">
                    </div>`
                ).join('');
            }
        });
    }

    /**
     * Inject contact form
     */
    function injectContact() {
        document.querySelectorAll('[data-contact="contact"]').forEach(el => {
            const contact = getNestedValue(content, 'contact');
            if (contact) {
                const greeting = contact.greeting || [];
                const buttons = contact.buttons || [];

                el.innerHTML = `
                    <div class="contact__row">
                        ${greeting.map(g => `<span class="contact__text">${g}</span>`).join('')}
                    </div>
                    <div class="contact__row">
                        <span class="contact__text">${contact.nameLabel}</span>
                        <div class="contact__input-wrap">
                            <input type="text" name="name" class="contact__input" placeholder="${contact.namePlaceholder}" required>
                            <span class="contact__input-border"></span>
                        </div>
                    </div>
                    <div class="contact__row">
                        <span class="contact__text">${contact.socialLabel}</span>
                        <div class="contact__input-wrap">
                            <input type="text" name="social" class="contact__input contact__input--social" placeholder="${contact.socialPlaceholder}" required>
                            <span class="contact__input-border"></span>
                        </div>
                    </div>
                    <div class="contact__row">
                        <div class="contact__btns">
                            ${buttons.map((b, i) =>
                    `<button type="button" class="btn contact__btn contact__btn--${b.text.toLowerCase()} ${i === 0 ? 'btn--active' : ''}" 
                                    data-input-type="${b.type}" data-placeholder="${b.placeholder}">${b.text}</button>`
                ).join('')}
                        </div>
                    </div>
                    <button type="submit" class="btn contact__send btn--white">${contact.submitText}</button>
                `;

                // Re-attach button functionality
                setupContactButtons();
            }
        });
    }

    /**
     * Setup contact button switching
     */
    function setupContactButtons() {
        const socialInput = document.querySelector('.contact__input--social');
        const buttons = document.querySelectorAll('.contact__btns .btn');

        if (socialInput && buttons.length) {
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Toggle active state
                    buttons.forEach(b => b.classList.remove('btn--active'));
                    btn.classList.add('btn--active');

                    // Update input
                    const inputType = btn.getAttribute('data-input-type');
                    const placeholder = btn.getAttribute('data-placeholder');
                    socialInput.type = inputType;
                    socialInput.placeholder = placeholder;
                });
            });
        }
    }

    /**
     * Inject designer credits
     */
    function injectDesigner() {
        document.querySelectorAll('[data-designer="footer.designer"]').forEach(el => {
            const designer = getNestedValue(content, 'footer.designer');
            if (designer) {
                const credits = designer.credits.map((c, i) =>
                    `<a href="${c.href}" target="_blank">${c.name}</a>${i < designer.credits.length - 1 ? ' & ' : ''}`
                ).join('');
                el.innerHTML = `${designer.prefix} ${credits}`;
            }
        });
    }

    /**
     * Update page metadata
     */
    function updateMetadata() {
        const site = getNestedValue(content, 'site');
        if (site) {
            document.getElementById('site-title').textContent = site.title;
            document.getElementById('site-description').content = site.description;
        }
    }

    // ======================================
    // MAIN INITIALIZATION
    // ======================================

    /**
     * Load content and initialize
     */
    async function init() {
        try {
            // Fetch content.json
            const response = await fetch('config/content.json');
            if (!response.ok) {
                throw new Error('Failed to load content.json');
            }
            content = await response.json();

            // Inject all content
            updateMetadata();
            injectTextContent();
            injectHrefAttributes();
            injectPreloaderNumbers();
            injectHeaderNav();
            injectFeatures();
            injectSocials();
            injectHeroStack();
            injectAboutItems();
            injectMission();
            injectWorks();
            injectCompare();
            injectCalculator();
            injectContact();
            injectDesigner();

            console.log('✅ Content loaded successfully from JSON!');

            // Dispatch event for other scripts to know content is ready
            document.dispatchEvent(new CustomEvent('contentLoaded', { detail: content }));

        } catch (error) {
            console.error('❌ Error loading content:', error);
            // Fallback: show error message
            document.body.innerHTML = `
                <div style="display:flex;height:100vh;align-items:center;justify-content:center;background:#0c0c0c;color:#fff;text-align:center;padding:2rem;">
                    <div>
                        <h1 style="font-size:3rem;margin-bottom:1rem;">콘텐츠 로드 실패</h1>
                        <p style="color:#ccc;">config/content.json 파일을 찾을 수 없습니다.</p>
                        <p style="color:#888;margin-top:1rem;">웹 서버를 통해 접속하세요 (localhost)</p>
                    </div>
                </div>
            `;
        }
    }

    // Start loading when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export for external use
    window.ContentLoader = {
        getContent: () => content,
        getValue: (path) => getNestedValue(content, path),
        reload: init
    };

})();

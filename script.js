/**
 * everysecond — script.js
 * ============================================================
 * HOW TO UPDATE EVERY YEAR:
 * Scroll to ANNUAL_STATS object below.
 * Update each number with the latest UN/WHO published data.
 * Also update BASE_POPULATION and BASE_YEAR.
 * That's it. Everything recalculates automatically.
 * ============================================================
 */

// ============================================================
// ✅ STEP 1: UPDATE THESE NUMBERS EVERY YEAR
// Source: UN, WHO, Worldometers, NASA, Statista
// Last updated: 2026
// ============================================================

const BASE_YEAR = 2026;
const BASE_POPULATION = 8_119_000_000; // World population Jan 1 of BASE_YEAR

const ANNUAL_STATS = {

    // ── PEOPLE ──────────────────────────────────────────────
    birthsPerYear: 140_000_000,   // UN World Population Prospects
    deathsPerYear: 60_000_000,   // UN World Population Prospects
    marriagesPerYear: 90_000_000,   // UN Statistics Division
    divorcesPerYear: 50_000_000,   // UN Statistics Division

    // ── NATURE ──────────────────────────────────────────────
    treesCutPerYear: 15_000_000_000,   // FAO Global Forest Assessment
    treesPlantedPerYear: 5_000_000_000,   // FAO / One Trillion Trees Initiative
    co2TonsPerYear: 37_000_000_000,   // Global Carbon Project
    plasticBottlesPerYear: 500_000_000_000,  // Earth Policy Institute
    waterLitersPerYear: 1_500_000_000_000_000, // UNESCO World Water Report
    speciesExtinctPerYear: 15_000,   // IUCN Red List (counted yearly)

    // ── TECHNOLOGY ──────────────────────────────────────────
    googleSearchesPerYear: 2_000_000_000_000, // Google / Statista
    emailsPerYear: 100_000_000_000_000, // Statista Email Report
    whatsappMsgPerYear: 22_000_000_000_000, // Meta / Statista
    youtubeViewsPerYear: 1_825_000_000_000, // YouTube Stats (5B/day)
    iphonesPerYear: 230_000_000, // Apple Annual Report
    websitesPerYear: 547_500, // Internet Live Stats (1500/day)

    // ── MONEY ───────────────────────────────────────────────
    fastFoodSpendPerYear: 900_000_000_000, // Statista Food Service
    healthcareSpendPerYear: 10_000_000_000_000, // WHO Global Health Expenditure
    ecommercePerYear: 5_800_000_000_000, // eMarketer Global Ecommerce
    cybercrimePerYear: 8_000_000_000_000, // Cybersecurity Ventures
    lotteryTicketsPerYear: 150_000_000_000, // World Lottery Association

    // ── FOOD ────────────────────────────────────────────────
    pizzasPerYear: 5_000_000_000,   // PMQ Pizza Magazine / Statista
    burgersPerYear: 50_000_000_000,   // FAO / QSR Magazine
    coffeePerYear: 700_000_000_000,   // International Coffee Organization
    foodWastedTonsPerYear: 1_300_000_000_000,  // UN FAO Food Waste Report
    eggsPerYear: 1_403_000_000_000,  // FAO Livestock Stats
    chickensPerYear: 70_000_000_000,  // FAO Animal Production Stats

    // ── HEALTH ──────────────────────────────────────────────
    cigarettesPerYear: 5_500_000_000_000, // WHO Tobacco Report
    heartAttacksPerYear: 32_500_000, // WHO Cardiovascular Disease
    cancerDxPerYear: 20_000_000, // WHO Global Cancer Report
    surgeriesPerYear: 313_000_000, // Lancet Commission on Surgery
    prematureBirthsPerYear: 15_000_000, // WHO Preterm Birth Report
    quitSmokingPerYear: 1_500_000, // WHO MPOWER Data

    // ── LIVE MISC ──────────────────────────────────────────
    internetUsersPerYear: 170_000_000, // New users joining the internet
    bitcoinTxPerYear: 120_000_000,  // Approx annual transactions
};

// ============================================================
// STEP 2: COUNTER REGISTRY — maps HTML element IDs to data
// ============================================================

const COUNTERS = [

    // ── HERO STRIP ──────────────────────────────────────────
    { id: 'hero-births', stat: 'birthsPerYear', period: 'today' },
    { id: 'hero-co2', stat: 'co2TonsPerYear', period: 'today' },
    { id: 'hero-searches', stat: 'googleSearchesPerYear', period: 'today' },

    // ── PEOPLE ──────────────────────────────────────────────
    { id: 'births-today', stat: 'birthsPerYear', period: 'today' },
    { id: 'deaths-today', stat: 'deathsPerYear', period: 'today' },
    { id: 'world-population', stat: null, special: 'population' },
    { id: 'marriages-today', stat: 'marriagesPerYear', period: 'today' },
    { id: 'divorces-today', stat: 'divorcesPerYear', period: 'today' },
    { id: 'internet-users', stat: 'internetUsersPerYear', period: 'today' },
    { id: 'bitcoin-tx', stat: 'bitcoinTxPerYear', period: 'today' },

    // ── NATURE ──────────────────────────────────────────────
    { id: 'trees-cut', stat: 'treesCutPerYear', period: 'today' },
    { id: 'trees-planted', stat: 'treesPlantedPerYear', period: 'today' },
    { id: 'co2-today', stat: 'co2TonsPerYear', period: 'today' },
    { id: 'species-extinct', stat: 'speciesExtinctPerYear', period: 'year' },
    { id: 'plastic-bottles', stat: 'plasticBottlesPerYear', period: 'today' },
    { id: 'water-used', stat: 'waterLitersPerYear', period: 'today' },

    // ── TECHNOLOGY ──────────────────────────────────────────
    { id: 'google-searches', stat: 'googleSearchesPerYear', period: 'today' },
    { id: 'emails-sent', stat: 'emailsPerYear', period: 'today' },
    { id: 'whatsapp-msgs', stat: 'whatsappMsgPerYear', period: 'today' },
    { id: 'youtube-views', stat: 'youtubeViewsPerYear', period: 'today' },
    { id: 'iphones-sold', stat: 'iphonesPerYear', period: 'today' },
    { id: 'websites-created', stat: 'websitesPerYear', period: 'today' },

    // ── MONEY ───────────────────────────────────────────────
    { id: 'fastfood-spend', stat: 'fastFoodSpendPerYear', period: 'today', prefix: '$' },
    { id: 'healthcare-spend', stat: 'healthcareSpendPerYear', period: 'today', prefix: '$' },
    { id: 'ecommerce-spend', stat: 'ecommercePerYear', period: 'today', prefix: '$' },
    { id: 'cybercrime-loss', stat: 'cybercrimePerYear', period: 'today', prefix: '$' },
    { id: 'lottery-tickets', stat: 'lotteryTicketsPerYear', period: 'today' },

    // ── FOOD ────────────────────────────────────────────────
    { id: 'pizzas-eaten', stat: 'pizzasPerYear', period: 'today' },
    { id: 'burgers-eaten', stat: 'burgersPerYear', period: 'today' },
    { id: 'coffee-cups', stat: 'coffeePerYear', period: 'today' },
    { id: 'food-wasted', stat: 'foodWastedTonsPerYear', period: 'today' },
    { id: 'eggs-eaten', stat: 'eggsPerYear', period: 'today' },
    { id: 'chickens-killed', stat: 'chickensPerYear', period: 'today' },

    // ── HEALTH ──────────────────────────────────────────────
    { id: 'cigarettes-smoked', stat: 'cigarettesPerYear', period: 'today' },
    { id: 'heart-attacks', stat: 'heartAttacksPerYear', period: 'today' },
    { id: 'cancer-dx', stat: 'cancerDxPerYear', period: 'today' },
    { id: 'surgeries', stat: 'surgeriesPerYear', period: 'today' },
    { id: 'premature-births', stat: 'prematureBirthsPerYear', period: 'today' },
    { id: 'quit-smoking', stat: 'quitSmokingPerYear', period: 'today' },

];

// ============================================================
// CORE CALCULATION ENGINE
// ============================================================

/**
 * Returns seconds elapsed since midnight today (local time)
 */
function getSecondsToday() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(0, 0, 0, 0);
    return (now - midnight) / 1000;
}

/**
 * Returns seconds elapsed since Jan 1 of BASE_YEAR
 */
function getSecondsThisYear() {
    const now = new Date();
    const jan1 = new Date(BASE_YEAR, 0, 1, 0, 0, 0, 0);
    return (now - jan1) / 1000;
}

const SECONDS_PER_YEAR = 365.25 * 24 * 3600;

/**
 * Calculate today's count for any annual stat
 */
function calcToday(annualStat) {
    const perSecond = annualStat / SECONDS_PER_YEAR;
    return Math.floor(perSecond * getSecondsToday());
}

/**
 * Calculate this year's count for any annual stat
 */
function calcYear(annualStat) {
    const perSecond = annualStat / SECONDS_PER_YEAR;
    return Math.floor(perSecond * getSecondsThisYear());
}

/**
 * Calculate live world population
 */
function calcPopulation() {
    const birthsPerSec = ANNUAL_STATS.birthsPerYear / SECONDS_PER_YEAR;
    const deathsPerSec = ANNUAL_STATS.deathsPerYear / SECONDS_PER_YEAR;
    const netPerSec = birthsPerSec - deathsPerSec;
    return Math.floor(BASE_POPULATION + netPerSec * getSecondsThisYear());
}

// ============================================================
// NUMBER FORMATTING
// ============================================================

function formatNumber(num, prefix = '') {
    if (num === null || num === undefined || isNaN(num)) return '0';

    if (num >= 1_000_000_000_000) {
        return prefix + (num / 1_000_000_000_000).toFixed(2) + 'T';
    } else if (num >= 1_000_000_000) {
        return prefix + (num / 1_000_000_000).toFixed(2) + 'B';
    } else if (num >= 1_000_000) {
        return prefix + (num / 1_000_000).toFixed(2) + 'M';
    } else if (num >= 1_000) {
        return prefix + num.toLocaleString();
    } else {
        return prefix + num.toString();
    }
}

// ============================================================
// DOM UPDATE ENGINE
// ============================================================

// Store previous values to detect changes
const prevValues = {};

function updateCounter(id, value, prefix = '') {
    const el = document.getElementById(id);
    if (!el) return;

    const formatted = formatNumber(value, prefix);

    // Only update DOM if value changed (performance)
    if (prevValues[id] !== formatted) {
        el.textContent = formatted;
        prevValues[id] = formatted;

        // Flash animation on update
        el.classList.remove('number-flash');
        void el.offsetWidth; // force reflow
        el.classList.add('number-flash');
    }
}

// ============================================================
// MAIN UPDATE LOOP — runs every second
// ============================================================

function updateAllCounters() {
    COUNTERS.forEach(counter => {
        let value = 0;

        try {
            if (counter.special === 'population') {
                value = calcPopulation();
            } else if (counter.period === 'today') {
                value = calcToday(ANNUAL_STATS[counter.stat]);
            } else if (counter.period === 'year') {
                value = calcYear(ANNUAL_STATS[counter.stat]);
            }
        } catch (e) {
            value = 0;
        }

        updateCounter(counter.id, value, counter.prefix || '');
    });
}

// ============================================================
// COUNT-UP ANIMATION (runs once when card enters viewport)
// ============================================================

function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function countUpAnimation(elementId, targetValue, prefix = '', duration = 1500) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const startTime = performance.now();

    function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutExpo(progress);
        const current = Math.floor(eased * targetValue);

        el.textContent = formatNumber(current, prefix);

        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            el.textContent = formatNumber(targetValue, prefix);
        }
    }

    requestAnimationFrame(tick);
}

// ============================================================
// SCROLL REVEAL + COUNT-UP ON FIRST VIEW
// ============================================================

function initScrollReveal() {
    const cards = document.querySelectorAll('.counter-card');
    const animatedIds = new Set();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const card = entry.target;

                // Stagger fade-in
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 80);

                // Count-up animation for the number inside
                const numEl = card.querySelector('.counter-number') || card.querySelector('.card-value'); // Fallback for the class used in my html
                if (numEl && !animatedIds.has(numEl.id)) {
                    animatedIds.add(numEl.id);

                    // Find counter config
                    const counterConfig = COUNTERS.find(c => c.id === numEl.id);
                    if (counterConfig) {
                        let target = 0;
                        try {
                            if (counterConfig.special === 'population') {
                                target = calcPopulation();
                            } else if (counterConfig.period === 'today') {
                                target = calcToday(ANNUAL_STATS[counterConfig.stat]);
                            } else if (counterConfig.period === 'year') {
                                target = calcYear(ANNUAL_STATS[counterConfig.stat]);
                            }
                        } catch (e) { target = 0; }

                        setTimeout(() => {
                            countUpAnimation(numEl.id, target, counterConfig.prefix || '', 1200);
                        }, index * 80 + 200);
                    }
                }

                observer.unobserve(card);
            }
        });
    }, { threshold: 0.15 });

    cards.forEach(card => observer.observe(card));

    // also reveal hero stats
    const heroCards = document.querySelectorAll('.hero-stat-card');
    heroCards.forEach(card => {
        const numEl = card.querySelector('.hero-stat-number');
        if (numEl && !animatedIds.has(numEl.id)) {
            animatedIds.add(numEl.id);
            const counterConfig = COUNTERS.find(c => c.id === numEl.id);
            if (counterConfig) {
                let target = 0;
                try {
                    if (counterConfig.special === 'population') {
                        target = calcPopulation();
                    } else if (counterConfig.period === 'today') {
                        target = calcToday(ANNUAL_STATS[counterConfig.stat]);
                    } else if (counterConfig.period === 'year') {
                        target = calcYear(ANNUAL_STATS[counterConfig.stat]);
                    }
                } catch (e) { target = 0; }

                countUpAnimation(numEl.id, target, counterConfig.prefix || '', 1200);
            }
        }
    });

}

// ============================================================
// PAUSE WHEN TAB IS HIDDEN (saves battery on mobile)
// ============================================================

let updateInterval = null;

function startUpdating() {
    updateAllCounters(); // run immediately
    updateInterval = setInterval(updateAllCounters, 1000);
}

function stopUpdating() {
    if (updateInterval) {
        clearInterval(updateInterval);
        updateInterval = null;
    }
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopUpdating();
    } else {
        startUpdating();
    }
});

// ============================================================
// NAVIGATION — smooth scroll + active state
// ============================================================

function initNavigation() {
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) mobileMenu.classList.remove('open');
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => sectionObserver.observe(section));

    // Mobile hamburger
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('nav-links'); // Fallback for mobile menu ID from HTML

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active'); // fallback
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });
    }
}

// ============================================================
// SHARE FUNCTIONALITY
// ============================================================

function shareTwitter() {
    const text = encodeURIComponent(
        'This website shows what is happening on Earth RIGHT NOW in real time 🌍\n' +
        'Births, deaths, trees cut, money spent — all live!\n' +
        'everysecond.live #everysecond #LiveData #EarthLive'
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
}

function shareWhatsApp() {
    const text = encodeURIComponent(
        'Watch the world change in real time 🌍 everysecond.live'
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
}

function shareFacebook() {
    const url = encodeURIComponent('https://everysecond.live');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        const btn = document.getElementById('copy-link-btn') || document.querySelector('.share-link-btn.outline');
        if (btn) {
            const original = btn.textContent;
            btn.textContent = 'Copied! ✓';
            btn.style.background = '#2D6A4F';
            btn.style.color = '#fff';
            setTimeout(() => {
                btn.textContent = original;
                btn.style.background = '';
                btn.style.color = '';
            }, 2000);
        }
    });
}

// ============================================================
// ANNOUNCEMENT BAR DISMISS
// ============================================================

function initAnnouncementBar() {
    const bar = document.getElementById('announcement-bar');
    const closeBtn = document.querySelector('.close-btn');

    if (!bar || !closeBtn) return;

    // Check if previously dismissed
    if (localStorage.getItem('announcementDismissed') === '1') {
        bar.style.display = 'none';
        return;
    }

    closeBtn.addEventListener('click', () => {
        bar.style.maxHeight = bar.scrollHeight + 'px';
        bar.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
        requestAnimationFrame(() => {
            bar.style.maxHeight = '0';
            bar.style.opacity = '0';
        });
        setTimeout(() => { bar.style.display = 'none'; }, 350);
        localStorage.setItem('announcementDismissed', '1');
    });
}

// ============================================================
// NAVBAR SHADOW ON SCROLL
// ============================================================

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.boxShadow = '0 1px 12px rgba(0,0,0,0.06)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }, { passive: true });
}

// ============================================================
// EXPOSE SHARE FUNCTIONS GLOBALLY (for onclick in HTML)
// ============================================================

window.shareTwitter = shareTwitter;
window.shareWhatsApp = shareWhatsApp;
window.shareFacebook = shareFacebook;
window.copyLink = copyLink;

// ============================================================
// THEME TOGGLE (DARK MODE)
// ============================================================

function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', initialTheme);

    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ============================================================
// DAY PROGRESS BAR
// ============================================================

function updateProgressBar() {
    const bar = document.getElementById('day-progress');
    const label = document.getElementById('progress-label');
    if (!bar || !label) return;

    const now = new Date();
    const totalSecs = 24 * 3600;
    const currentSecs = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const percent = (currentSecs / totalSecs) * 100;

    bar.style.width = percent.toFixed(2) + '%';
    label.textContent = `Today is ${percent.toFixed(2)}% complete`;
}

// ============================================================
// PREMIUM TILT EFFECT
// ============================================================

function initTiltEffect() {
    const cards = document.querySelectorAll('.counter-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });
}

// ============================================================
// INITIALIZE EVERYTHING ON DOM READY
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    initAnnouncementBar();
    initNavbarScroll();
    initThemeToggle();
    initNavigation();
    initScrollReveal();
    initTiltEffect();
    startUpdating();

    // Update progress bar every second
    setInterval(updateProgressBar, 1000);
    updateProgressBar();

    console.log('%c🌍 everysecond', 'font-size:20px;font-weight:bold;color:#E8533A');
    console.log('%cAll counters running. Update ANNUAL_STATS each year.', 'color:#2D6A4F');
});

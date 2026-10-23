document.addEventListener('DOMContentLoaded', () => {

    // Scroll Progress Bar
    

const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const scrollPercentage =
        (scrollTop / documentHeight) * 100;

    if (scrollProgress) {
        scrollProgress.style.width =
            scrollPercentage + '%';
    }

});
gsap.from(['.hero-badge', '.hero-intro', '.hero-name', '.hero-tagline'], {
    y: 30, opacity: 0, duration: 1, stagger: 0.18,
    ease: 'power3.out', delay: 0.9, clearProps: 'opacity,transform'
});
// Background DEVELOPER text: fades in on scroll down, fades out on scroll up
const developerText = document.querySelector(".developer-bg span");

if (developerText && typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(developerText,
        { opacity: 0, y: 35 },
        {
            opacity: 0.12,
            y: 0,
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        }
    );
}


  
    // 1. Animated Preloader
    const preloader = document.getElementById('preloader');
    const progress = document.getElementById('loader-progress');

    let currentWidth = 0;

    const interval = setInterval(() => {
        currentWidth += 20;

        if (progress) {
            progress.style.width = currentWidth + '%';
        }

        if (currentWidth >= 100) {
            clearInterval(interval);

            setTimeout(() => {
                if (preloader) {
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';
                }
            }, 200);
        }
    }, 60);
    
    // 2. Sticky Glass Navbar & Active Scrollspy
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {

        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Active section detector
        let currentSec = '';

        sections.forEach(sec => {
            const top = sec.offsetTop - 150;
            const height = sec.offsetHeight;

            if (
                window.scrollY >= top &&
                window.scrollY < top + height
            ) {
                currentSec = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');

            if (link.getAttribute('href') === '#' + currentSec) {
                link.classList.add('active');
            }
        });
    });


    // 3. Mobile Hamburger Menu Toggle
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (hamburgerBtn && mobileMenu) {

        hamburgerBtn.addEventListener('click', () => {

            mobileMenu.classList.toggle('active');

            const icon = hamburgerBtn.querySelector('i');

            if (icon) {
                if (mobileMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars-staggered');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars-staggered');
                }
            }
        });


        mobileNavLinks.forEach(link => {

            link.addEventListener('click', () => {

                mobileMenu.classList.remove('active');

                const icon = hamburgerBtn.querySelector('i');

                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars-staggered');
                }
            });

        });
    }



    // 5. Dynamic Counter Animation for Stats
const statNumbers = document.querySelectorAll('.badge-number[data-target]');    let hasAnimatedStats = false;

    function animateCounters() {

        statNumbers.forEach(counter => {

            const target = Number(counter.getAttribute('data-target'));

            if (isNaN(target)) {
                return;
            }

            let count = 0;
            const speed = target / 20;

            const updateCount = () => {

                count += speed;

                if (count < target) {

                    counter.innerText = Math.ceil(count) + '+';

                    setTimeout(updateCount, 40);

                } else {

                    counter.innerText = target + '+';

                }
            };

            updateCount();

        });
    }


    // Trigger counter on scroll
    function checkStats() {

        const aboutSec = document.getElementById('about');

        if (aboutSec && !hasAnimatedStats) {

            const rect = aboutSec.getBoundingClientRect();

            if (rect.top <= window.innerHeight * 0.75) {

                animateCounters();
                hasAnimatedStats = true;

            }
        }
    }

    window.addEventListener('scroll', checkStats);

    // Check once when page loads
    checkStats();


// 6. Contact Form Submission (Formspree)
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status-msg');

if (contactForm) {

    contactForm.addEventListener('submit', (e) => {

        e.preventDefault();

        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {

            if (response.ok) {

                if (formStatus) {
                    formStatus.className = 'form-status success';
                    formStatus.innerText = 'Thank you! Your message has been sent successfully.';
                    formStatus.style.display = 'block';
                }

                contactForm.reset();

            } else {

                if (formStatus) {
                    formStatus.className = 'form-status error';
                    formStatus.innerText = 'Something went wrong. Please try again or email me directly.';
                    formStatus.style.display = 'block';
                }
            }
        })
        .catch(() => {

            if (formStatus) {
                formStatus.className = 'form-status error';
                formStatus.innerText = 'Network error. Please check your connection and try again.';
                formStatus.style.display = 'block';
            }
        })
        .finally(() => {

            setTimeout(() => {
                if (formStatus) {
                    formStatus.style.display = 'none';
                }
            }, 5000);

        });

    });
}
    // 7. README & Deployment Modal Controls
    const openModalBtn = document.getElementById('open-readme-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const readmeModal = document.getElementById('readme-modal');

    if (openModalBtn && closeModalBtn && readmeModal) {

        openModalBtn.addEventListener('click', () => {
            readmeModal.classList.add('active');
        });


        closeModalBtn.addEventListener('click', () => {
            readmeModal.classList.remove('active');
        });


        readmeModal.addEventListener('click', (e) => {

            if (e.target === readmeModal) {
                readmeModal.classList.remove('active');
            }

        });
    }

      // ============================================================
    // 8. SCROLL ANIMATIONS (GSAP)
    // ============================================================
    try {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        gsap.registerPlugin(ScrollTrigger);

       

           // B) HERO: scroll is locked until the photo has settled
        const heroPic   = document.querySelector('.profile-image');
        const heroTag   = document.querySelector('.profile-tag');
        const heroQuote = document.querySelector('.profile-quote-card');
        const heroBio   = document.querySelector('.hero-bio');
        const heroActs  = document.querySelector('.hero-actions');

        gsap.set([heroPic, heroTag, heroQuote, heroBio, heroActs].filter(Boolean), { opacity: 0 });

    function playHero(fromY, onDone) {
    const cards = [heroTag, heroQuote].filter(Boolean);
    const rest  = [heroBio, heroActs].filter(Boolean);

    // stop anything still running on these elements (needed for the replay)
    gsap.killTweensOf([heroPic, ...cards, ...rest].filter(Boolean));

    // pause the CSS float animation so GSAP can move the quote card
    if (heroQuote) heroQuote.style.animation = 'none';

    const tl = gsap.timeline({ onComplete: onDone });
        // CURRENTLY EXPANDING KNOWLEDGE: pills pop in on scroll down AND scroll up
    const learnWrap  = document.querySelector('.learning-pills');
    const learnPills = document.querySelectorAll('.learning-pill');

    if (learnWrap && learnPills.length) {
        let timers = [];

        const showPills = () => {
            timers.forEach(clearTimeout);
            timers = [];
            learnPills.forEach((p, i) => {
                timers.push(setTimeout(() => p.classList.add('is-visible'), 200 + i * 150));
            });
        };

        const hidePills = () => {
            timers.forEach(clearTimeout);
            timers = [];
            learnPills.forEach(p => p.classList.remove('is-visible'));
        };

        new IntersectionObserver(entries => {
            entries.forEach(e => (e.isIntersecting ? showPills() : hidePills()));
        }, { threshold: 0.3 }).observe(learnWrap);
    }

    // 1) photo settles first
    if (heroPic) {
        tl.fromTo(heroPic,
            { opacity: 0, y: fromY, scale: 0.85 },
            { opacity: 1, y: 0, scale: 1, x: 7, duration: 1.4, ease: 'power2.out' });
    }

    // 2) then the tag slides in from the LEFT
    if (heroTag) {
        tl.fromTo(heroTag,
            { opacity: 0, x: -300 },
            { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', clearProps: 'transform' },
            '>');
    }

    // 3) at the same time the quote card slides in from the RIGHT
    if (heroQuote) {
        tl.fromTo(heroQuote,
            { opacity: 0, x: 300, rotation: 3 },
            { opacity: 1, x: 0, rotation: 3, duration: 0.9, ease: 'power3.out',
              onComplete: () => {
                  gsap.set(heroQuote, { clearProps: 'transform' });
                  heroQuote.style.animation = '';   // floating starts again
              } },
            heroTag ? '<' : '>');
    }

    // 4) bio and buttons fade up last
    rest.forEach((el, i) => {
        tl.fromTo(el,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            i === 0 ? '-=0.3' : '>-0.4');
    });

    if (!tl.getChildren().length && onDone) onDone();
}

        // --- scroll lock ---
        if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        let textDone = false;      // name + tagline finished appearing
        let introStarted = false;
        let introDone = false;

        setTimeout(() => { textDone = true; }, 1800);

        const scrollKeys = ['ArrowDown', 'PageDown', ' ', 'Spacebar', 'End'];

        function startIntro() {
            if (!textDone || introStarted) return;
            introStarted = true;
            playHero(-350, () => {
                introDone = true;
                document.documentElement.style.overflow = '';
                document.body.style.overflow = 'hidden';   // keep your original body setting
                document.body.style.overflowX = 'hidden';
                document.body.style.overflowY = '';
                removeListeners();
                ScrollTrigger.refresh();
            });
        }

        const onWheel = e => { e.preventDefault(); startIntro(); };
        const onTouch = () => startIntro();
        const onKey   = e => {
            if (scrollKeys.includes(e.key)) { e.preventDefault(); startIntro(); }
        };

        function removeListeners() {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('touchmove', onTouch);
            window.removeEventListener('keydown', onKey);
        }
        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('touchmove', onTouch, { passive: true });
        window.addEventListener('keydown', onKey);

       
        // Smoothly hide the photo while scrolling down,
        // and reveal it again while scrolling up.
  
ScrollTrigger.create({
    trigger: '.learning-pills',
    start: 'top 88%',
    end: 'bottom 5%',
    onEnter: showPills,
    onEnterBack: showPills,
    onLeave: hidePills,
    onLeaveBack: hidePills
});
        // C) SECTIONS: animate in on the way down AND again on the way up
        function reveal(selector, { x = 0, y = 40, delay = 0, stagger = 0.15 } = {}) {
            const els = gsap.utils.toArray(selector);
            if (!els.length) return;

            // CSS hover transitions would fight GSAP, so switch them off while hidden/animating
            const hold = () => els.forEach(el => (el.style.transition = 'none'));
            hold();
            gsap.set(els, { opacity: 0, x, y });

            const play = batch => gsap.to(batch, {
                opacity: 1, x: 0, y: 0, duration: 0.8, delay, stagger,
                ease: 'power3.out', overwrite: true,
                onComplete: () => {
                    gsap.set(batch, { clearProps: 'opacity,transform' });
                    batch.forEach(el => (el.style.transition = ''));
                }
            });
            const reset = batch => {
                batch.forEach(el => (el.style.transition = 'none'));
                gsap.to(batch, { opacity: 0, x, y, duration: 0.3, overwrite: true });
            };

            ScrollTrigger.batch(els, {
                start: 'top 90%',
                end: 'bottom 10%',
                onEnter: play,
                onEnterBack: play,
                onLeave: reset,
                onLeaveBack: reset
            });
        }

        reveal('.section-label',   { y: 20 });
        reveal('.section-heading', { y: 25, delay: 0.1 });
        reveal('.section-desc',    { y: 25, delay: 0.2 });
        reveal('.about-text',      { x: -40, y: 0, delay: 0.25 });
        reveal('.badge-pill',      { y: 40, delay: 0.35, stagger: 0.18 });
        reveal('.skill-card',      { y: 50, delay: 0.3, stagger: 0.15 });
        reveal('.projects-grid > .project-card', { y: 60, delay: 0.3, stagger: 0.18 });
        reveal('.contact-box',     { y: 50, delay: 0.3 });

               // D) CURRENTLY EXPANDING KNOWLEDGE: plays on scroll down AND scroll up
        const learnTitle = document.querySelector('.learning-pills')?.previousElementSibling;
        if (learnTitle) reveal(learnTitle, { y: 25 });

        const pills = gsap.utils.toArray('.learning-pill');
        if (pills.length) {
            pills.forEach(p => (p.style.transition = 'none'));
            gsap.set(pills, { opacity: 0, scale: 0.4 });

            const showPills = () => gsap.to(pills, {
                opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, delay: 0.2,
                ease: 'back.out(1.7)', overwrite: true,
                onComplete: () => {
                    gsap.set(pills, { clearProps: 'opacity,transform' });
                    pills.forEach(p => (p.style.transition = ''));
                }
            });

            const hidePills = () => {
                pills.forEach(p => (p.style.transition = 'none'));
                gsap.to(pills, { opacity: 0, scale: 0.4, duration: 0.3, overwrite: true });
            };

            ScrollTrigger.create({
                trigger: '.learning-pills',
                start: 'top 88%',
                end: 'bottom 5%',
                onEnter: showPills,       // scrolling down into view
                onEnterBack: showPills,   // scrolling up back into view
                onLeave: hidePills,       // scrolled past going down
                onLeaveBack: hidePills    // scrolled past going up
            });
        }
          
if (heroPic) {
    gsap.to(heroPic, {
        opacity: 0,
        y: -100,
        scale: 0.90,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true
        }
    });
}
        

        window.addEventListener('load', () => ScrollTrigger.refresh());

    } catch (err) {
        console.error('Animation error:', err);
    }

});

  

        gsap.from('.hero-content > *', {
            duration: 1,
            y: 30,
            opacity: 0,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.4
        });


     

        // Section titles reveal
        gsap.utils.toArray('.section-heading').forEach(heading => {

            gsap.from(heading, {
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 85%'
                },

                y: 25,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });

        });
    
    

// Slide the cards in once the photo has settled, and out when it resets
(function () {
    let timer = null;
    setInterval(() => {
        const pic = document.querySelector('.profile-image');
        if (!pic) return;
        const o = parseFloat(getComputedStyle(pic).opacity);

        if (o >= 0.98) {
            if (!document.body.classList.contains('cards-in') && !timer) {
                timer = setTimeout(() => {
                    document.body.classList.add('cards-in');
                    timer = null;
                }, 300);
            }
        } else if (o < 0.6) {
            clearTimeout(timer);
            timer = null;
            document.body.classList.remove('cards-in');
        }
    }, 100);
})();


// ===== PROJECT FILTER =====
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.pf-filter');
    const cards = document.querySelectorAll('.pf-card');
    if (!buttons.length || !cards.length) return;

    const matches = (card, filter) =>
        filter === 'all' || card.dataset.category.split(' ').includes(filter);

    // Show a project count on each button
    buttons.forEach(btn => {
        const count = [...cards].filter(c => matches(c, btn.dataset.filter)).length;
        const badge = btn.querySelector('.pf-count');
        if (badge) badge.textContent = count;
    });

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');

            const filter = btn.dataset.filter;

            cards.forEach(card => {
                clearTimeout(card._timer);

                if (matches(card, filter)) {
                    card.hidden = false;
                    requestAnimationFrame(() =>
                        requestAnimationFrame(() => card.classList.remove('is-hidden'))
                    );
                } else {
                    card.classList.add('is-hidden');
                    card._timer = setTimeout(() => { card.hidden = true; }, 300);
                }
            });
        });
    });
});// ===== PROJECT CARD ANIMATION (scroll reveal + replay on filter) =====
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const grid = document.querySelector('.pf-grid');
    const buttons = document.querySelectorAll('.pf-filter');
    if (!grid) return;

    const allCards = [...grid.querySelectorAll('.pf-card')];
    let currentFilter = 'all';

    const cardsFor = filter => allCards.filter(c =>
        filter === 'all' || c.dataset.category.split(' ').includes(filter)
    );

    // CSS transitions would fight GSAP, so turn them off while animating
    const hold = cards => cards.forEach(c => (c.style.transition = 'none'));
    const release = cards => cards.forEach(c => (c.style.transition = ''));

    const play = (cards, delay = 0.1) => {
        hold(cards);
        gsap.fromTo(cards,
            { opacity: 0, y: 60 },
            {
                opacity: 1, y: 0, duration: 0.8, delay, stagger: 0.18,
                ease: 'power3.out', overwrite: true,
                onComplete: () => {
                    gsap.set(cards, { clearProps: 'opacity,transform' });
                    release(cards);
                }
            }
        );
    };

    const reset = cards => {
        hold(cards);
        gsap.to(cards, { opacity: 0, y: 60, duration: 0.3, overwrite: true });
    };

    // Start hidden so there is no flash before the reveal
    hold(allCards);
    gsap.set(allCards, { opacity: 0, y: 60 });

    // Reveal on scroll down AND scroll up
    ScrollTrigger.create({
        trigger: grid,
        start: 'top 85%',
        end: 'bottom 10%',
        onEnter:     () => play(cardsFor(currentFilter), 0.3),
        onEnterBack: () => play(cardsFor(currentFilter), 0.3),
        onLeave:     () => reset(cardsFor(currentFilter)),
        onLeaveBack: () => reset(cardsFor(currentFilter))
    });

    // Replay the stagger every time a filter is clicked
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentFilter = btn.dataset.filter;
            play(cardsFor(currentFilter));
            setTimeout(() => ScrollTrigger.refresh(), 400); // grid height changed
        });
    });
});


/* ===== ABOUT CARDS: replay on every scroll in/out ===== */
function initAboutCardReveal() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const container = document.querySelector("#about .ax-stats");
    const cards = gsap.utils.toArray("#about .ax-tile");
    if (!container || !cards.length) return;

    // left column comes from the left, right column from the right
    const fromX = (i) => (i % 2 === 0 ? -300 : 300);

    // CSS hover transitions fight GSAP, so switch them off while animating
    const hold = () => cards.forEach(c => (c.style.transition = "none"));
    const release = () => cards.forEach(c => (c.style.transition = ""));

    // start hidden
    hold();
    gsap.set(cards, { opacity: 0, x: fromX });

    const play = () => {
        gsap.to(cards, {
            opacity: 1,
            x: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true,
            onComplete: () => {
                gsap.set(cards, { clearProps: "opacity,transform" });
                release();
            }
        });
    };

    const reset = () => {
        hold();
        gsap.to(cards, {
            opacity: 0,
            x: fromX,
            duration: 0.35,
            ease: "power2.in",
            overwrite: true
        });
    };

    ScrollTrigger.create({
        trigger: container,
        start: "top 88%",     // enters from below (scrolling down from Home)
        end: "bottom 12%",    // leaves at the top
        onEnter: play,        // scroll down, Home -> About
        onEnterBack: play,    // scroll up, Skills -> About
        onLeave: reset,       // scrolled past About going down
        onLeaveBack: reset    // scrolled back above About going up
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAboutCardReveal);
} else {
    initAboutCardReveal();
}
// Email: Gmail app on phones, Gmail website on desktop
const emailLink = document.getElementById('email-link');

if (emailLink) {
    const to = 'yasyash371@gmail.com';
    const subject = encodeURIComponent('Portfolio Inquiry');
    const body = encodeURIComponent('Hello Yashwant,\n\n');

    emailLink.addEventListener('click', (e) => {
        const ua = navigator.userAgent;
        const isAndroid = /Android/i.test(ua);
        const isIOS = /iPhone|iPad|iPod/i.test(ua);

        // Android: let the normal mailto link open the Gmail/default mail app
        if (isAndroid) return;

        e.preventDefault();

        if (isIOS) {
            // Try the Gmail app first
            window.location.href =
                `googlegmail:///co?to=${to}&subject=${subject}&body=${body}`;

            // If Gmail isn't installed the page stays visible, so fall back to Mail
            setTimeout(() => {
                if (!document.hidden) {
                    window.location.href =
                        `mailto:${to}?subject=${subject}&body=${body}`;
                }
            }, 1200);
        } else {
            // Desktop: Gmail in a new tab
            window.open(
                `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`,
                '_blank',
                'noopener'
            );
        }
    });
}
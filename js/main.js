/* ========================================
   Michael George Portfolio - Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Scroll-triggered fade-in for project cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.index * 100;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card').forEach((card, i) => {
        card.dataset.index = i;
        observer.observe(card);
    });

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('.project-card[id]');
    const navLinks = document.querySelectorAll('.nav-project');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const active = document.querySelector(`.nav-project[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' });

    sections.forEach(section => navObserver.observe(section));

    // Hero video: muted autoplay preview, click to play full with sound
    const heroIframe = document.getElementById('hero-stream');
    const overlay = document.getElementById('hero-overlay');

    if (heroIframe && overlay) {
        overlay.addEventListener('click', () => {
            heroIframe.src = 'https://customer-7dbytdh7xqoratq6.cloudflarestream.com/2ed85544df653c082d1d8eab78556ee8/iframe?autoplay=true&preload=auto&controls=true';
            overlay.classList.add('hidden');
        });
    }

    // Contact modal
    const contactBtn = document.getElementById('contact-btn');
    const backdrop = document.getElementById('contact-backdrop');
    const closeBtn = document.getElementById('contact-close');

    if (contactBtn && backdrop) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            backdrop.classList.add('open');
        });

        closeBtn.addEventListener('click', () => {
            backdrop.classList.remove('open');
        });

        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) {
                backdrop.classList.remove('open');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                backdrop.classList.remove('open');
            }
        });
    }

});

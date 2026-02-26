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

    // Hero video: 10-second muted preview loop, click to play full
    const streamEl = document.getElementById('hero-stream');
    const overlay = document.getElementById('hero-overlay');
    const heroVideo = document.getElementById('hero-video');
    let previewMode = true;

    if (streamEl && overlay) {
        // Loop back to start at 10 seconds during preview
        streamEl.addEventListener('timeupdate', () => {
            if (previewMode && streamEl.currentTime >= 10) {
                streamEl.currentTime = 0;
            }
        });

        // Click overlay to play full video
        overlay.addEventListener('click', () => {
            previewMode = false;
            streamEl.muted = false;
            streamEl.loop = false;
            streamEl.controls = true;
            streamEl.currentTime = 0;
            streamEl.play();
            overlay.classList.add('hidden');
        });
    }

});

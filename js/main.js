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

});

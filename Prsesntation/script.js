document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element's position
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and architecture container
    document.querySelectorAll('.card, .architecture-container').forEach(el => {
        observer.observe(el);
    });

    // Cyber Tooltip Logic
    const tooltip = document.getElementById('cyber-tooltip');
    if (tooltip) {
        const tooltipTitle = tooltip.querySelector('.tooltip-title');
        const tooltipDesc = tooltip.querySelector('.tooltip-desc');
        const nodes = document.querySelectorAll('.arch-node[data-title]');

        nodes.forEach(node => {
            node.addEventListener('mouseenter', () => {
                tooltipTitle.textContent = node.getAttribute('data-title');
                tooltipDesc.textContent = node.getAttribute('data-desc');
                tooltip.classList.add('active');
                
                // Position tooltip above the node
                const rect = node.getBoundingClientRect();
                tooltip.style.left = (rect.left + rect.width / 2) + 'px';
                tooltip.style.top = (rect.top - tooltip.offsetHeight - 15) + 'px';
            });

            node.addEventListener('mouseleave', () => {
                tooltip.classList.remove('active');
            });
        });
    }

});

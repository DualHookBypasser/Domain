// Optimized particle system with reduced load
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.particlesContainer = document.querySelector('.particles');
        this.createParticles();
        this.animate();
    }

    createParticles() {
        // Reduced particle count for performance
        const particleCount = window.innerWidth < 768 ? 10 : 15;
        for (let i = 0; i < particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = this.getRandomColor();
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5 + 0.3;

        // Random position
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';

        // Animation properties
        particle.vx = (Math.random() - 0.5) * 1;
        particle.vy = (Math.random() - 0.5) * 1;
        particle.life = Math.random() * 200 + 100;
        particle.maxLife = particle.life;

        this.particlesContainer.appendChild(particle);
        this.particles.push(particle);
    }

    getRandomColor() {
        const colors = ['#8a2be2', '#9932cc', '#ba55d3'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        // Throttled animation for better performance
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            const currentLeft = parseFloat(particle.style.left);
            const currentTop = parseFloat(particle.style.top);

            const newLeft = currentLeft + particle.vx;
            const newTop = currentTop + particle.vy;

            particle.style.left = newLeft + 'px';
            particle.style.top = newTop + 'px';

            // Decrease life
            particle.life -= 2;
            particle.style.opacity = (particle.life / particle.maxLife) * 0.5;

            // Remove dead particles
            if (particle.life <= 0 || 
                newLeft < -10 || newLeft > window.innerWidth + 10 ||
                newTop < -10 || newTop > window.innerHeight + 10) {
                particle.remove();
                this.particles.splice(i, 1);
                this.createParticle();
            }
        }

        // Reduced frame rate for better performance
        setTimeout(() => requestAnimationFrame(() => this.animate()), 33);
    }
}

// Optimized button effects
function addButtonEffects() {
    const buttons = document.querySelectorAll('.neon-btn, .discord-btn');

    buttons.forEach(button => {
        let isHovering = false;

        button.addEventListener('mouseenter', () => {
            if (!isHovering) {
                isHovering = true;
                button.style.transform = button.classList.contains('discord-btn') 
                    ? 'translateY(-2px) scale(1.02)' 
                    : 'translateY(-3px) scale(1.02)';
            }
        });

        button.addEventListener('mouseleave', () => {
            isHovering = false;
            button.style.transform = 'translateY(0) scale(1)';
        });

        button.addEventListener('click', () => {
            button.style.transform = 'scale(0.98)';
            setTimeout(() => {
                if (isHovering) {
                    button.style.transform = 'translateY(-3px) scale(1.02)';
                } else {
                    button.style.transform = 'translateY(0) scale(1)';
                }
            }, 100);
        });
    });
}

// Simplified glitch effect
function addGlitchEffect() {
    const title = document.querySelector('.neon-title');
    if (title) {
        setInterval(() => {
            if (Math.random() < 0.05) { // Reduced frequency
                title.style.textShadow = '1px 0 #ff0080, -1px 0 #8a2be2';
                setTimeout(() => {
                    title.style.textShadow = '0 0 10px #8a2be2, 0 0 20px #8a2be2, 0 0 30px #9932cc';
                }, 50);
            }
        }, 3000); // Less frequent
    }
}

// Premium toggle functionality
function initPremiumToggle() {
    const toggleBtn = document.getElementById('premiumToggle');
    const premiumSection = document.getElementById('premiumSection');

    if (toggleBtn && premiumSection) {
        toggleBtn.addEventListener('click', () => {
            toggleBtn.classList.toggle('active');
            premiumSection.classList.toggle('active');

            const toggleText = toggleBtn.querySelector('.toggle-text');
            const toggleIcon = toggleBtn.querySelector('.toggle-icon');

            if (premiumSection.classList.contains('active')) {
                toggleText.textContent = 'HIDE PREMIUM TOOLS';
                toggleIcon.textContent = '🌟';
            } else {
                toggleText.textContent = 'UNLOCK PREMIUM TOOLS';
                toggleIcon.textContent = '🔮';
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Simplified initialization
    new ParticleSystem();
    addButtonEffects();
    addGlitchEffect();
    initPremiumToggle();

    // Fast loading
    document.body.style.opacity = '1';
});

// Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Handle resize if needed
    }, 250);
});

// Particle system for background effects
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.particlesContainer = document.querySelector('.particles');
        this.createParticles();
        this.animate();
    }

    createParticles() {
        // Reduce particles for better performance
        const particleCount = window.innerWidth < 768 ? 25 : 35;
        for (let i = 0; i < particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = this.getRandomColor();
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
        particle.style.opacity = Math.random() * 0.8 + 0.2;
        
        // Random position
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';
        
        // Animation properties
        particle.vx = (Math.random() - 0.5) * 2;
        particle.vy = (Math.random() - 0.5) * 2;
        particle.life = Math.random() * 100 + 50;
        particle.maxLife = particle.life;
        
        this.particlesContainer.appendChild(particle);
        this.particles.push(particle);
    }

    getRandomColor() {
        const colors = ['#8a2be2', '#9932cc', '#da70d6', '#ba55d3', '#7b68ee', '#dda0dd'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        // Use transform for better performance
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            const currentLeft = parseFloat(particle.style.left);
            const currentTop = parseFloat(particle.style.top);
            
            const newLeft = currentLeft + particle.vx;
            const newTop = currentTop + particle.vy;
            
            particle.style.transform = `translate(${newLeft - currentLeft}px, ${newTop - currentTop}px)`;
            particle.style.left = newLeft + 'px';
            particle.style.top = newTop + 'px';
            
            // Decrease life
            particle.life--;
            particle.style.opacity = particle.life / particle.maxLife;
            
            // Remove dead particles
            if (particle.life <= 0 || 
                newLeft < -10 || newLeft > window.innerWidth + 10 ||
                newTop < -10 || newTop > window.innerHeight + 10) {
                particle.remove();
                this.particles.splice(i, 1);
                this.createParticle(); // Create new particle
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Mouse trail effect
class MouseTrail {
    constructor() {
        this.trail = [];
        this.maxTrail = window.innerWidth < 768 ? 10 : 15; // Reduce on mobile
        this.init();
    }

    init() {
        let lastTime = 0;
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastTime > 16) { // Throttle to ~60fps
                this.addTrailPoint(e.clientX, e.clientY);
                lastTime = now;
            }
        });
        this.animate();
    }

    addTrailPoint(x, y) {
        const point = document.createElement('div');
        point.style.position = 'fixed';
        point.style.left = x + 'px';
        point.style.top = y + 'px';
        point.style.width = '4px';
        point.style.height = '4px';
        point.style.background = '#8a2be2';
        point.style.borderRadius = '50%';
        point.style.boxShadow = '0 0 10px #8a2be2';
        point.style.pointerEvents = 'none';
        point.style.zIndex = '999';
        point.life = this.maxTrail;
        
        document.body.appendChild(point);
        this.trail.push(point);
        
        if (this.trail.length > this.maxTrail) {
            const oldPoint = this.trail.shift();
            if (oldPoint && oldPoint.parentNode) {
                oldPoint.parentNode.removeChild(oldPoint);
            }
        }
    }

    animate() {
        this.trail.forEach((point, index) => {
            if (point && point.style) {
                point.life--;
                point.style.opacity = point.life / this.maxTrail;
                point.style.transform = `scale(${point.life / this.maxTrail})`;
                
                if (point.life <= 0 && point.parentNode) {
                    point.parentNode.removeChild(point);
                    this.trail.splice(index, 1);
                }
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Button hover sound effect (visual feedback)
function addButtonEffects() {
    const buttons = document.querySelectorAll('.neon-btn, .discord-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = button.classList.contains('discord-btn') 
                ? 'translateY(-3px) scale(1.05)' 
                : 'translateY(-5px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', () => {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'translateY(-5px) scale(1.05)';
            }, 100);
        });
    });
}

// Glitch effect for title
function addGlitchEffect() {
    const title = document.querySelector('.neon-title');
    if (title) {
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every interval
                title.style.textShadow = '2px 0 #ff0080, -2px 0 #8a2be2';
                setTimeout(() => {
                    title.style.textShadow = '0 0 10px #8a2be2, 0 0 20px #8a2be2, 0 0 30px #9932cc, 0 0 40px #9932cc, 0 0 50px #7b68ee';
                }, 100);
            }
        }, 2000);
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
    // Use Intersection Observer for performance
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe buttons for lazy animation
    document.querySelectorAll('.neon-btn').forEach(btn => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(20px)';
        btn.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(btn);
    });
    
    new ParticleSystem();
    new MouseTrail();
    addButtonEffects();
    addGlitchEffect();
    initPremiumToggle();
    
    // Faster loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 50);
});

// Resize handler for particles
window.addEventListener('resize', () => {
    // Particles will automatically adjust due to their random positioning
});

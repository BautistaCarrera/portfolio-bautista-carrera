// Navegación móvil
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header con efecto de transparencia al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Animación de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a elementos
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.study-card, .certification-card, .language-card, .skill-item, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Formulario contacto usando EmailJS AJAX
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (formMessage) {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }
        const submitButton = this.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
        }

        // Valida campos
        const name = this.querySelector('input[name="name"]').value.trim();
        const email = this.querySelector('input[name="email"]').value.trim();
        const message = this.querySelector('textarea[name="message"]').value.trim();
        if (!name || !email || !message) {
            if (formMessage) {
                formMessage.textContent = 'Por favor, completa todos los campos.';
                formMessage.className = 'form-message error';
            }
            if (submitButton) {
                submitButton.textContent = 'Enviar Mensaje';
                submitButton.disabled = false;
            }
            return;
        }

        // Reemplaza estos 3 valores por los tuyos de EmailJS
        const serviceID = 'service_9btksa7';
        const templateID = 'template_8a1x7kd';

        emailjs.sendForm(serviceID, templateID, this)
        .then(function() {
            if (formMessage) {
                formMessage.textContent = '¡Mensaje enviado con éxito! Te responderé pronto.';
                formMessage.className = 'form-message success';
            }
            contactForm.reset();
        }, function(error) {
            if (formMessage) {
                formMessage.textContent = 'Error al enviar el mensaje. Intenta nuevamente o comunícate por email.';
                formMessage.className = 'form-message error';
            }
        })
        .finally(() => {
            if (submitButton) {
                submitButton.textContent = 'Enviar Mensaje';
                submitButton.disabled = false;
            }
        });
    });
}

// Muestra mensaje de éxito si vuelve de FormSubmit con ?sent=1
(function showSuccessIfReturned() {
    const params = new URLSearchParams(location.search);
    if (params.get('sent') === '1' && formMessage) {
        formMessage.textContent = '¡Mensaje enviado con éxito! Te responderé pronto.';
        formMessage.className = 'form-message success';
    }
})();

// Efecto de typing en el título principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efecto de typing al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Contador animado para habilidades
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Efecto parallax suave para el hero optimizado con rAF
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Tooltip para las habilidades
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', () => {
        skill.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    skill.addEventListener('mouseleave', () => {
        skill.style.transform = 'translateY(0) scale(1)';
    });
});

// Efecto de hover mejorado para las tarjetas
document.querySelectorAll('.study-card, .certification-card, .language-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
});

// Navegación activa según la sección visible
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Preloader (opcional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Copiar email al portapapeles
document.querySelectorAll('.contact-item').forEach(item => {
    if (item.querySelector('p') && item.querySelector('p').textContent.includes('@')) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const email = item.querySelector('p').textContent;
            navigator.clipboard.writeText(email).then(() => {
                // Mostrar notificación temporal
                const notification = document.createElement('div');
                notification.textContent = 'Email copiado al portapapeles';
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #4A90E2;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 5px;
                    z-index: 10000;
                    animation: slideIn 0.3s ease;
                `;
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                }, 3000);
            });
        });
    }
});

// Agregar estilos CSS para animaciones adicionales
const additionalStyles = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .nav-link.active {
        color: #4A90E2 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

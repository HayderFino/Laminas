// Script para el sitio web corporativo
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Optimización Navbar (Throttle básico para scroll) ---
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavbar = () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        }
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });


    // --- 2. Animaciones con IntersectionObserver ---
    const animateElements = document.querySelectorAll('.service-card, .value-card, .product-card, .project-card');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target); // Dejar de observar una vez animado
                }
            });
        }, observerOptions);

        animateElements.forEach(el => observer.observe(el));
    } else {
        // Fallback para navegadores antiguos
        animateElements.forEach(el => el.classList.add('fade-in'));
    }


    // --- 3. Validación de Formularios ---
    const forms = document.querySelectorAll('form');

    // Funciones helper para validación
    const validators = {
        email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        tel: (val) => /^[\d\s\-\+\(\)]{8,}$/.test(val.replace(/\s/g, '')),
        required: (val) => !!val.trim()
    };

    const showFeedback = (field, isValid, msg) => {
        field.classList.toggle('is-invalid', !isValid);
        field.classList.toggle('is-valid', isValid);

        let feedback = field.nextElementSibling;
        if (!isValid) {
            if (!feedback || !feedback.classList.contains('invalid-feedback')) {
                feedback = document.createElement('div');
                feedback.className = 'invalid-feedback';
                field.parentNode.appendChild(feedback);
            }
            feedback.textContent = msg;
        }
    };

    forms.forEach(form => {
        form.addEventListener('submit', function (event) {
            let formIsValid = true;
            const fields = this.querySelectorAll('[required]');

            fields.forEach(field => {
                let isValid = true;
                let message = '';

                if (!validators.required(field.value)) {
                    isValid = false;
                    message = 'Este campo es obligatorio.';
                } else if (field.type === 'email' && !validators.email(field.value)) {
                    isValid = false;
                    message = 'Por favor, introduce un correo electrónico válido.';
                } else if (field.type === 'tel' && !validators.tel(field.value)) {
                    isValid = false;
                    message = 'Por favor, introduce un número de teléfono válido.';
                }

                showFeedback(field, isValid, message);
                if (!isValid) formIsValid = false;
            });

            if (!formIsValid) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                // Manejo específico del formulario de cotización (simulación)
                if (this.id === 'cotizacionForm') {
                    event.preventDefault();
                    handleCotizacionSubmit(this);
                }
            }

            this.classList.add('was-validated');
        });
    });


    // --- 4. Funcionalidades Específicas (Lazy loads condicionales) ---

    // WhatsApp Analytics
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            console.log('Clic en WhatsApp - Cliente potencial interesado');
            // gtag('event', 'click', {'event_category': 'WhatsApp', 'event_label': 'Contacto'}); 
        });
    }

    // Contador de años
    const experienceElement = document.getElementById('years-experience');
    if (experienceElement) {
        experienceElement.textContent = new Date().getFullYear() - 2000;
    }

    // Footer Year
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }


    // --- 5. Lightbox (Event Delegation) ---
    // Delegamos el evento click al body o un contenedor padre, pero filtramos por clase
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('project-img')) {
            openLightbox(e.target.src, e.target.alt);
        }
    });

    function openLightbox(src, alt) {
        const lightbox = document.createElement('div');
        Object.assign(lightbox.style, {
            position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)', zIndex: '2000',
            display: 'flex', justifyContent: 'center', alignItems: 'center'
        });
        lightbox.id = 'lightbox';

        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        Object.assign(img.style, {
            maxWidth: '90%', maxHeight: '90%', borderRadius: '5px',
            boxShadow: '0 5px 25px rgba(0, 0, 0, 0.5)'
        });

        lightbox.appendChild(img);
        lightbox.onclick = () => document.body.removeChild(lightbox);
        document.body.appendChild(lightbox);
    }


    // --- 6. Formulario Cotización y Select ---
    const cotizacionForm = document.getElementById('cotizacionForm');
    if (cotizacionForm) {
        const servicioSelect = document.getElementById('servicio');
        if (servicioSelect) {
            const servicios = [
                'Ingeniería y Diseño', 'Fabricación Industrial', 'Mantenimiento de Equipos',
                'Automatización Industrial', 'Consultoría Técnica', 'Instalaciones Industriales', 'Otro'
            ];
            // Fragment para insertar en lote (mejor rendimiento)
            const fragment = document.createDocumentFragment();
            servicios.forEach(s => {
                const opt = document.createElement('option');
                opt.value = opt.textContent = s;
                fragment.appendChild(opt);
            });
            servicioSelect.appendChild(fragment);
        }
    }

    function handleCotizacionSubmit(form) {
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success mt-4';
        successMessage.innerHTML = `
            <h4 class="alert-heading">¡Cotización enviada con éxito!</h4>
            <p>Hemos recibido tu solicitud de cotización. Uno de nuestros ejecutivos se contactará contigo en las próximas 24 horas.</p>
            <hr>
            <p class="mb-0">Si tienes alguna urgencia, no dudes en contactarnos al +56 2 2345 6789.</p>
        `;

        form.parentNode.insertBefore(successMessage, form.nextSibling);
        form.style.display = 'none';
        form.reset();
        successMessage.scrollIntoView({ behavior: 'smooth' });
        console.log('Datos del formulario enviados (simulación)');
    }


    // --- 7. Tooltips Bootstrap ---
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(t => new bootstrap.Tooltip(t));

});
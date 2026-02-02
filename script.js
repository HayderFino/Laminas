// Script para el sitio web corporativo

document.addEventListener('DOMContentLoaded', function() {
    
    // Efecto de scroll para la navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.98)';
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.98)';
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        }
    });

    // Validación de formularios
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!validateForm(this)) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            // Agregar clases de validación de Bootstrap
            this.classList.add('was-validated');
        });
    });
    
    // Función de validación de formularios
    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                showValidationMessage(field, 'Este campo es obligatorio.');
            } else if (field.type === 'email' && !isValidEmail(field.value)) {
                isValid = false;
                showValidationMessage(field, 'Por favor, introduce un correo electrónico válido.');
            } else if (field.type === 'tel' && !isValidPhone(field.value)) {
                isValid = false;
                showValidationMessage(field, 'Por favor, introduce un número de teléfono válido.');
            } else {
                clearValidationMessage(field);
            }
        });
        
        return isValid;
    }
    
    // Mostrar mensaje de validación
    function showValidationMessage(field, message) {
        let feedback = field.nextElementSibling;
        
        if (!feedback || !feedback.classList.contains('invalid-feedback')) {
            feedback = document.createElement('div');
            feedback.className = 'invalid-feedback';
            field.parentNode.appendChild(feedback);
        }
        
        field.classList.add('is-invalid');
        feedback.textContent = message;
    }
    
    // Limpiar mensaje de validación
    function clearValidationMessage(field) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
    }
    
    // Validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Validar teléfono (solo verifica que tenga al menos 8 dígitos)
    function isValidPhone(phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
    
    // Animación de elementos al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .value-card, .product-card, .project-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Inicializar animaciones al cargar la página
    animateOnScroll();
    
    // Manejo del botón de WhatsApp
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        // Añadir atributo para seguimiento (puedes usar Google Analytics o similar)
        whatsappBtn.addEventListener('click', function() {
            console.log('Clic en WhatsApp - Cliente potencial interesado');
            // Aquí podrías agregar código para Google Analytics
            // gtag('event', 'click', {'event_category': 'WhatsApp', 'event_label': 'Contacto'});
        });
    }
    
    // Contador de años de experiencia (para la página Nosotros)
    const experienceElement = document.getElementById('years-experience');
    if (experienceElement) {
        // Calcular años desde 2000
        const startYear = 2000;
        const currentYear = new Date().getFullYear();
        const years = currentYear - startYear;
        experienceElement.textContent = years;
    }
    
    // Galería de proyectos (lightbox básico)
    const projectImages = document.querySelectorAll('.project-img');
    
    projectImages.forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });
    
    function openLightbox(src, alt) {
        // Crear lightbox
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        lightbox.style.zIndex = '2000';
        lightbox.style.display = 'flex';
        lightbox.style.justifyContent = 'center';
        lightbox.style.alignItems = 'center';
        
        // Crear imagen dentro del lightbox
        const lightboxImg = document.createElement('img');
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightboxImg.style.maxWidth = '90%';
        lightboxImg.style.maxHeight = '90%';
        lightboxImg.style.borderRadius = '5px';
        lightboxImg.style.boxShadow = '0 5px 25px rgba(0, 0, 0, 0.5)';
        
        // Añadir imagen al lightbox
        lightbox.appendChild(lightboxImg);
        
        // Cerrar lightbox al hacer clic
        lightbox.addEventListener('click', function() {
            document.body.removeChild(lightbox);
        });
        
        // Añadir lightbox al body
        document.body.appendChild(lightbox);
    }
    
    // Manejo del formulario de cotización
    const cotizacionForm = document.getElementById('cotizacionForm');
    if (cotizacionForm) {
        // Cargar servicios en el select de servicios
        const servicioSelect = document.getElementById('servicio');
        if (servicioSelect) {
            const servicios = [
                'Ingeniería y Diseño',
                'Fabricación Industrial',
                'Mantenimiento de Equipos',
                'Automatización Industrial',
                'Consultoría Técnica',
                'Instalaciones Industriales',
                'Otro'
            ];
            
            servicios.forEach(servicio => {
                const option = document.createElement('option');
                option.value = servicio;
                option.textContent = servicio;
                servicioSelect.appendChild(option);
            });
        }
        
        // Manejar envío exitoso del formulario
        cotizacionForm.addEventListener('submit', function(event) {
            // En una implementación real, aquí enviarías los datos al servidor
            // Por ahora, simulamos el envío exitoso
            
            event.preventDefault();
            
            // Mostrar mensaje de éxito
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-4';
            successMessage.innerHTML = `
                <h4 class="alert-heading">¡Cotización enviada con éxito!</h4>
                <p>Hemos recibido tu solicitud de cotización. Uno de nuestros ejecutivos se contactará contigo en las próximas 24 horas.</p>
                <hr>
                <p class="mb-0">Si tienes alguna urgencia, no dudes en contactarnos al +56 2 2345 6789.</p>
            `;
            
            // Insertar mensaje después del formulario
            cotizacionForm.parentNode.insertBefore(successMessage, cotizacionForm.nextSibling);
            
            // Ocultar formulario
            cotizacionForm.style.display = 'none';
            
            // Resetear formulario
            cotizacionForm.reset();
            
            // Scroll hasta el mensaje
            successMessage.scrollIntoView({ behavior: 'smooth' });
            
            // Aquí iría el envío real del formulario
            // Por ejemplo: enviar datos a un servidor con fetch()
            console.log('Datos del formulario enviados (simulación)');
        });
    }
    
    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Añadir año actual al pie de página
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});
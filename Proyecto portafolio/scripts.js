// Alternar menú de navegación
function toggleMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('visible');
}

// Agregar evento al ícono de menú
document.querySelector('.menu-icon').addEventListener('click', toggleMenu);

// Desplazamiento suave
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Filtrar proyectos
function filterProjects(category) {
    const projects = document.querySelectorAll('#proyectos figure');
    projects.forEach(project => {
        if (category === 'all' || project.classList.contains(category)) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

// Modal para imágenes
function showModal(imgSrc) {
    const modal = document.querySelector('.modal');
    const modalImg = modal.querySelector('img');
    modalImg.src = imgSrc;
    modal.style.display = 'flex';
}

// Agregar eventos a imágenes
document.querySelectorAll('#proyectos img').forEach(img => {
    img.addEventListener('click', function () {
        showModal(this.src);
    });
});

// Cerrar modal
document.querySelector('.modal').addEventListener('click', function () {
    this.style.display = 'none';
});

// Función para mostrar mensajes de error
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    input.classList.add('error');
}

// Función para ocultar mensajes de error
function hideError(input) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
    input.classList.remove('error');
}

// Función para validar el correo electrónico
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validación del formulario en tiempo real
document.getElementById('contact-form').addEventListener('input', (event) => {
    const input = event.target;

    if (input.id === 'nombre' && input.value.trim() === '') {
        showError(input, 'El nombre es obligatorio.');
    } else if (input.id === 'email' && !isValidEmail(input.value.trim())) {
        showError(input, 'Por favor, ingresa un correo válido.');
    } else if (input.id === 'mensaje' && input.value.trim() === '') {
        showError(input, 'El mensaje no puede estar vacío.');
    } else {
        hideError(input);
    }
});

// Validación al enviar el formulario
document.getElementById('contact-form').addEventListener('submit', (event) => {
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const mensaje = document.getElementById('mensaje');
    let isValid = true;

    if (nombre.value.trim() === '') {
        showError(nombre, 'El nombre es obligatorio.');
        isValid = false;
    }
    if (!isValidEmail(email.value.trim())) {
        showError(email, 'Por favor, ingresa un correo válido.');
        isValid = false;
    }
    if (mensaje.value.trim() === '') {
        showError(mensaje, 'El mensaje no puede estar vacío.');
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault(); // Evitar envío si hay errores
    }
});

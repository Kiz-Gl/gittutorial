/*=============== Show menu =============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/*===== Menu Show =====*/
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/*===== Hide Show =====*/
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== Remove Menu Mobile ===============*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}

navLink.forEach((n) => n.addEventListener('click', linkAction));

/*=============== Background Header =============*/
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 50) header.classList.add('scroll-header');
    else header.classList.remove('scroll-header');
}

window.addEventListener('scroll', scrollHeader);

/*=============== Contact Form =============*/
const contactForm = document.getElementById('contact-form'),
    contactName = document.getElementById('contact-name'),
    contactEmail = document.getElementById('contact-email'),
    message = document.getElementById('message'),
    contactMessage = document.getElementById('contact-message');

// Initialize EmailJS with environment variables
emailjs.init(process.env.EMAILJS_PUBLIC_KEY);

const sendEmail = (e) => {
    e.preventDefault();

    if (
        contactName.value === '' ||
        contactEmail.value === '' ||
        message.value === ''
    ) {
        contactMessage.classList.remove('color-light');
        contactMessage.classList.add('color-dark');
        contactMessage.textContent = 'Write all the input fields';
    } else {
        emailjs.sendForm(
            process.env.EMAILJS_SERVICE_ID,
            process.env.EMAILJS_TEMPLATE_ID,
            '#contact-form'
        )
        .then(() => {
            contactMessage.classList.add('color-light')
            contactMessage.textContent = 'Message sent ✔️';

            setTimeout(() => {
                contactMessage.textContent = '';
            }, 5000);
        }, 
        (error) => {
            console.error('EmailJS Error:', error);
            alert('OOPS! SOMETHING WENT WRONG... Please try again later.');
        });

        contactName.value = '';
        contactEmail.value = '';
        message.value = '';
    }
};

contactForm.addEventListener('submit', sendEmail);

/*=============== Style Switcher =============*/
const styleSwitcherToggle = document.querySelector('.style__switcher-toggler'),
    styleSwitcher = document.querySelector('.style__switcher');

styleSwitcherToggle.addEventListener('click', () => {
    styleSwitcher.classList.toggle('open');
});

window.addEventListener('scroll', () => {
    if (styleSwitcher.classList.contains('open')) {
        styleSwitcher.classList.remove('open');
    }
});

const alternateStyles = document.querySelectorAll('.alternate-style');

function setActiveStyle(color) {
    alternateStyles.forEach((style) => {
        if (color === style.getAttribute('title')) {
            style.removeAttribute('disabled');
        } else {
            style.setAttribute('disabled', 'true');
        }
    });
}

/*=============== Smooth Scrolling =============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

/*=============== Viewport Detection =============*/
function checkViewport() {
    if (window.innerWidth <= 320) {
        document.body.classList.add('ultra-mobile');
    } else {
        document.body.classList.remove('ultra-mobile');
    }
}
window.addEventListener('resize', checkViewport);
checkViewport();
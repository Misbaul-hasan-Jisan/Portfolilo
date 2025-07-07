document.addEventListener('DOMContentLoaded', function() {
    // ===== MOBILE MENU FUNCTIONALITY =====
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.getElementById('header');

    // Function to toggle mobile menu
    const toggleMenu = (show) => {
        if (show) {
            navMenu.classList.add('show-menu');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    };

    // Menu toggle events
    if (navToggle) {
        navToggle.addEventListener('click', () => toggleMenu(true));
    }

    if (navClose) {
        navClose.addEventListener('click', () => toggleMenu(false));
    }

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && navMenu.classList.contains('show-menu')) {
            toggleMenu(false);
        }
    });

    // ===== ACTIVE LINK FUNCTIONALITY =====
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100; // Adding offset for fixed header
        
        navLinks.forEach(link => {
            const sectionId = link.getAttribute('href');
            if (sectionId.startsWith('#')) {
                const section = document.querySelector(sectionId);
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        link.classList.add('active-link');
                    } else {
                        link.classList.remove('active-link');
                    }
                }
            }
        });
    }

    // Set initial active link
    updateActiveLink();
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveLink);

    // ===== SCROLL HEADER EFFECT =====
    function scrollHeader() {
        if (window.scrollY >= 80) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
    }
    window.addEventListener('scroll', scrollHeader);

    // ===== SCROLL TOP BUTTON =====
    const scrollTopBtn = document.getElementById('scroll-top');
    function toggleScrollTop() {
        if (window.scrollY >= 560) {
            scrollTopBtn.classList.add('show-scroll');
        } else {
            scrollTopBtn.classList.remove('show-scroll');
        }
    }
    window.addEventListener('scroll', toggleScrollTop);

    // Scroll to top when clicked
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== DARK/LIGHT THEME TOGGLE =====
    const themeButton = document.getElementById('theme-button');
    const darkTheme = 'dark-theme';
    const iconTheme = 'bx-sun';

    // Check for saved theme preference
    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');

    const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
    const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun';

    // Apply saved theme if exists
    if (selectedTheme) {
        document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
        themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme);
    }

    // Toggle theme on button click
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    });

    // ===== CONTACT FORM SUBMISSION =====
    const contactForm = document.querySelector('.contact__form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const form = e.target;
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    alert('Message sent successfully!');
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                alert('Oops! There was a problem sending your message.');
                console.error('Error:', error);
            } finally {
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // ===== SCROLL REVEAL ANIMATIONS =====
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2500,
        delay: 400,
        // reset: true
    });

    sr.reveal(`.home__content, .home__img`);
    sr.reveal(`.about__img, .contact__box`, {origin: 'left'});
    sr.reveal(`.about__content, .contact__form`, {origin: 'right'});
    sr.reveal(`.skills__content, .work__card, .footer__container`, {interval: 100});
});
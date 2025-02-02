// Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    
    // Hide loading overlay after animations complete
    setTimeout(() => {
        loadingOverlay.classList.add('fade-out');
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500);
    }, 2000);

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Handle mobile dropdown menus
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                // Close all other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                // Toggle current dropdown
                dropdown.classList.toggle('active');
                dropdownContent.style.display = dropdown.classList.contains('active') ? 'block' : 'none';
            }
        });
    });

    // FAQ Toggles
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // Testimonials Data
    const testimonials = [
        {
            name: "John Doe",
            text: "MSD Fitness has transformed my life! The trainers are exceptional and the facilities are top-notch."
        },
        {
            name: "Jane Smith",
            text: "I've tried many gyms, but MSD Fitness stands out. The community here is amazing and supportive."
        },
        {
            name: "Mike Johnson",
            text: "The variety of classes and equipment keeps me motivated. Best fitness decision I've ever made!"
        }
    ];

    // Initialize Testimonials Carousel
    let currentTestimonial = 0;
    const testimonialContainer = document.querySelector('.testimonial-carousel');

    function createTestimonialElement(testimonial) {
        return `
            <div class="testimonial">
                <p class="testimonial-text">"${testimonial.text}"</p>
                <p class="testimonial-author">- ${testimonial.name}</p>
            </div>
        `;
    }

    function updateTestimonial() {
        testimonialContainer.innerHTML = createTestimonialElement(testimonials[currentTestimonial]);
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    }

    // Initial testimonial
    updateTestimonial();
    // Rotate testimonials every 5 seconds
    setInterval(updateTestimonial, 5000);

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });

    // Adjust scroll position when clicking the Classes link in the navbar
    document.querySelector('a[href="#classes"]').addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector('#classes');
        const offset = 90; // Adjust this value based on your header height
        const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
            top: position,
            behavior: 'smooth'
        });
    });

    // Add Google Maps
    // Note: You'll need to replace YOUR_API_KEY with an actual Google Maps API key
    const mapContainer = document.querySelector('.map');
    mapContainer.innerHTML = `
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007!5e0!3m2!1sen!2sus!4v1644262070010!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy">
        </iframe>
    `;

    // Handle Join Now buttons
    const joinButtons = document.querySelectorAll('.join-button');
    joinButtons.forEach(button => {
        button.addEventListener('click', () => {
            const contactSection = document.querySelector('#contact');
            contactSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Image Slider
    const slider = document.querySelector('.slides');
    const sliderContainer = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentSlide = 0;
    let autoSlideInterval;
    let isAutoPlaying = true;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function goToSlide(index) {
        currentSlide = index;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
        if (isAutoPlaying) {
            resetAutoSlide();
        }
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    }
    
    function startAutoSlide() {
        isAutoPlaying = true;
        autoSlideInterval = setInterval(nextSlide, 3000); 
    }
    
    function stopAutoSlide() {
        isAutoPlaying = false;
        clearInterval(autoSlideInterval);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        if (isAutoPlaying) {
            startAutoSlide();
        }
    }
    
    // Event Listeners
    prevButton.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
    });
    
    nextButton.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
    });
    
    // Pause on hover
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
    
    // Touch Events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    });
    
    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            prevSlide();
        }
        startAutoSlide();
    });
    
    // Start auto-slide
    startAutoSlide();
});

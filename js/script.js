'use strict';

/**
 * Cinta Vitamin C Serum - Interactive Features
 * Handles navigation, smooth scrolling, and scroll animations
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Smooth Scrolling for Navigation Links ---
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Adjust for fixed header height
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 2. Navbar Reveal on Scroll ---
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add subtle shadow when scrolled
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
            navbar.style.background = 'rgba(253, 250, 246, 0.98)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(253, 250, 246, 0.95)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });

    // --- 3. Scroll Reveal Animation for Benefits ---
    // Simple Intersection Observer to fade in elements
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Apply reveal to benefit cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        // Initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        revealOnScroll.observe(card);
    });

    // --- 4. Buy Now Interaction ---
    const buyButton = document.querySelector('.btn-xl');
    if (buyButton) {
        buyButton.addEventListener('click', (e) => {
            // Prevent default for demo, usually navigates to checkout
            e.preventDefault();
            
            buyButton.textContent = 'Adding to Bag...';
            buyButton.style.backgroundColor = '#d4a373'; // color-accent
            
            setTimeout(() => {
                buyButton.textContent = 'Added to Bag';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    buyButton.textContent = 'Add to Cart — Buy Now';
                    buyButton.style.backgroundColor = ''; // reset to CSS default
                }, 2000);
            }, 800);
        });
    }

    // --- 5. Testimonial Loop (Simple Fade) ---
    const testimonials = document.querySelectorAll('.testimonial-item');
    if (testimonials.length > 1) {
        let currentTestimonial = 0;
        
        // Note: In CSS we keep them stacked; this could be expanded into a slider
        // For now, we'll just ensure they are visible as per the static design
        // but can be toggled if specific slider IDs were provided.
    }

    console.log('Cinta script initialized successfully.');
});
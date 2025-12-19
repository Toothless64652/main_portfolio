/**
 * Portfolio Website - Main JavaScript File
 * This file contains all interactive functionality for the portfolio website
 */

// ============================================
// DOM Content Loaded Event
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality when page loads
    initNavigation();
    initMobileMenu();
    initScrollEffects();
    initBackToTop();
    initContactForm();
    initAnimations();
    loadProjects();
});

// ============================================
// Navigation Functionality
// ============================================

/**
 * Initialize navigation bar functionality
 * Handles active link highlighting and smooth scrolling
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Function to highlight active navigation link based on scroll position
    function highlightActiveLink() {
        // Get current scroll position
        const scrollPosition = window.scrollY + 100;
        
        // Loop through each section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Check if current scroll position is within this section
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Add click event listeners to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target section ID from href attribute
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Smooth scroll to target section
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Listen for scroll events to update active link
    window.addEventListener('scroll', highlightActiveLink);
    
    // Call once on page load to set initial active link
    highlightActiveLink();
}

// ============================================
// Mobile Menu Functionality
// ============================================

/**
 * Initialize mobile menu toggle functionality
 * Handles opening and closing of mobile navigation menu
 */
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Toggle mobile menu when button is clicked
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            // Toggle active class on button and menu
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

/**
 * Close mobile menu
 * Helper function to close mobile menu
 */
function closeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// ============================================
// Scroll Effects
// ============================================

/**
 * Initialize scroll effects
 * Handles navbar styling on scroll and other scroll-based animations
 */
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    // Add scroll event listener
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class to navbar when user scrolls down
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

// ============================================
// Back to Top Button
// ============================================

/**
 * Initialize back to top button functionality
 * Shows/hides button based on scroll position and handles smooth scroll to top
 */
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ============================================
// Contact Form Functionality
// ============================================

/**
 * Initialize contact form functionality
 * Handles form submission and validation
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            // Validate form data
            if (validateForm(formData)) {
                // Show success message
                showFormMessage('success', 'Thank you! Your message has been sent successfully.');
                
                // Reset form
                contactForm.reset();
                
                // In a real application, you would send the data to a server here
                // Example: sendFormData(formData);
            } else {
                // Show error message
                showFormMessage('error', 'Please fill in all fields correctly.');
            }
        });
    }
}

/**
 * Validate contact form data
 * @param {Object} formData - The form data to validate
 * @returns {boolean} - True if form is valid, false otherwise
 */
function validateForm(formData) {
    // Check if all fields are filled
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        return false;
    }
    
    // Validate email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        return false;
    }
    
    return true;
}

/**
 * Show form message (success or error)
 * @param {string} type - Type of message ('success' or 'error')
 * @param {string} message - Message to display
 */
function showFormMessage(type, message) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    messageElement.style.cssText = `
        padding: 15px;
        margin-top: 15px;
        border-radius: 8px;
        text-align: center;
        font-weight: 500;
        animation: fadeInUp 0.5s ease;
        ${type === 'success' 
            ? 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
            : 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
        }
    `;
    
    // Insert message after form
    const contactForm = document.getElementById('contactForm');
    contactForm.parentNode.insertBefore(messageElement, contactForm.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(function() {
        messageElement.style.animation = 'fadeOut 0.5s ease';
        setTimeout(function() {
            messageElement.remove();
        }, 500);
    }, 5000);
}

// ============================================
// Animations on Scroll
// ============================================

/**
 * Initialize scroll animations
 * Adds fade-in animation to elements when they come into view
 */
function initAnimations() {
    // Select all elements that should animate on scroll
    const animateElements = document.querySelectorAll(
        '.project-card, .skill-item, .stat-item, .contact-item'
    );
    
    // Create Intersection Observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            // If element is in viewport, add animation class
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    });
    
    // Observe all elements
    animateElements.forEach(element => {
        // Set initial opacity to 0
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// ============================================
// Utility Functions
// ============================================

/**
 * Debounce function to limit how often a function can be called
 * Useful for scroll events and other frequent events
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events for better performance
window.addEventListener('scroll', debounce(function() {
    // Additional scroll-based functionality can be added here
}, 10));

// ============================================
// Console Welcome Message
// ============================================

console.log('%c👋 Welcome to my Portfolio!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cThis website is built with HTML, CSS, and vanilla JavaScript.', 'font-size: 14px; color: #764ba2;');
console.log('%cFeel free to explore the code and learn from it!', 'font-size: 12px; color: #718096;');


/**
 * Load project data from the /projects/ folder and build the grid.
*/

const projectsGrid = document.getElementById("projectsGrid");

async function loadProjects() {
  try {
    const response = await fetch("./assets/projects/projects.json");
    const projects = await response.json();
    projects.forEach((project) => {
      projectsGrid.appendChild(createProjectCard(project));
    });
  } catch (error) {
    projectsGrid.innerHTML = `<p>Unable to load projects. ${error.message}</p>`;
  }
}

/**
 * Create a single project card element from data.
 */


function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";
  card.dataset.revealChild = "";

  const thumb = document.createElement("div");
  thumb.className = "project-image";
  thumb.style.backgroundImage = `url("${project.thumbnail}")`;

  const body = document.createElement("div");
  body.className = "project-content";

  const title = document.createElement("h3");
  title.className = "project-title";
  title.textContent = project.title;

  const desc = document.createElement("p");
  desc.className = "project-description";
  desc.textContent = project.description;

  const tag = document.createElement("div");
  tag.className = "project-tags";
  tag.innerHTML = `
        <div class="project-tags">
            <span class="tag">HTML</span>
            <span class="tag">CSS</span>
            <span class="tag">JavaScript</span>
        </div>
                `

  const linkOverlay = document.createElement("div");
    linkOverlay.className = "project-overlay";

  const button = document.createElement("a");
  button.className = "project-link";
  button.href = project.link;
  button.target = "_blank";
  button.rel = "noreferrer";
  button.textContent = "View Project";

  body.appendChild(title);
  body.appendChild(desc);
  body.appendChild(tag);
  
  card.appendChild(thumb);
  card.appendChild(body);

  thumb.appendChild(linkOverlay);
  linkOverlay.appendChild(button);

  return card;
}
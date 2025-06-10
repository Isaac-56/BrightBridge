// Smooth scroll for "Learn more" button to "What we offer" section
document.addEventListener('DOMContentLoaded', () => {
    // ...existing fade-in code...

    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const offerSection = document.getElementById('offer');
    if (learnMoreBtn && offerSection) {
        learnMoreBtn.addEventListener('click', () => {
            offerSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// Visitor Counter
let visitorCount = 12847;

function updateVisitorCount() {
    visitorCount += Math.floor(Math.random() * 3) + 1;
    document.getElementById('visitorCount').textContent = visitorCount.toLocaleString();
}

// Update visitor count every 10 seconds
setInterval(updateVisitorCount, 10000);

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name && email && message) {
        // Simulate form submission
        alert('Thank you for your message! We\'ll get back to you soon.');
        
        // Reset form
        this.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Chatbot Functionality
const chatMessages = [
    "Hello! How can I help you today?",
    "I can provide information about our mentorship programs.",
    "Would you like to know more about our matching system?",
    "Our platform connects students with experienced mentors.",
    "Feel free to ask about our MicroBoosts feature!"
];

let currentMessageIndex = 0;

// Initialize chatbot
function initChatbot() {
    console.log('Initializing chatbot...');
    const sendBtn = document.getElementById('sendBtn');
    const chatInput = document.getElementById('chatInput');
    const minimizeBtn = document.querySelector('.chatbot-minimize');
    const chatbot = document.querySelector('.chatbot');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotInput = document.querySelector('.chatbot-input');

    console.log('Chatbot elements:', { sendBtn, chatInput, minimizeBtn, chatbot });

    if (!sendBtn || !chatInput || !minimizeBtn || !chatbot) {
        console.error('Chatbot elements not found');
        return;
    }

    // Send message function
    function sendMessage() {
        console.log('Sending message...');
        const messageText = chatInput.value.trim();
        if (messageText) {
            console.log('Adding user message:', messageText);
            // Add user message
            addChatMessage(messageText, 'user');
            chatInput.value = '';
            
            // Add bot response after a delay
            setTimeout(() => {
                const botResponse = chatMessages[currentMessageIndex % chatMessages.length];
                console.log('Adding bot response:', botResponse);
                addChatMessage(botResponse, 'bot');
                currentMessageIndex++;
            }, 1000);
        }
    }

    // Add message to chat
    function addChatMessage(text, sender) {
        console.log('Adding chat message:', { text, sender });
        const messagesContainer = document.querySelector('.chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-bubble ${sender}`;
        
        if (sender === 'bot') {
            messageDiv.innerHTML = `
                <div class="avatar-icon">B</div>
                <span>${text}</span>
            `;
        } else {
            messageDiv.innerHTML = `
                <span>${text}</span>
            `;
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Event Listeners
    console.log('Adding event listeners...');
    sendBtn.addEventListener('click', () => {
        console.log('Send button clicked');
        sendMessage();
    });
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            console.log('Enter key pressed');
            sendMessage();
        }
    });

    let isMinimized = false;
    minimizeBtn.addEventListener('click', () => {
        console.log('Minimize button clicked');
        isMinimized = !isMinimized;
        if (isMinimized) {
            chatbot.classList.add('minimized');
            chatbotMessages.style.display = 'none';
            chatbotInput.style.display = 'none';
            minimizeBtn.innerHTML = '?';
        } else {
            chatbot.classList.remove('minimized');
            chatbotMessages.style.display = 'block';
            chatbotInput.style.display = 'flex';
            minimizeBtn.innerHTML = '×';
        }
    });

    // Add click handler for the entire minimized chatbot
    chatbot.addEventListener('click', (e) => {
        if (isMinimized && e.target === chatbot) {
            isMinimized = false;
            chatbot.classList.remove('minimized');
            chatbotMessages.style.display = 'block';
            chatbotInput.style.display = 'flex';
            minimizeBtn.innerHTML = '×';
        }
    });

    // Add initial bot message only if there are no messages
    if (chatbotMessages.children.length === 0) {
        console.log('Adding initial bot message');
        addChatMessage(chatMessages[0], 'bot');
        currentMessageIndex = 1;
    }
}

// Initialize chatbot when DOM is loaded
console.log('Setting up DOMContentLoaded listener...');
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing all features');
    
    // Initialize FAQ
    const faqButtons = document.querySelectorAll('.faq-question');
    console.log('Found FAQ buttons:', faqButtons.length);
    
    if (faqButtons.length > 0) {
        faqButtons.forEach(button => {
            button.addEventListener('click', () => {
                const faqItem = button.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // If the clicked item wasn't active, open it
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }
    
    // Initialize Learn More button
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const offerSection = document.getElementById('offer');
    if (learnMoreBtn && offerSection) {
        learnMoreBtn.addEventListener('click', () => {
            offerSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Initialize fade-in animations
    const elementsToAnimate = document.querySelectorAll('.section-title, .product-card, img');
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    if (entry.target.tagName === 'IMG') {
                        entry.target.style.opacity = '1';
                    }
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2, rootMargin: '50px' }
    );
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Initialize mobile menu
    createMobileMenu();
    
    // Initialize chatbot
    initChatbot();
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // If it's an image, ensure it's visible
            if (entry.target.tagName === 'IMG') {
                entry.target.style.opacity = '1';
            }
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.section-title, .product-card, img');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const fadeEls = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );
    fadeEls.forEach(el => observer.observe(el));
});

// Mobile menu toggle (for responsive design)
function createMobileMenu() {
    const nav = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelector('.nav-buttons');
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    hamburger.setAttribute('aria-label', 'Toggle menu');
    
    nav.querySelector('.nav-container').appendChild(hamburger);
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('mobile-active');
        navButtons.classList.toggle('mobile-active');
        hamburger.innerHTML = navLinks.classList.contains('mobile-active') ? '✕' : '☰';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && navLinks.classList.contains('mobile-active')) {
            navLinks.classList.remove('mobile-active');
            navButtons.classList.remove('mobile-active');
            hamburger.innerHTML = '☰';
        }
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('mobile-active');
                navButtons.classList.remove('mobile-active');
                hamburger.innerHTML = '☰';
            }
        });
    });
    
    // Handle window resize
    function handleResize() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('mobile-active');
            navButtons.classList.remove('mobile-active');
            hamburger.innerHTML = '☰';
        }
    }
    
    window.addEventListener('resize', handleResize);
}

// Initialize mobile menu when DOM is loaded
document.addEventListener('DOMContentLoaded', createMobileMenu);

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';

        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            // Add load event listener
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });

            // Add error handling
            img.addEventListener('error', function() {
                console.error('Failed to load image:', this.src);
                this.style.opacity = '1'; // Show broken image
            });
        }
    });
});

// Form validation enhancement
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

document.getElementById('email').addEventListener('blur', function() {
    const email = this.value;
    if (email && !validateEmail(email)) {
        this.style.borderColor = '#ff4444';
        
        // Remove error styling on focus
        this.addEventListener('focus', function() {
            this.style.borderColor = '#6B9080';
        }, { once: true });
    }
});

// Add success message for form submission
function showSuccessMessage() {
    const form = document.getElementById('contactForm');
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = '✓ Message sent successfully!';
    successDiv.style.cssText = `
        background: #4CAF50;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        text-align: center;
        animation: slideIn 0.3s ease;
    `;
    
    form.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Update form submission to use success message
document.getElementById('contactForm').removeEventListener('submit', function() {});
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name && email && message && validateEmail(email)) {
        showSuccessMessage();
        this.reset();
    } else {
        alert('Please fill in all fields with valid information.');
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .mobile-active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #6B9080;
        padding: 1rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
`;
document.head.appendChild(style);

// Add fade-in animation on scroll for sections

document.addEventListener('DOMContentLoaded', () => {
    const fadeEls = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );
    fadeEls.forEach(el => observer.observe(el));
});

// Audience toggle switch
const audienceSwitch = document.getElementById('audienceSwitch');
const audienceLabel = document.getElementById('audienceLabel');
const studentsBlock = document.getElementById('studentsBlock');
const mentorsBlock = document.getElementById('mentorsBlock');

audienceSwitch.addEventListener('change', function() {
  if (this.checked) {
    audienceLabel.textContent = 'For Mentors';
    studentsBlock.style.display = 'none';
    mentorsBlock.style.display = 'block';
  } else {
    audienceLabel.textContent = 'For Students';
    studentsBlock.style.display = 'block';
    mentorsBlock.style.display = 'none';
  }
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const carouselDots = document.querySelectorAll('.carousel-dot');
    const productCards = document.querySelectorAll('.product-card');
    
    // Function to update active dot and slide
    function updateCarousel() {
        const hash = window.location.hash || '#slide1';
        
        // Update dots
        carouselDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('href') === hash) {
                dot.classList.add('active');
            }
        });
        
        // Update slides
        productCards.forEach(card => {
            card.style.display = 'none';
        });
        const activeSlide = document.querySelector(hash);
        if (activeSlide) {
            activeSlide.style.display = 'flex';
        }
    }
    
    // Initialize carousel
    updateCarousel();
    
    // Update on hash change
    window.addEventListener('hashchange', updateCarousel);
    
    // Add click handlers to dots
    carouselDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = dot.getAttribute('href');
            window.location.hash = targetId;
        });
    });
});

// FAQ Accordion
function initFAQ() {
    const faqButtons = document.querySelectorAll('.faq-question');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Initialize FAQ when DOM is loaded
document.addEventListener('DOMContentLoaded', initFAQ);

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
    console.log('DOM Content Loaded');
    initChatbot();
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.section-title, .product-card');
    
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
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    hamburger.style.display = 'none';
    hamburger.style.background = 'none';
    hamburger.style.border = 'none';
    hamburger.style.color = 'white';
    hamburger.style.fontSize = '1.5rem';
    hamburger.style.cursor = 'pointer';
    
    nav.querySelector('.nav-container').appendChild(hamburger);
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('mobile-active');
    });
    
    // Show/hide hamburger based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            hamburger.style.display = 'block';
            navLinks.style.display = navLinks.classList.contains('mobile-active') ? 'flex' : 'none';
        } else {
            hamburger.style.display = 'none';
            navLinks.style.display = 'flex';
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', createMobileMenu);

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
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

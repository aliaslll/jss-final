
console.log(' script.js is loading!');


window.testCookie = function() {
    console.log(' Testing cookie function...');
    localStorage.removeItem('cookies-accepted');
    initCookieNotification();
};

document.addEventListener('DOMContentLoaded', function() {
    console.log(' DOM Content Loaded - Starting initialization');
    

    initBurgerMenu();
    initQuantityControls();
    initFormValidation();
    initSlider();
    initAccordion();
    initFilter();
    initLocalStorage();
    initScrollToTop();
    initApiCalls();
    initCookieNotification(); 
    console.log(' All functions initialized successfully!');
});

function initCookieNotification() {

    console.log(' Checking cookies...');
    
    // ამოწმებს აქვს თუ არა მომხმარებელს უკვე დათანხმებული cookies
    // თუ კი — შეტყობინება აღარ გამოჩნდება
    if (localStorage.getItem('cookies-accepted') === 'true') {
        console.log(' Cookies already accepted');
        return;
    }
    
    console.log('🆕 Showing cookie notification');
    
  
    const cookieHTML = `
        <div id="cookieNotification" style="
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(80, 50, 23, 0.95);
            color: white;
            padding: 20px;
            z-index: 10000;
            box-shadow: 0 -4px 12px rgba(0,0,0,0.3);
            font-family: 'poppins', sans-serif;
        ">
            <div style="
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 20px;
            ">
                <p style="margin: 0; font-size: 14px; line-height: 1.5; flex: 1;">
                     We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
                </p>
                <div style="display: flex; gap: 10px;">
                    <button id="cookieAcceptBtn" style="
                        padding: 10px 20px;
                        background: white;
                        color: rgba(80, 50, 23, 1);
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        font-family: 'poppins', sans-serif;
                        font-weight: 500;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'" 
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                        Accept
                    </button>
                </div>
            </div>
        </div>
    `;
    

    document.body.insertAdjacentHTML('beforeend', cookieHTML);
    
  
    document.getElementById('cookieAcceptBtn').addEventListener('click', function() {
        console.log(' Cookie accept clicked');
        localStorage.setItem('cookies-accepted', 'true');
        const notification = document.getElementById('cookieNotification');
        if (notification) {
            notification.style.transition = 'all 0.5s ease';
            notification.style.transform = 'translateY(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 500);
        }
        showSuccess('Cookie preferences saved!');
    });
    
    console.log(' Cookie notification displayed');
}


function initBurgerMenu() {
      // Mobile burger menu toggle
    // ხსნის და ხურავს მენიუს
    const burgerMenu = document.getElementById('burgerMenu');
    const nav = document.getElementById('nav');
    const navOverlay = document.getElementById('navOverlay');
    
    if (!burgerMenu || !nav || !navOverlay) {
        console.log(' Burger menu elements not found');
        return;
    }
    
    burgerMenu.addEventListener('click', function() {
        nav.classList.toggle('active');
        burgerMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    navOverlay.addEventListener('click', function() {
        nav.classList.remove('active');
        burgerMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burgerMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

function initQuantityControls() {
      
    const quantityInput = document.getElementById('quantity');
    const upBtn = document.querySelector('.up');
    const downBtn = document.querySelector('.down');

    if (upBtn && downBtn && quantityInput) {
        upBtn.addEventListener('click', () => {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });

        downBtn.addEventListener('click', () => {
            if (parseInt(quantityInput.value) > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });
    }
}


function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            clearErrors();
            
            if (!name.value.trim()) {
                showError(name, 'Full name is required');
                isValid = false;
            }
            
            if (!email.value.trim()) {
                showError(email, 'Email address is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, 'Message must be at least 10 characters long');
                isValid = false;
            }
            
            if (isValid) {
                showSuccess('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '14px';
    errorElement.style.marginTop = '5px';
    
    input.style.borderColor = 'red';
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function initSlider() {
     // ფოტო—სლაიდერი: ავტომატური სლაიდი, next/prev, dots და hover pause
    const sliderContainer = document.querySelector('.social-photos');
    if (!sliderContainer) return;
    
    const images = sliderContainer.querySelectorAll('img');
    if (images.length === 0) return;
    
    sliderContainer.innerHTML = `
        <div class="slider-wrapper">
            <div class="slider-track">
                ${Array.from(images).map(img => `
                    <div class="slide">
                        ${img.outerHTML}
                    </div>
                `).join('')}
            </div>
            <button class="slider-prev">❮</button>
            <button class="slider-next">❯</button>
            <div class="slider-dots"></div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .slider-wrapper {
            position: relative;
            max-width: 800px;
            margin: 0 auto;
            overflow: hidden;
            border-radius: 10px;
        }
        .slider-track {
            display: flex;
            transition: transform 0.5s ease;
        }
        .slide {
            min-width: 100%;
            text-align: center;
            padding: 10px;
        }
        .slide img {
            max-width: 200px;
            max-height: 340px;
            width: auto;
            height: auto;
            margin: 0 auto;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            transition: transform 0.3s ease;
        }
        .slide img:hover {
            transform: scale(1.05);
        }
        .slider-prev, .slider-next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(80, 50, 23, 0.8);
            color: white;
            border: none;
            padding: 12px 16px;
            cursor: pointer;
            border-radius: 50%;
            font-size: 18px;
            transition: all 0.3s ease;
            z-index: 10;
        }
        .slider-prev:hover, .slider-next:hover {
            background: rgba(80, 50, 23, 1);
            transform: translateY(-50%) scale(1.1);
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .slider-prev { left: 15px; }
        .slider-next { right: 15px; }
        .slider-dots {
            display: flex;
            justify-content: center;
            margin-top: 20px;
            gap: 10px;
        }
        .slider-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #ccc;
            cursor: pointer;
            border: none;
            transition: all 0.3s ease;
        }
        .slider-dot:hover {
            transform: scale(1.2);
        }
        .slider-dot.active {
            background: rgba(80, 50, 23, 1);
            transform: scale(1.2);
        }
    `;
    document.head.appendChild(style);
    
    const track = sliderContainer.querySelector('.slider-track');
    const slides = sliderContainer.querySelectorAll('.slide');
    const prevBtn = sliderContainer.querySelector('.slider-prev');
    const nextBtn = sliderContainer.querySelector('.slider-next');
    const dotsContainer = sliderContainer.querySelector('.slider-dots');
    
    let currentSlide = 0;
    let autoSlideInterval;
    
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    function updateSlider() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
        resetAutoSlide();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
    
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
    
    startAutoSlide();
}

function initAccordion() {
    const aboutPage = document.querySelector('.paragraph-text');
    const contactPage = document.querySelector('.contact-header');
    
    if ((aboutPage || contactPage) && !document.querySelector('.accordion')) {
        const accordionContainer = aboutPage || contactPage;
        
        const accordionHTML = `
            <div class="accordion">
                <div class="accordion-item">
                    <button class="accordion-header">
                        Why choose our medicines? 
                        <span class="accordion-icon">+</span>
                    </button>
                    <div class="accordion-content">
                        <p>Our medicines undergo rigorous testing and quality control to ensure safety and effectiveness.</p>
                    </div>
                </div>
                <div class="accordion-item">
                    <button class="accordion-header">
                        Are your products certified?
                        <span class="accordion-icon">+</span>
                    </button>
                    <div class="accordion-content">
                        <p>Yes, all our products are certified by relevant health authorities and meet international standards.</p>
                    </div>
                </div>
                <div class="accordion-item">
                    <button class="accordion-header">
                        Do you offer international shipping?
                        <span class="accordion-icon">+</span>
                    </button>
                    <div class="accordion-content">
                        <p>Currently we ship within the country, but we're working on expanding our international delivery options.</p>
                    </div>
                </div>
            </div>
        `;
        
        accordionContainer.insertAdjacentHTML('afterend', accordionHTML);
        
        const style = document.createElement('style');
        style.textContent = `
            .accordion {
                max-width: 800px;
                margin: 30px auto;
                font-family: 'poppins', sans-serif;
            }
            .accordion-item {
                border: 1px solid rgba(80, 50, 23, 0.2);
                border-radius: 8px;
                margin-bottom: 10px;
                overflow: hidden;
                background: white;
                transition: all 0.3s ease;
            }
            .accordion-item:hover {
                box-shadow: 0 4px 12px rgba(119, 52, 10, 0.4);
            }
            .accordion-header {
                width: 100%;
                padding: 20px;
                background: rgba(238, 237, 231, 1);
                border: none;
                text-align: left;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-family: 'poppins', sans-serif;
                color: rgba(80, 50, 23, 1);
                font-size: 16px;
                font-weight: 500;
                transition: all 0.3s ease;
            }
            .accordion-header:hover {
                background: rgba(80, 50, 23, 0.1);
                transform: translateX(5px);
            }
            .accordion-content {
                padding: 0 20px;
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease, padding 0.3s ease;
                background: white;
            }
            .accordion-content p {
                padding: 20px 0;
                margin: 0;
                color: rgba(80, 50, 23, 0.8);
                line-height: 1.6;
            }
            .accordion-item.active .accordion-content {
                max-height: 300px;
                padding: 0 20px;
            }
            .accordion-item.active .accordion-icon {
                transform: rotate(45deg);
            }
            .accordion-icon {
                transition: transform 0.3s ease;
                font-size: 20px;
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);
        
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const item = this.parentElement;
                const isActive = item.classList.contains('active');
                
                document.querySelectorAll('.accordion-item').forEach(el => {
                    el.classList.remove('active');
                });
                
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }
}


function initFilter() {
    // Category / Price / Search ფილტრები პროდუქტის გვერდისთვის
    const productsList = document.querySelector('.products-list');
    if (!productsList) return;
    
    const filterHTML = `
        <div class="filter-controls">
            <select id="categoryFilter">
                <option value="all">All Categories</option>
                <option value="microscope">Microscopes</option>
                <option value="oximeter">Pulse Oximeters</option>
                <option value="serum">Vitamin Serums</option>
                <option value="protein">High Protein</option>
            </select>
            <select id="priceFilter">
                <option value="all">All Prices</option>
                <option value="0-20">$0 - $20</option>
                <option value="21-40">$21 - $40</option>
                <option value="41-60">$41 - $60</option>
            </select>
            <input type="text" id="searchFilter" placeholder="Search products...">
            <button id="resetFilter">Reset</button>
        </div>
    `;
    
    productsList.insertAdjacentHTML('beforebegin', filterHTML);
    
    const style = document.createElement('style');
    style.textContent = `
        .filter-controls {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin: 20px 0;
            flex-wrap: wrap;
            align-items: center;
            padding: 20px;
            background: rgba(242, 242, 242, 1);
            border-radius: 10px;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }
        .filter-controls select, .filter-controls input {
            padding: 10px 12px;
            border: 2px solid rgba(80, 50, 23, 0.2);
            border-radius: 6px;
            font-family: 'poppins', sans-serif;
            background: white;
            transition: all 0.3s ease;
        }
        .filter-controls select:hover, .filter-controls input:hover {
            border-color: rgba(80, 50, 23, 0.5);
            transform: translateY(-2px);
        }
        .filter-controls input {
            min-width: 200px;
        }
        #resetFilter {
            background: rgba(80, 50, 23, 1);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-family: 'poppins', sans-serif;
            transition: all 0.3s ease;
        }
        #resetFilter:hover {
            background: rgba(60, 40, 20, 1);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
    `;
    document.head.appendChild(style);
    
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const searchFilter = document.getElementById('searchFilter');
    const resetFilter = document.getElementById('resetFilter');
    
    function filterProducts() {
        const categoryValue = categoryFilter.value;
        const priceValue = priceFilter.value;
        const searchValue = searchFilter.value.toLowerCase();
        
        const products = productsList.querySelectorAll('.products-row');
        
        products.forEach(product => {
            const title = product.querySelector('h3').textContent.toLowerCase();
            const priceText = product.querySelector('p').textContent;
            const price = parseInt(priceText.replace(/[^0-9]/g, '')) || 0;
            
            let categoryMatch = categoryValue === 'all';
            if (!categoryMatch) {
                const categoryMap = {
                    'microscope': 'microscope',
                    'oximeter': 'pulse oximeter',
                    'serum': 'vitamin serum',
                    'protein': 'high protein'
                };
                categoryMatch = title.includes(categoryMap[categoryValue]);
            }
            
            let priceMatch = priceValue === 'all';
            if (!priceMatch && priceValue !== 'all') {
                const [min, max] = priceValue.split('-').map(Number);
                priceMatch = price >= min && price <= max;
            }
            
            let searchMatch = title.includes(searchValue);
            
            if (categoryMatch && priceMatch && searchMatch) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }
        });
    }
    
    function resetFilters() {
        categoryFilter.value = 'all';
        priceFilter.value = 'all';
        searchFilter.value = '';
        filterProducts();
    }
    
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
    searchFilter.addEventListener('input', filterProducts);
    resetFilter.addEventListener('click', resetFilters);
}

function initLocalStorage() {
    // Dark / Light theme toggle + localStorage-ში შენახვა
    const themeToggle = document.createElement('button');
    themeToggle.textContent = '🌙 Toggle Theme';
    themeToggle.style.cssText = `
        position: fixed;
        top: 70px;
        right: 10px;
        z-index: 1000;
        padding: 10px 15px;
        background: rgba(80, 50, 23, 1);
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-family: 'poppins', sans-serif;
        font-size: 12px;
        transition: all 0.3s ease;
    `;
    
    themeToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    themeToggle.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
    
    document.body.appendChild(themeToggle);
    
    const savedTheme = localStorage.getItem('medifit-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.textContent = '☀️ Light Mode';
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('medifit-theme', isDark ? 'dark' : 'light');
        themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    });
    
    const style = document.createElement('style');
    style.textContent = `
        .dark-theme {
            background-color: #4d22018d;
            color: #e0e0e0;
            
        }

        .dark-theme ul li {
            color: black !important;}
        .dark-theme p {
    color: black !important;
}
        .dark-theme .header {
            background-color: rgba(80, 50, 23, 0.53);
        }
        .dark-theme .nav a {
            color: #e0e0e0;
        }
        .dark-theme .footer-box {
            background-color: rgba(80, 50, 23, 1);
        }
        .dark-theme .contact-container {
            background-color:rgba(80, 50, 23, 1);
        }
    `;
    document.head.appendChild(style);
}


function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 1000;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(80, 50, 23, 0.9);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        display: none;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollBtn);
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(80, 50, 23, 1)';
        this.style.transform = 'scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(80, 50, 23, 0.9)';
        this.style.transform = 'scale(1)';
    });
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
}

function initApiCalls() {
     // FAQ სტილის accordion ბლოკი
    async function fetchTestimonials() {
        try {
            const response = await fetch('https://randomuser.me/api/?results=3');
            const data = await response.json();
            
            const testimonials = document.querySelector('.rating');
            if (testimonials) {
                const ratingRows = testimonials.querySelectorAll('.rating-row');
                
                data.results.forEach((user, index) => {
                    if (ratingRows[index]) {
                        const costumerDiv = ratingRows[index].querySelector('.costumer');
                        if (costumerDiv) {
                            const img = costumerDiv.querySelector('img');
                            const name = costumerDiv.querySelector('p');
                            
                            if (img && img.src.includes('photos/icons/')) {
                                img.src = user.picture.medium;
                            }
                            if (name) {
                                name.textContent = `${user.name.first} ${user.name.last}`;
                            }
                        }
                    }
                });
            }
        } catch (error) {
            console.log('Using original testimonial data');
        }
    }
    
    fetchTestimonials();
}


const loader = document.createElement('div');
loader.innerHTML = `
    <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(232, 230, 222, 0.95);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    ">
        <div style="
            width: 50px;
            height: 50px;
            border: 5px solid rgba(80, 50, 23, 0.3);
            border-top: 5px solid rgba(80, 50, 23, 1);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        "></div>
        <p style="color: rgba(80, 50, 23, 1); font-family: poppins;">Loading MediFit...</p>
    </div>
    <style>
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
`;

document.body.appendChild(loader);

window.addEventListener('load', () => {
    setTimeout(() => {
        loader.remove();
    }, 1000);
});

console.log(' MediFit JavaScript fully loaded!');
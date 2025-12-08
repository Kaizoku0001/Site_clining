// ===== TAZALYK SERVICE - ENHANCED JAVASCRIPT (ИСПРАВЛЕННЫЙ) =====
(function() {
    'use strict';
    
    // ===== CONFIGURATION (ОБНОВЛЕННЫЙ INSTAGRAM) =====
    const CONFIG = {
        whatsapp: {
            phone1: '77474507959',
            phone2: '77777777777',
            message: 'Здравствуйте! Хочу получить консультацию по уборке.'
        },
        instagram: 'tazalyk_service82',
        instagram_url: 'https://www.instagram.com/tazalyk_service82?igsh=MWtvMnY0Zm5qd2czaA%3D%3D&utm_source=qr',
        email: 'servicetazalyk@gmail.com',
        location: 'Алматы, Казахстан'
    };
    
    // ===== DOM CACHE =====
    const DOM = {
        preloader: document.getElementById('preloader'),
        header: document.querySelector('.header'),
        menuToggle: document.getElementById('menuToggle'),
        mobileMenu: document.getElementById('mobileMenu'),
        scrollTop: document.getElementById('scrollTop'),
        processSteps: document.querySelectorAll('.process-step'),
        serviceCards: document.querySelectorAll('.service-card'),
        portfolioItems: document.querySelectorAll('.portfolio-item'),
        socialLinks: document.querySelectorAll('.social-link'),
        contactLinks: document.querySelectorAll('footer a[href^="http"], footer a[href^="mailto"]')
    };
    
    // ===== STATE =====
    let state = {
        isModalOpen: false,
        isMobileMenuOpen: false,
        isScrolled: false,
        currentStep: 0
    };
    
    // ===== INITIALIZATION =====
    function init() {
        console.log('🚀 Tazalyk Service - Initializing...');
        
        // 1. Hide preloader
        hidePreloader();
        
        // 2. Initialize all components
        initMobileMenu();
        initScrollTop();
        initSmoothScroll();
        initProcessSteps();
        initServiceCards();
        initPortfolioItems();
        initSocialLinks();
        initContactLinks();
        initParticles();
        initScrollAnimations();
        initButtonEffects();
        initLazyLoadImages();
        
        // 3. Add loaded class
        document.documentElement.classList.add('js-loaded');
        
        console.log('✅ Initialization complete!');
    }
    
    // ===== PRELOADER =====
    function hidePreloader() {
        if (!DOM.preloader) return;
        
        // Hide preloader after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                DOM.preloader.style.opacity = '0';
                setTimeout(() => {
                    DOM.preloader.style.display = 'none';
                }, 300);
            }, 500);
        });
        
        // Fallback if page takes too long to load
        setTimeout(() => {
            if (DOM.preloader.style.display !== 'none') {
                DOM.preloader.style.opacity = '0';
                setTimeout(() => {
                    DOM.preloader.style.display = 'none';
                }, 300);
            }
        }, 3000);
    }
    
    // ===== MOBILE MENU =====
    function initMobileMenu() {
        if (!DOM.menuToggle) return;
        
        DOM.menuToggle.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking links
        document.querySelectorAll('.mobile-menu-link, .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (state.isMobileMenuOpen) {
                    closeMobileMenu();
                }
            });
        });
        
        // Close menu on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && state.isMobileMenuOpen) {
                closeMobileMenu();
            }
        });
    }
    
    function toggleMobileMenu() {
        if (state.isMobileMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function openMobileMenu() {
        state.isMobileMenuOpen = true;
        document.body.style.overflow = 'hidden';
        DOM.menuToggle.innerHTML = '<span style="transform: rotate(45deg) translate(5px, 5px);"></span><span style="opacity: 0;"></span><span style="transform: rotate(-45deg) translate(7px, -6px);"></span>';
    }
    
    function closeMobileMenu() {
        state.isMobileMenuOpen = false;
        document.body.style.overflow = '';
        DOM.menuToggle.innerHTML = '<span></span><span></span><span></span>';
    }
    
    // ===== SCROLL TOP BUTTON =====
    function initScrollTop() {
        if (!DOM.scrollTop) return;
        
        DOM.scrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== SMOOTH SCROLL =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#' || href === '#!') {
                    e.preventDefault();
                    return;
                }
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerHeight = DOM.header ? DOM.header.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ===== PROCESS STEPS ANIMATION =====
    function initProcessSteps() {
        if (!DOM.processSteps || DOM.processSteps.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.classList.add('animated');
                    }, index * 150);
                }
            });
        }, { threshold: 0.1, rootMargin: '-50px' });
        
        DOM.processSteps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(30px)';
            step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(step);
            
            // Add hover effect
            step.addEventListener('mouseenter', () => {
                if (!step.classList.contains('animated')) return;
                step.style.transform = 'translateY(-10px)';
            });
            
            step.addEventListener('mouseleave', () => {
                if (!step.classList.contains('animated')) return;
                step.style.transform = 'translateY(0)';
            });
            
            // Add click effect
            step.addEventListener('click', () => {
                step.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    step.style.transform = '';
                }, 200);
            });
        });
    }
    
    // ===== SERVICE CARDS ANIMATION =====
    function initServiceCards() {
        if (!DOM.serviceCards || DOM.serviceCards.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        DOM.serviceCards.forEach(card => {
            observer.observe(card);
            
            // Add hover effect
            card.addEventListener('mouseenter', () => {
                if (!card.classList.contains('animated')) return;
                card.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('animated')) return;
                card.style.transform = '';
            });
        });
    }
    
    // ===== PORTFOLIO ITEMS ANIMATION =====
    function initPortfolioItems() {
        if (!DOM.portfolioItems || DOM.portfolioItems.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        DOM.portfolioItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    // ===== SOCIAL LINKS ANIMATION =====
    function initSocialLinks() {
        if (!DOM.socialLinks || DOM.socialLinks.length === 0) return;
        
        DOM.socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-3px)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = '';
            });
            
            link.addEventListener('click', (e) => {
                // Add click animation
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = '';
                }, 200);
                
                // Track Instagram click
                if (link.href.includes('instagram')) {
                    console.log('Instagram link clicked');
                }
            });
        });
    }
    
    // ===== CONTACT LINKS =====
    function initContactLinks() {
        if (!DOM.contactLinks || DOM.contactLinks.length === 0) return;
        
        DOM.contactLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Track clicks for analytics
                const platform = link.href.includes('whatsapp') ? 'WhatsApp' :
                               link.href.includes('instagram') ? 'Instagram' :
                               link.href.includes('mailto') ? 'Email' : 'Other';
                
                console.log(`Clicked ${platform} link: ${link.href}`);
            });
        });
    }
    
    // ===== PARTICLES =====
    function initParticles() {
        const container = document.querySelector('.particles-container');
        if (!container) return;
        
        // Create particles
        const particleCount = window.innerWidth < 768 ? 15 : 30;
        
        for (let i = 0; i < particleCount; i++) {
            createParticle(container);
        }
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 60 + 20;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            top: ${posY}%;
            left: ${posX}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            opacity: ${0.05 + Math.random() * 0.1};
            background: ${Math.random() > 0.5 ? 
                'linear-gradient(135deg, rgba(0, 191, 255, 0.3), rgba(63, 212, 107, 0.3))' :
                'linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(255, 149, 0, 0.2))'};
            border-radius: ${Math.random() > 0.7 ? '50%' : '30%'};
        `;
        
        container.appendChild(particle);
    }
    
    // ===== SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        // Header animation on scroll
        window.addEventListener('scroll', debounce(() => {
            const scrollPosition = window.scrollY;
            
            // Header shadow
            if (DOM.header) {
                if (scrollPosition > 50) {
                    DOM.header.classList.add('scrolled');
                    state.isScrolled = true;
                } else {
                    DOM.header.classList.remove('scrolled');
                    state.isScrolled = false;
                }
            }
            
            // Scroll to top button
            if (DOM.scrollTop) {
                if (scrollPosition > 500) {
                    DOM.scrollTop.style.display = 'block';
                    setTimeout(() => {
                        DOM.scrollTop.style.opacity = '1';
                    }, 10);
                } else {
                    DOM.scrollTop.style.opacity = '0';
                    setTimeout(() => {
                        if (scrollPosition <= 500) {
                            DOM.scrollTop.style.display = 'none';
                        }
                    }, 300);
                }
            }
            
            // Animate sections on scroll
            animateOnScroll();
        }, 10));
    }
    
    function animateOnScroll() {
        const elements = document.querySelectorAll('.process-step, .service-card, .portfolio-item');
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + scrollPosition;
            const elementVisible = 150;
            
            if (scrollPosition > elementTop - windowHeight + elementVisible) {
                element.classList.add('animate-in');
            }
        });
    }
    
    // ===== BUTTON EFFECTS =====
    function initButtonEffects() {
        document.querySelectorAll('.btn-primary, .btn-secondary, .btn-contact').forEach(btn => {
            btn.addEventListener('mousedown', () => {
                btn.style.transform = 'scale(0.95)';
            });
            
            btn.addEventListener('mouseup', () => {
                btn.style.transform = '';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }
    
    // ===== LAZY LOAD IMAGES =====
    function initLazyLoadImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            }, { rootMargin: '50px 0px' });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for old browsers
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }
    
    // ===== UTILITY FUNCTIONS =====
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
    
    function showToast(message, type = 'info') {
        // Remove existing toasts
        document.querySelectorAll('.toast').forEach(toast => toast.remove());
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: ${type === 'success' ? '#3fd46b' : 
                         type === 'error' ? '#ff6b6b' : 
                         type === 'warning' ? '#ff9500' : '#00bfff'};
            color: white;
            padding: 15px 25px;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            max-width: 350px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(toast);
        
        // Add CSS for animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // Remove after 4 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                toast.remove();
                style.remove();
            }, 300);
        }, 4000);
    }
    
    // ===== GLOBAL FUNCTIONS =====
    window.APP = window.APP || {};
    
    // Extend APP with enhanced functions
    Object.assign(window.APP, {
        // Open WhatsApp modal (phone 1) - ГЛАВНАЯ КНОПКА
        openWhatsAppModal: function() {
            const url = `https://wa.me/${CONFIG.whatsapp.phone1}?text=${encodeURIComponent(CONFIG.whatsapp.message)}`;
            window.open(url, '_blank');
            showToast('✅ WhatsApp открыт! Напишите нам для консультации.', 'success');
        },
        
        // Open WhatsApp 2
        openWhatsApp2: function() {
            const url = `https://wa.me/${CONFIG.whatsapp.phone2}?text=${encodeURIComponent(CONFIG.whatsapp.message)}`;
            window.open(url, '_blank');
            showToast('✅ WhatsApp 2 открыт!', 'success');
        },
        
        // Open Instagram (ИСПРАВЛЕННАЯ ФУНКЦИЯ)
        openInstagram: function() {
            window.open(CONFIG.instagram_url, '_blank');
            showToast('📸 Переходим в Instagram!', 'info');
        },
        
        // Send email
        sendEmail: function() {
            window.location.href = `mailto:${CONFIG.email}?subject=Запрос на уборку&body=Здравствуйте! Хочу получить консультацию по уборке.`;
            showToast('📧 Открываем почту...', 'info');
        },
        
        // Show location
        showLocation: function() {
            const message = `Мы находимся в ${CONFIG.location}. Работаем по всему городу!`;
            showToast(message, 'info');
            
            // Optional: Open Google Maps
            setTimeout(() => {
                if (confirm('Открыть карту Алматы?')) {
                    window.open('https://maps.google.com/?q=Алматы', '_blank');
                }
            }, 2000);
        },
        
        // Submit contact form
        submitContactForm: function(e) {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate
            if (!data.name || !data.phone) {
                showToast('⚠️ Пожалуйста, заполните все обязательные поля', 'error');
                return;
            }
            
            // Prepare message
            const message = `📋 Новая заявка с сайта Tazalyk Service\n\n👤 Имя: ${data.name}\n📞 Телефон: ${data.phone}\n📅 Дата: ${new Date().toLocaleDateString('ru-RU')}\n⏰ Время: ${new Date().toLocaleTimeString('ru-RU')}`;
            const url = `https://wa.me/${CONFIG.whatsapp.phone1}?text=${encodeURIComponent(message)}`;
            
            // Open WhatsApp
            window.open(url, '_blank');
            
            // Show success message
            showToast('✅ Заявка отправлена! Мы свяжемся с вами в течение 15 минут.', 'success');
            
            // Reset form
            form.reset();
            
            // Optional: Send to analytics
            console.log('Form submitted:', data);
        },
        
        // Highlight process step
        highlightProcessStep: function(stepNumber) {
            const step = document.querySelector(`.process-step:nth-child(${stepNumber})`);
            if (step) {
                step.style.boxShadow = '0 15px 40px rgba(0, 191, 255, 0.4)';
                step.style.transform = 'scale(1.05)';
                
                setTimeout(() => {
                    step.style.boxShadow = '';
                    step.style.transform = '';
                }, 1000);
                
                showToast(`Шаг ${stepNumber} выделен!`, 'info');
            }
        },
        
        // Animate all process steps
        animateProcessSection: function() {
            const steps = document.querySelectorAll('.process-step');
            steps.forEach((step, index) => {
                setTimeout(() => {
                    step.classList.add('highlighted');
                    
                    setTimeout(() => {
                        step.classList.remove('highlighted');
                    }, 1000);
                }, index * 300);
            });
            
            showToast('Анимируем процесс работы!', 'info');
        },
        
        // Copy phone number
        copyPhoneNumber: function(phoneNumber) {
            navigator.clipboard.writeText(phoneNumber).then(() => {
                showToast('✅ Номер скопирован в буфер обмена!', 'success');
            }).catch(err => {
                showToast('❌ Не удалось скопировать номер', 'error');
                console.error('Copy failed:', err);
            });
        }
    });
    
    // ===== ERROR HANDLING =====
    window.addEventListener('error', function(e) {
        console.error('Global error:', e.error);
        
        // Don't show toast for minor errors
        if (e.message && e.message.includes('ResizeObserver')) return;
        
        showToast('⚠️ Произошла ошибка. Пожалуйста, обновите страницу.', 'error');
    });
    
    // ===== PERFORMANCE MONITORING =====
    window.addEventListener('load', function() {
        // Report load time
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            
            console.log(`📊 Page loaded in ${loadTime}ms`);
            
            if (loadTime > 3000) {
                console.warn('Page load time is high:', loadTime, 'ms');
            }
        }
    });
    
    // ===== STARTUP =====
    // Wait for DOM and critical resources
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // Quick initialization for critical features
            quickInit();
            
            // Full initialization after a delay
            setTimeout(init, 100);
        });
    } else {
        // DOM already loaded
        quickInit();
        setTimeout(init, 100);
    }
    
    // Quick initialization for critical features
    function quickInit() {
        // Initialize scroll top button visibility
        if (DOM.scrollTop && window.scrollY > 500) {
            DOM.scrollTop.style.display = 'block';
            DOM.scrollTop.style.opacity = '1';
        }
        
        // Initialize header state
        if (DOM.header && window.scrollY > 50) {
            DOM.header.classList.add('scrolled');
            state.isScrolled = true;
        }
        
        // Hide preloader quickly
        if (DOM.preloader) {
            setTimeout(() => {
                DOM.preloader.style.opacity = '0';
            }, 300);
        }
    }
    
    // ===== ADDITIONAL ENHANCEMENTS =====
    
    // Form validation enhancement
    function enhanceForms() {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function(e) {
                const inputs = this.querySelectorAll('input[required], textarea[required]');
                let isValid = true;
                
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.style.borderColor = '#ff6b6b';
                        
                        setTimeout(() => {
                            input.style.borderColor = '';
                        }, 2000);
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                    showToast('⚠️ Заполните все обязательные поля', 'error');
                }
            });
        });
    }
    
    // Add keyboard shortcuts
    function initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + W to open WhatsApp
            if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
                e.preventDefault();
                APP.openWhatsAppModal();
            }
            
            // Ctrl/Cmd + I to open Instagram
            if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
                e.preventDefault();
                APP.openInstagram();
            }
            
            // Escape to close modals/menus
            if (e.key === 'Escape') {
                if (state.isMobileMenuOpen) {
                    closeMobileMenu();
                }
            }
        });
    }
    
    // Initialize enhancements after main init
    setTimeout(() => {
        enhanceForms();
        initKeyboardShortcuts();
        
        // Add Instagram click tracking
        const instagramLink = document.querySelector('a[href*="instagram.com/tazalyk_service82"]');
        if (instagramLink) {
            instagramLink.addEventListener('click', () => {
                console.log('Instagram profile clicked - tazalyk_service82');
            });
        }
    }, 1000);
    
    // ===== EXPORT FOR DEBUGGING =====
    window._TazalykDebug = {
        config: CONFIG,
        state: state,
        dom: DOM,
        version: '1.0.1',
        reload: () => window.location.reload()
    };
    
})();

// ===== POLYFILLS =====
// IntersectionObserver polyfill for old browsers
if (!window.IntersectionObserver) {
    console.warn('IntersectionObserver not supported - loading polyfill');
    const script = document.createElement('script');
    script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
    document.head.appendChild(script);
}
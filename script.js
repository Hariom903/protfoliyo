document.addEventListener('DOMContentLoaded', () => {
    
    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    if(preloader) {
        setTimeout(() => { 
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 800);
    }

    // ===== HEADER & SCROLL LOGIC =====
    const header = document.getElementById('header');
    const scrollTopBtn = document.getElementById('scroll-top');
    const progressBar = document.getElementById('scroll-progress');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    window.addEventListener('scroll', () => {
        // Scroll Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if(progressBar) progressBar.style.width = scrolled + "%";

        // Header Style
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll to top button
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
        
        // Active Nav Link mapping
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // ===== MOBILE MENU =====
    const menuBtn = document.getElementById('menu');
    const navbar = document.getElementById('navbar');
    
    if(menuBtn && navbar) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('fa-times');
            navbar.classList.toggle('active');
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('fa-times');
                navbar.classList.remove('active');
            });
        });
    }

    // ===== CUSTOM CURSOR =====
    const cursorDot = document.getElementById('cursor-dot');
    const cursorGlow = document.getElementById('cursor-glow');
    
    if(cursorDot && cursorGlow) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            // Fast follow for dot
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Slow follow for glow
            cursorGlow.style.left = `${posX}px`;
            cursorGlow.style.top = `${posY}px`;
        });

        // Add hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .glass-panel');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorDot.classList.add('active'));
            el.addEventListener('mouseleave', () => cursorDot.classList.remove('active'));
        });
    }

    // ===== TYPED JS =====
    if (typeof Typed !== 'undefined') {
        new Typed('.typing-text', {
            strings: ['Backend Engineer', 'Laravel Expert', 'AWS Deployer', 'API Architect'],
            loop: true,
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000
        });
    }

    // ===== PARTICLES JS =====
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#3b82f6" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.3, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#3b82f6",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } },
                    "push": { "particles_nb": 2 }
                }
            },
            "retina_detect": true
        });
    }

    // ===== INIT AOS ANIMATIONS =====
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out-cubic',
            once: true,
            offset: 50
        });
    }

    // ===== STATIC PROJECTS DATA =====
    const projectsData = [
        {
            title: "Toll Management System",
            desc: "A scalable toll plaza management system engineered to handle high-throughput transactions. Features real-time dashboard analytics and automated reporting.",
            techStack: ["Laravel", "MySQL", "AWS RDS", "Redis"],
            live: "#",
            github: "https://github.com/hariom903",
            img: "https://images.unsplash.com/photo-1595846175056-5541e2bf75d2?auto=format&fit=crop&w=600&q=80"
        },
        {
            title: "Survey Management System",
            desc: "Dynamic survey generation and response collection platform. Engineered with a flexible schema to allow varied question types and complex analytics.",
            techStack: ["PHP", "Laravel", "MySQL", "Chart.js"],
            live: "#",
            github: "https://github.com/hariom903",
            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
        },
        {
            title: "Garage Management SaaS",
            desc: "Multi-tenant SaaS application for garage owners. Features include inventory tracking, billing, job cards, and SMS notifications.",
            techStack: ["Laravel", "MySQL", "Stripe API", "Twilio"],
            live: "#",
            github: "https://github.com/hariom903",
            img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80"
        },
        {
            title: "Attendance & Payroll System",
            desc: "Enterprise HRMS module managing employee attendance via biometric APIs, leave approvals, and automated payroll calculations.",
            techStack: ["Laravel", "REST APIs", "AWS EC2", "Cron Jobs"],
            live: "#",
            github: "https://github.com/hariom903",
            img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80"
        },
        {
            title: "Payment Gateway Integration Service",
            desc: "A microservice handling secure payment processing, webhook verifications, and subscription lifecycles using robust design patterns.",
            techStack: ["Laravel", "Razorpay", "Redis", "Webhooks"],
            live: "#",
            github: "https://github.com/hariom903",
            img: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=600&q=80"
        },
        {
            title: "Inventory Management Platform",
            desc: "High-performance inventory tracking system supporting barcode scanning, stock alerts, and multi-warehouse logistics.",
            techStack: ["Laravel", "Vue.js", "MySQL", "AWS S3"],
            live: "#",
            github: "https://github.com/hariom903",
            img: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=600&q=80"
        }
    ];

    const projectsGrid = document.getElementById('projectsGrid');
    if(projectsGrid) {
        projectsData.forEach((p, i) => {
            const delay = (i % 3) * 100;
            const techBadges = p.techStack.map(t => `<span>${t}</span>`).join('');
            
            const cardHtml = `
                <div class="project-card glass-panel" data-aos="fade-up" data-aos-delay="${delay}">
                    <img src="${p.img}" alt="${p.title}" class="project-img" loading="lazy" />
                    <h3>${p.title}</h3>
                    <p>${p.desc}</p>
                    <div class="project-tech">
                        ${techBadges}
                    </div>
                    <div class="project-actions">
                        <a href="${p.live}" target="_blank" class="btn btn-primary" style="flex: 1; padding: 1rem;"><i class="fas fa-external-link-alt"></i> Demo</a>
                        <a href="${p.github}" target="_blank" class="btn btn-outline" style="flex: 1; padding: 1rem;"><i class="fab fa-github"></i> Code</a>
                    </div>
                </div>
            `;
            projectsGrid.innerHTML += cardHtml;
        });
    }

});

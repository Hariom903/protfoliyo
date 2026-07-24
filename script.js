document.addEventListener('DOMContentLoaded', () => {

    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }, 600);
    }

    // ===== HEADER & SCROLL LOGIC =====
    const header = document.getElementById('header');
    const scrollTopBtn = document.getElementById('scroll-top');
    const progressBar = document.getElementById('scroll-progress');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolled + "%";

        if (window.scrollY > 40) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            scrollTopBtn?.classList.add('active');
        } else {
            scrollTopBtn?.classList.remove('active');
        }

        // Active navigation link tracking
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 180) {
                current = section.getAttribute('id') || '';
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (current && a.getAttribute('href')?.includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // ===== MOBILE DRAWER MENU =====
    const menuBtn = document.getElementById('menu');
    const navbar = document.getElementById('navbar');

    if (menuBtn && navbar) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('fa-times');
            navbar.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('fa-times');
                navbar.classList.remove('active');
            });
        });
    }

    // ===== CUSTOM SPOTLIGHT & CURSOR FOLLOW =====
    const cursorDot = document.getElementById('cursor-dot');
    const cursorGlow = document.getElementById('cursor-glow');

    if (cursorDot && cursorGlow) {
        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Smooth aura interpolation
        const animateGlow = () => {
            glowX += (mouseX - glowX) * 0.15;
            glowY += (mouseY - glowY) * 0.15;
            cursorGlow.style.left = `${glowX}px`;
            cursorGlow.style.top = `${glowY}px`;
            requestAnimationFrame(animateGlow);
        };
        animateGlow();

        // Hover scale feedback
        const hoverTargets = document.querySelectorAll('a, button, input, textarea, .glass-card');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => cursorDot.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursorDot.classList.remove('hovered'));
        });
    }

    // ===== SPOTLIGHT TRACKING & 3D TILT FOR GLASS CARDS =====
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Subtle 3D Tilt calculation
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // ===== TYPED JS ANIMATION =====
    if (typeof Typed !== 'undefined' && document.querySelector('.typing-text')) {
        new Typed('.typing-text', {
            strings: [
                'Laravel Developer',
                'Backend Engineer',
                'REST API Architect',
                'AWS Cloud Deployer',
                'SQL Optimization Specialist'
            ],
            typeSpeed: 60,
            backSpeed: 35,
            backDelay: 2000,
            loop: true
        });
    }

    // ===== PARTICLES JS =====
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 50, "density": { "enable": true, "value_area": 900 } },
                "color": { "value": ["#3b82f6", "#a855f7", "#06b6d4"] },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.35, "random": true },
                "size": { "value": 3.5, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 160,
                    "color": "#3b82f6",
                    "opacity": 0.18,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
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
                    "grab": { "distance": 180, "line_linked": { "opacity": 0.4 } },
                    "push": { "particles_nb": 3 }
                }
            },
            "retina_detect": true
        });
    }

    // ===== INIT AOS ANIMATIONS =====
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 850,
            easing: 'ease-out-cubic',
            once: true,
            offset: 40
        });
    }

    // ===== FEATURED PROJECTS DATA =====
    const projectsData = [
        {
            title: "Toll Management System",
            desc: "A scalable toll plaza management system engineered to handle high-throughput vehicle transactions, automated queue management, real-time analytics, and revenue auditing.",
            techStack: ["Laravel", "MySQL", "AWS RDS", "Redis", "REST API"],
            features: [
                "Real-time transaction tracking dashboard",
                "Optimized SQL query performance for peak traffic",
                "Role-based access & automated audit logs"
            ],
            live: "https://github.com/hariom903",
            github: "https://github.com/hariom903",
            img: "https://images.unsplash.com/photo-1595846175056-5541e2bf75d2?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Survey Management System",
            desc: "Dynamic survey builder and response collection platform. Engineered with a flexible normalized database schema to handle variable question types and data analysis.",
            techStack: ["PHP", "Laravel", "MySQL", "Sanctum", "Chart.js"],
            features: [
                "Dynamic form generation engine",
                "Granular survey analytics & report export",
                "Secure multi-user authentication"
            ],
            live: "https://github.com/hariom903",
            github: "https://github.com/hariom903",
            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Attendance & Payroll System",
            desc: "Enterprise HRMS backend module for managing employee attendance via biometric APIs, leave workflows, shift rotas, and automated monthly payroll computation.",
            techStack: ["Laravel", "REST APIs", "AWS EC2", "Cron Jobs", "MySQL"],
            features: [
                "Biometric API data synchronization",
                "Automated monthly salary calculation cron jobs",
                "Leave approval workflow engine"
            ],
            live: "https://github.com/hariom903",
            github: "https://github.com/hariom903",
            img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Garage Management SaaS",
            desc: "Multi-tenant SaaS application for automobile garage owners. Modules include job card creation, inventory tracking, billing invoices, and automated SMS alerts.",
            techStack: ["Laravel", "MySQL", "Stripe API", "Twilio", "AWS S3"],
            features: [
                "Multi-tenant database segregation",
                "Job card and inventory lifecycle tracking",
                "Automated billing & SMS notifications"
            ],
            live: "https://github.com/hariom903",
            github: "https://github.com/hariom903",
            img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Inventory & Warehouse Platform",
            desc: "High-performance inventory control system supporting real-time barcode scanning, stock re-order thresholds, multi-warehouse logistics, and audit trails.",
            techStack: ["Laravel", "Angular", "MySQL", "AWS S3", "Redis"],
            features: [
                "Multi-warehouse stock sync & alert triggers",
                "Fast barcode scanning API responses",
                "Comprehensive stock audit trail"
            ],
            live: "https://github.com/hariom903",
            github: "https://github.com/hariom903",
            img: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Payment Gateway Integration Service",
            desc: "A secure payment microservice engineered for handling multi-currency processing, webhook verification signatures, idempotency, and recurring subscriptions.",
            techStack: ["Laravel", "Razorpay", "Stripe", "Redis", "Webhooks"],
            features: [
                "Robust webhook idempotency verification",
                "Multi-provider payment routing",
                "Transaction log auditing & refund workflows"
            ],
            live: "https://github.com/hariom903",
            github: "https://github.com/hariom903",
            img: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80"
        }
    ];

    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid) {
        projectsGrid.innerHTML = '';
        projectsData.forEach((p, i) => {
            const delay = (i % 3) * 100;
            const techBadges = p.techStack.map(t => `<span>${t}</span>`).join('');
            const featureItems = p.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('');

            const cardHtml = `
                <div class="project-card glass-card" data-aos="fade-up" data-aos-delay="${delay}">
                    <div class="project-img-wrapper">
                        <img src="${p.img}" alt="${p.title}" class="project-img" loading="lazy" />
                        <div class="project-overlay"></div>
                    </div>
                    <h3>${p.title}</h3>
                    <p>${p.desc}</p>
                    <ul class="project-features">
                        ${featureItems}
                    </ul>
                    <div class="project-tech">
                        ${techBadges}
                    </div>
                    <div class="project-actions">
                        <a href="${p.live}" target="_blank" class="btn btn-primary" style="flex: 1; padding: 1.2rem;"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                        <a href="${p.github}" target="_blank" class="btn btn-outline" style="flex: 1; padding: 1.2rem;"><i class="fab fa-github"></i> GitHub</a>
                    </div>
                </div>
            `;
            projectsGrid.innerHTML += cardHtml;
        });
    }

});

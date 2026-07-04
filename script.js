document.addEventListener('DOMContentLoaded', () => {
    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('theme-toggle');
    const toggleIcon = themeToggle ? themeToggle.querySelector('i') : null;
    
    // Check local storage for theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if(toggleIcon) {
            toggleIcon.classList.remove('fa-moon');
            toggleIcon.classList.add('fa-sun');
        }
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                toggleIcon.classList.remove('fa-sun');
                toggleIcon.classList.add('fa-moon');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                toggleIcon.classList.remove('fa-moon');
                toggleIcon.classList.add('fa-sun');
            }
        });
    }

    // ===== PRELOADER =====
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if(preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => { preloader.style.display = 'none'; }, 600);
        }
    });

    // ===== HEADER & SCROLL TOP =====
    const header = document.querySelector('header');
    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            scrollTopBtn.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            scrollTopBtn.classList.remove('active');
        }
        
        // Active Nav Link
        let current = '';
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.navbar a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== CONTACT FORM API INTEGRATION =====
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            const formData = {
                name: contactForm.querySelector('[name="name"]').value,
                email: contactForm.querySelector('[name="email"]').value,
                phone: contactForm.querySelector('[name="phone"]').value,
                message: contactForm.querySelector('[name="message"]').value
            };

            try {
                const response = await fetch('http://localhost:3000/api/messages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                
                if (response.ok) {
                    alert('Message sent successfully!');
                    contactForm.reset();
                } else {
                    alert('Failed to send message. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Server error. Ensure the backend is running.');
            } finally {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        });
    }

    // ===== MOBILE MENU =====
    const menuBtn = document.getElementById('menu');
    const navbar = document.querySelector('.navbar');
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    });

    window.addEventListener('scroll', () => {
        menuBtn.classList.remove('fa-times');
        navbar.classList.remove('active');
    });

    // ===== TYPED JS =====
    if (typeof Typed !== 'undefined') {
        new Typed('.typing-text', {
            strings: ['Full-Stack Developer', 'Laravel & MERN Expert', 'API Designer', 'Problem Solver'],
            loop: true,
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1500
        });
    }

    // ===== SKILLS FETCH =====
    fetch('http://localhost:3000/api/skills')
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('skillsContainer');
            if (container && data.length > 0) {
                container.innerHTML = ''; // Clear fallback data if any
                data.forEach(skill => {
                    const bar = document.createElement('div');
                    bar.className = 'skill-bar';
                    bar.innerHTML = `
                        <img src="${skill.icon}" alt="${skill.name}" loading="lazy" />
                        <span>${skill.name}</span>
                    `;
                    container.appendChild(bar);
                });
            }
        })
        .catch(err => console.error("Error loading skills:", err));

    // ===== PROJECT DATA FETCH & RENDER =====
    let projectsData = [];
    fetch('http://localhost:3000/api/projects')
        .then(res => res.json())
        .then(data => {
            projectsData = data;
            renderProjects();
        })
        .catch(err => {
            console.error("Error loading projects from DB:", err);
            // Fallback could be here if needed
        });

    function renderProjects() {
        const grid = document.getElementById('projectsGrid');
        if (grid) {
            grid.innerHTML = '';
            projectsData.forEach((p, index) => {
                const card = document.createElement('div');
                card.className = 'project-card';
                
                // techStack could be a comma separated string from DB
                const techArray = p.techStack ? p.techStack.split(',').map(t => t.trim()) : [];
                const techs = techArray.slice(0, 4).map(t => `<span>${t}</span>`).join('');
                const extra = techArray.length > 4 ? `<span>+${techArray.length - 4}</span>` : '';
                
                // Add a dummy desc if not in DB yet (or we should add desc to DB schema later, for now we will use a placeholder if empty)
                const desc = p.desc || 'Project details and description will be displayed here.';

                card.innerHTML = `
                    <span class="project-tag">${p.tag}</span>
                    <h3>${p.title}</h3>
                    <p>${desc.substring(0, 100)}${desc.length > 100 ? '...' : ''}</p>
                    <div class="project-tech">${techs}${extra}</div>
                    <span class="click-hint"><i class="fas fa-expand"></i> Details</span>
                `;
                card.addEventListener('click', () => openModal(index));
                grid.appendChild(card);
            });
        }
    }

    // ===== MODAL LOGIC =====
    const modal = document.getElementById('projectModal');
    const closeBtn = document.getElementById('modalClose');
    
    if(modal && closeBtn) {
        window.openModal = function(index) {
            const p = projectsData[index];
            const techArray = p.techStack ? p.techStack.split(',').map(t => t.trim()) : [];
            const desc = p.desc || 'Project details and description will be displayed here.';

            document.getElementById('modalTag').textContent = p.tag;
            document.getElementById('modalTitle').textContent = p.title;
            document.getElementById('modalDesc').textContent = desc;
            document.getElementById('modalTech').innerHTML = techArray.map(t => `<span>${t}</span>`).join('');
            document.getElementById('modalLive').href = p.link || '#';
            document.getElementById('modalCode').href = '#';
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if(e.target === modal) closeModal();
        });

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ===== SCROLL REVEAL ANIMATIONS =====
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            distance: '50px',
            duration: 1000,
            delay: 150,
            reset: false
        });

        sr.reveal('.section-header h2', { origin: 'top' });
        sr.reveal('.section-header .section-line', { origin: 'bottom', delay: 200 });
        
        sr.reveal('.home .content', { origin: 'left' });
        sr.reveal('.home .image', { origin: 'right', delay: 300 });
        
        sr.reveal('.about .image', { origin: 'left' });
        sr.reveal('.about .content', { origin: 'right' });
        
        sr.reveal('.skill-bar', { origin: 'bottom', interval: 100 });
        
        sr.reveal('.edu-box', { origin: 'bottom', interval: 200 });
        sr.reveal('.project-card', { origin: 'bottom', interval: 200 });
        
        sr.reveal('.timeline-item', { origin: 'left', interval: 200 });
        
        sr.reveal('.contact-info', { origin: 'left' });
        sr.reveal('.contact-form', { origin: 'right' });
    }
});

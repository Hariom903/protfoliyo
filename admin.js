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

    // ===== SIDEBAR TOGGLE (MOBILE) =====
    const menuToggle = document.getElementById('menu-toggle');
    const closeSidebar = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
        });
    }

    if (closeSidebar && sidebar) {
        closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }

    // ===== NAVIGATION LOGIC =====
    const navLinks = document.querySelectorAll('.nav-links a[data-target]');
    const adminSections = document.querySelectorAll('.admin-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');

            // Hide all sections
            adminSections.forEach(section => section.classList.remove('active'));
            
            // Show target section
            const targetId = link.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if(targetSection) {
                targetSection.classList.add('active');
            }

            // Close sidebar on mobile after clicking
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('active');
            }
        });
    });

    // ===== BACKEND API INTEGRATION =====
    const API_BASE = 'http://localhost:3000/api';

    // Fetch Messages
    async function loadMessages() {
        try {
            const res = await fetch(`${API_BASE}/messages`);
            const messages = await res.json();
            
            const tbody = document.querySelector('#dashboard .dashboard-tables tbody');
            const messagesSection = document.querySelector('#messages .panel');
            
            if (messages.length === 0) {
                if(messagesSection) messagesSection.innerHTML = '<p style="padding: 3rem; text-align: center; color: var(--text-muted);">Inbox is empty.</p>';
                if(tbody) tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No new messages</td></tr>';
            } else {
                // Populate Dashboard Table (Preview)
                if(tbody) {
                    tbody.innerHTML = messages.slice(0, 5).map(msg => `
                        <tr>
                            <td>${msg.name}</td>
                            <td>${msg.email}</td>
                            <td>${new Date(msg.created_at).toLocaleDateString()}</td>
                            <td><span class="badge ${msg.status === 'new' ? 'badge-new' : 'badge-read'}">${msg.status}</span></td>
                            <td><button class="btn-icon text-danger" onclick="deleteItem('messages', ${msg.id})"><i class="fas fa-trash"></i></button></td>
                        </tr>
                    `).join('');
                }

                // Populate Messages Section
                if(messagesSection) {
                    messagesSection.innerHTML = `
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr><th>Name</th><th>Email</th><th>Phone</th><th>Message</th><th>Date</th><th>Action</th></tr>
                                </thead>
                                <tbody>
                                    ${messages.map(msg => `
                                        <tr>
                                            <td>${msg.name}</td>
                                            <td>${msg.email}</td>
                                            <td>${msg.phone || '-'}</td>
                                            <td>${msg.message.substring(0, 50)}...</td>
                                            <td>${new Date(msg.created_at).toLocaleDateString()}</td>
                                            <td><button class="btn-icon text-danger" onclick="deleteItem('messages', ${msg.id})"><i class="fas fa-trash"></i></button></td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    `;
                }
            }
            
            // Update Dashboard Stat
            const messageStat = document.querySelectorAll('.stat-info h3')[2];
            if(messageStat) messageStat.textContent = messages.length;

        } catch (error) {
            console.error('Error loading messages:', error);
        }
    }

    // Fetch Projects
    async function loadProjects() {
        try {
            const res = await fetch(`${API_BASE}/projects`);
            const projects = await res.json();
            
            const tbody = document.querySelector('#projects tbody');
            if (projects.length === 0) {
                if(tbody) tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No projects found</td></tr>';
            } else {
                if(tbody) tbody.innerHTML = projects.map(p => `
                    <tr>
                        <td>${p.title}</td>
                        <td><span class="tag">${p.tag}</span></td>
                        <td>${p.techStack}</td>
                        <td>
                            <button class="btn-icon text-danger" onclick="deleteItem('projects', ${p.id})"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `).join('');
            }

            // Update Dashboard Stat
            const projectStat = document.querySelectorAll('.stat-info h3')[1];
            if(projectStat) projectStat.textContent = projects.length;

        } catch (error) {
            console.error('Error loading projects:', error);
        }
    }

    // Fetch Skills
    async function loadSkills() {
        try {
            const res = await fetch(`${API_BASE}/skills`);
            const skills = await res.json();
            
            const grid = document.querySelector('.skills-admin-grid');
            if (grid) {
                if (skills.length === 0) {
                    grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">No skills found</p>';
                } else {
                    grid.innerHTML = skills.map(s => `
                        <div class="skill-edit-card">
                            <img src="${s.icon}" alt="${s.name}" />
                            <h4>${s.name}</h4>
                            <div class="actions">
                                <button class="btn-icon text-danger" onclick="deleteItem('skills', ${s.id})"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    `).join('');
                }
            }
        } catch (error) {
            console.error('Error loading skills:', error);
        }
    }

    // ===== CRUD ACTIONS =====

    // Generic Delete
    window.deleteItem = async function(type, id) {
        if (!confirm(`Are you sure you want to delete this ${type.slice(0,-1)}?`)) return;
        try {
            const res = await fetch(`${API_BASE}/${type}/${id}`, { method: 'DELETE' });
            if (res.ok) {
                if(type === 'projects') loadProjects();
                if(type === 'skills') loadSkills();
                if(type === 'messages') loadMessages();
            } else {
                alert('Failed to delete item.');
            }
        } catch (error) {
            console.error(`Error deleting ${type}:`, error);
        }
    };

    // Add Project Form Submit
    const addProjectForm = document.getElementById('add-project-form');
    if (addProjectForm) {
        addProjectForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = addProjectForm.querySelector('button');
            btn.disabled = true;
            btn.innerHTML = 'Saving...';
            
            const formData = {
                title: addProjectForm.title.value,
                tag: addProjectForm.tag.value,
                techStack: addProjectForm.techStack.value,
                link: addProjectForm.link.value
            };
            
            try {
                const res = await fetch(`${API_BASE}/projects`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                if(res.ok) {
                    addProjectForm.reset();
                    loadProjects();
                } else {
                    alert('Failed to add project');
                }
            } catch (err) {
                console.error(err);
            } finally {
                btn.disabled = false;
                btn.innerHTML = 'Save Project';
            }
        });
    }

    // Add Skill Form Submit
    const addSkillForm = document.getElementById('add-skill-form');
    if (addSkillForm) {
        addSkillForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = addSkillForm.querySelector('button');
            btn.disabled = true;
            btn.innerHTML = 'Saving...';
            
            const formData = {
                name: addSkillForm.name.value,
                icon: addSkillForm.icon.value
            };
            
            try {
                const res = await fetch(`${API_BASE}/skills`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                if(res.ok) {
                    addSkillForm.reset();
                    loadSkills();
                } else {
                    alert('Failed to add skill');
                }
            } catch (err) {
                console.error(err);
            } finally {
                btn.disabled = false;
                btn.innerHTML = 'Add';
            }
        });
    }

    // Load initial data
    loadMessages();
    loadProjects();
    loadSkills();
});

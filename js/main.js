function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const toggleBtn = document.querySelector('.sidebar-toggle');
    
    if (sidebar && mainContent) {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
        
        if (toggleBtn) {
            if (sidebar.classList.contains('collapsed')) {
                if (window.innerWidth > 1400) {
                    toggleBtn.style.left = '104px';
                } else {
                    toggleBtn.style.left = '84px';
                }
            } else {
                if (window.innerWidth > 1400) {
                    toggleBtn.style.left = '364px';
                } else {
                    toggleBtn.style.left = '344px';
                }
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });
    }
    
    if (sidebar && !document.querySelector('.sidebar-toggle')) {
        const toggleBtn = document.createElement('div');
        toggleBtn.className = 'sidebar-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        toggleBtn.addEventListener('click', toggleSidebar);
        document.body.appendChild(toggleBtn);
    }
    
    document.addEventListener('click', function(event) {
        if (sidebar && window.innerWidth <= 968) {
            const mobileToggle = document.querySelector('.mobile-toggle');
            if (!sidebar.contains(event.target) && !mobileToggle.contains(event.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 968 && sidebar) {
                sidebar.classList.remove('active');
            }
        });
    });
});

window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.querySelector('.sidebar-toggle');
    
    if (window.innerWidth > 968 && sidebar) {
        sidebar.classList.remove('active');
    }
    
    if (toggleBtn) {
        if (sidebar && sidebar.classList.contains('collapsed')) {
            if (window.innerWidth > 1400) {
                toggleBtn.style.left = '104px';
            } else {
                toggleBtn.style.left = '84px';
            }
        } else {
            if (window.innerWidth > 1400) {
                toggleBtn.style.left = '364px';
            } else {
                toggleBtn.style.left = '344px';
            }
        }
    }
});
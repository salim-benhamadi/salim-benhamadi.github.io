function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth <= 968) {
        sidebar.classList.toggle('active');
    } else {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
    }
}

document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.querySelector('.mobile-toggle');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    
    if (window.innerWidth <= 968) {
        if (sidebar && toggle && !sidebar.contains(event.target) && !toggle.contains(event.target) && !sidebarToggle.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    }
});

window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth > 968 && sidebar) {
        sidebar.classList.remove('active');
    }
});

// Initialize sidebar toggle button
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        // Create toggle button if it doesn't exist
        if (!document.querySelector('.sidebar-toggle')) {
            const toggleBtn = document.createElement('div');
            toggleBtn.className = 'sidebar-toggle';
            toggleBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
            toggleBtn.addEventListener('click', toggleSidebar);
            sidebar.appendChild(toggleBtn);
        }
    }
});
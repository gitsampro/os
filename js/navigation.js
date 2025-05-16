// Navigation Module
export const navigation = {
    // Initialize navigation
    init: () => {
        const toggleButton = document.getElementById('nav-toggle');
        const navLinks = document.getElementById('nav-links');
        const topBanner = document.querySelector('.top-banner');
        const nav = document.querySelector('nav');

        // Handle banner visibility
        if (topBanner) {
            navigation.handleBannerVisibility(nav, topBanner);
        }

        // Handle mobile menu
        if (toggleButton && navLinks) {
            navigation.handleMobileMenu(toggleButton, navLinks);
        }

        // Handle scroll behavior
        window.addEventListener('scroll', () => {
            navigation.handleScroll(nav, navLinks);
        });
    },

    // Handle banner visibility
    handleBannerVisibility: (nav, topBanner) => {
        nav.classList.add('nav-with-banner');
        
        setTimeout(() => {
            topBanner.style.transform = 'translateY(-100%)';
            nav.classList.remove('nav-with-banner');
            
            setTimeout(() => {
                topBanner.style.display = 'none';
            }, 500);
        }, 5000);
    },

    // Handle mobile menu
    handleMobileMenu: (toggleButton, navLinks) => {
        toggleButton.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !toggleButton.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    },

    // Handle scroll behavior
    handleScroll: (nav, navLinks) => {
        let lastScroll = 0;
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.style.transform = 'translateY(0)';
            return;
        }
        
        if (currentScroll > lastScroll && !navLinks.classList.contains('active')) {
            // Scrolling down & menu is closed
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    }
}; 
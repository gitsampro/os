// Dark Mode Module
export const darkMode = {
    // Initialize dark mode
    init: () => {
        const darkModeToggle = document.getElementById('darkModeToggle');
        const icon = document.getElementById('darkModeIcon');
        const isDarkMode = localStorage.getItem('darkMode') === 'true';

        if (isDarkMode) {
            darkMode.applyDarkMode();
        }

        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', darkMode.toggleDarkMode);
        }
    },

    // Toggle dark mode
    toggleDarkMode: () => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        localStorage.setItem('darkMode', !isDarkMode);
        
        if (!isDarkMode) {
            darkMode.applyDarkMode();
        } else {
            darkMode.applyLightMode();
        }
    },

    // Apply dark mode styles
    applyDarkMode: () => {
        const root = document.documentElement;
        const icon = document.getElementById('darkModeIcon');
        const image = document.getElementById('mainlogo');
        const bigimage = document.getElementById('biglogo');

        root.style.setProperty('--primary-text-color', '#d3e0ea');
        root.style.setProperty('--secondary-text-color', '#b0b8c1');
        root.style.setProperty('--accent-color', '#66ffcc');
        root.style.setProperty('--accent-color-dark', '#33bbee');
        root.style.setProperty('--nav-bg-color', 'rgba(17, 17, 27, 0.95)');
        root.style.setProperty('--nav-text-color', '#d9bfff');
        root.style.setProperty('--nav-hover-color', '#e0c2ff');
        root.style.setProperty('--all-white', '#000000');
        root.style.setProperty('--all-black', '#ffffff');
        root.style.setProperty('--popup-bg-color', '#1c86efd5');

        if (image) image.src = './assets/asset 11.png';
        if (bigimage) bigimage.src = './assets/asset 11.png';
        document.body.style.backgroundImage = "url('./assets/darkbackground1.png')";
        
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    },

    // Apply light mode styles
    applyLightMode: () => {
        const root = document.documentElement;
        const icon = document.getElementById('darkModeIcon');
        const image = document.getElementById('mainlogo');
        const bigimage = document.getElementById('biglogo');

        root.style.setProperty('--primary-text-color', '#183b56');
        root.style.setProperty('--secondary-text-color', '#2f3030');
        root.style.setProperty('--accent-color', '#10A37F');
        root.style.setProperty('--accent-color-dark', '#0673b7');
        root.style.setProperty('--nav-bg-color', 'rgba(24, 24, 37, 0.8)');
        root.style.setProperty('--nav-text-color', 'rgb(55, 0, 122)');
        root.style.setProperty('--nav-hover-color', '#a78bfa');
        root.style.setProperty('--all-white', '#ffffff');
        root.style.setProperty('--all-black', '#000000');
        root.style.setProperty('--popup-bg-color', '#ffffff');

        if (image) image.src = './assets/asset 1.png';
        if (bigimage) bigimage.src = './assets/asset 1.png';
        document.body.style.backgroundImage = "url('./assets/background.png')";
        
        if (icon) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}; 
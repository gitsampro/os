// Auth Module
export const auth = {
    // Check if user is logged in
    isLoggedIn: () => {
        return localStorage.getItem('user') !== null;
    },

    // Get current user
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Update user display
    updateUserDisplay: () => {
        const user = auth.getCurrentUser();
        const userEmail = document.getElementById('userEmail');
        const signInUpBtn = document.getElementById('signInUpBtn');
        const userMenu = document.querySelector('.user-menu');

        if (user) {
            userEmail.textContent = user.email;
            userMenu.style.display = 'block';
            signInUpBtn.style.display = 'none';
        } else {
            userMenu.style.display = 'none';
            signInUpBtn.style.display = 'block';
        }
    },

    // Handle logout
    handleLogout: async () => {
        try {
            await firebase.auth().signOut();
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Logout error:', error);
            // Add toast notification here
        }
    }
}; 
// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA8a65KdnY4FzeX_UAC0tapvlE7pwQWWq0",
    authDomain: "forum-359a6.firebaseapp.com",
    projectId: "forum-359a6",
    storageBucket: "forum-359a6.firebasestorage.app",
    messagingSenderId: "558570896770",
    appId: "1:558570896770:web:7b5a2e6b4fc96a0891639b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to update navigation based on auth state
function updateNavigation() {
    const signInBtn = document.querySelector('.secondary-button');
    const userMenu = document.querySelector('.user-menu');
    const userEmail = document.getElementById('userEmail');
    const userPopup = document.getElementById('userPopup');
    const logoutBtn = document.getElementById('logoutBtn');

    const loggedInUserId = localStorage.getItem('loggedInUserId');
    
    if (loggedInUserId) {
        // User is logged in
        if (signInBtn) signInBtn.style.display = 'none';
        if (userMenu) {
            userMenu.style.display = 'block';
            // Get user data from Firestore
            const docRef = doc(db, "users", loggedInUserId);
            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        if (userEmail) userEmail.innerHTML = `<span id="loggedUserEmail">${userData.email}</span>`;
                        if (document.getElementById('popupFName')) document.getElementById('popupFName').innerText = userData.firstName;
                        if (document.getElementById('popupLName')) document.getElementById('popupLName').innerText = userData.lastName;
                        if (document.getElementById('popupEmail')) document.getElementById('popupEmail').innerText = userData.email;
                    }
                })
                .catch((error) => {
                    console.error("Error getting user data:", error);
                });
        }
    } else {
        // User is not logged in
        if (signInBtn) signInBtn.style.display = 'block';
        if (userMenu) userMenu.style.display = 'none';
    }

    // Add click event for user email to show popup
    if (userEmail) {
        userEmail.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (userPopup) {
                userPopup.style.display = userPopup.style.display === 'block' ? 'none' : 'block';
            }
        });
    }

    // Close popup when clicking outside
    document.addEventListener('click', (e) => {
        if (userEmail && userPopup && !userEmail.contains(e.target) && !userPopup.contains(e.target)) {
            userPopup.style.display = 'none';
        }
    });

    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            signOut(auth)
                .then(() => {
                    localStorage.removeItem('loggedInUserId');
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    console.error('Error signing out:', error);
                });
        });
    }
}

// Check authentication state
onAuthStateChanged(auth, (user) => {
    updateNavigation();
});

// Export functions if needed
export { updateNavigation }; 
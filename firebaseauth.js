// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

function showMessage(message, divId){
   var messageDiv=document.getElementById(divId);
   messageDiv.style.display="block";
   messageDiv.innerHTML=message;
   messageDiv.style.opacity=1;
   setTimeout(function(){
       messageDiv.style.opacity=0;
   },5000);
}

// Store the original page URL when redirecting to signup
if (window.location.pathname.includes('signup.html')) {
    const originalPage = sessionStorage.getItem('originalPage');
    if (!originalPage) {
        sessionStorage.setItem('originalPage', document.referrer);
    }
}

// Sign In handler
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        // Show loading state
        const signInBtn = document.getElementById('submitSignIn');
        const originalText = signInBtn.innerHTML;
        signInBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
        signInBtn.disabled = true;

        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Get user data from Firestore
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            localStorage.setItem('loggedInUserId', user.uid);
            localStorage.setItem('userEmail', userData.email);
            localStorage.setItem('userFirstName', userData.firstName);
            localStorage.setItem('userLastName', userData.lastName);
            
            // Show success message
            showToast('Successfully signed in!', 'success');
            
            // Redirect to original page or homepage
            const originalPage = sessionStorage.getItem('originalPage');
            if (originalPage) {
                sessionStorage.removeItem('originalPage');
                window.location.href = originalPage;
            } else {
                window.location.href = 'index.html';
            }
        }
    } catch (error) {
        // Handle specific error cases
        let errorMessage = 'An error occurred during sign in.';
        switch (error.code) {
            case 'auth/invalid-email':
                errorMessage = 'Please enter a valid email address.';
                break;
            case 'auth/user-not-found':
                errorMessage = 'No account found with this email.';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password.';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Too many failed attempts. Please try again later.';
                break;
            case 'auth/network-request-failed':
                errorMessage = 'Network error. Please check your connection.';
                break;
        }
        showToast(errorMessage, 'error');
    } finally {
        // Reset button state
        const signInBtn = document.getElementById('submitSignIn');
        signInBtn.innerHTML = originalText;
        signInBtn.disabled = false;
    }
});

// Sign Up handler
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;
    
    try {
        // Show loading state
        const signUpBtn = document.getElementById('submitSignUp');
        const originalText = signUpBtn.innerHTML;
        signUpBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
        signUpBtn.disabled = true;

        // Validate input
        if (!email || !password || !firstName || !lastName) {
            throw new Error('Please fill in all fields.');
        }

        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long.');
        }

        const auth = getAuth();
        const db = getFirestore();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Store user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: email,
            firstName: firstName,
            lastName: lastName,
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp()
        });
        
        localStorage.setItem('loggedInUserId', user.uid);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userFirstName', firstName);
        localStorage.setItem('userLastName', lastName);
        
        // Show success message
        showToast('Account created successfully!', 'success');
        
        // Redirect to homepage
        window.location.href = 'index.html';
    } catch (error) {
        // Handle specific error cases
        let errorMessage = 'An error occurred during sign up.';
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'This email is already registered.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Please enter a valid email address.';
                break;
            case 'auth/weak-password':
                errorMessage = 'Password is too weak.';
                break;
            case 'auth/network-request-failed':
                errorMessage = 'Network error. Please check your connection.';
                break;
        }
        showToast(errorMessage, 'error');
    } finally {
        // Reset button state
        const signUpBtn = document.getElementById('submitSignUp');
        signUpBtn.innerHTML = originalText;
        signUpBtn.disabled = false;
    }
});

// Toast notification function
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Add animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}
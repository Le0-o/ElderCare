
<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>{{ isRegistering ? 'Register' : 'Login' }} to ElderCare</h2>
      <form @submit.prevent="submitForm">
        <div class="input-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="formData.username"
            @blur="validateName"
            @input="validateName"
          />
          <div v-if="errors.username" class="error-text">{{ errors.username }}</div>
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            @blur="validatePassword"
            @input="validatePassword"
          />
          <div v-if="errors.password" class="error-text">{{ errors.password }}</div>
        </div>

        <button type="submit" class="btn btn-primary">{{ isRegistering ? 'Register' : 'Login' }}</button>
        <button type="button" class="btn btn-secondary" @click="toggleMode">
          {{ isRegistering ? 'Switch to Login' : 'Switch to Register' }}
        </button>
        <button type="button" class="btn btn-danger" @click="clearUsers">Clear Users</button>
      </form>

      <!-- Google Login Button -->
      <button type="button" class="btn btn-google" @click="loginWithGoogle">
        <img src="/google-logo.png" alt="Google Logo" /> Sign in with Google
      </button>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '../router/index';
import { useAuth } from '../router/authenticate';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const { isAuthenticated } = useAuth();
const isRegistering = ref(false);

const formData = ref({
  username: '',
  password: '',
});

const errors = ref({
  username: null,
  password: null,
});

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();


const toggleMode = () => {
  isRegistering.value = !isRegistering.value;
  clearForm();
};

// Define a sanitizeInput function to remove potentially dangerous characters from user input
function sanitizeInput(input) {
  return input.replace(/[<>\/'";:()]/g, ''); // Replace special characters with an empty string
}

// google
const loginWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      alert(`Welcome, ${user.displayName}! You have successfully logged in with Google.`);
      isAuthenticated.value = true;
      useAuth().login('user'); // Assume all users are regular users
      router.push({ name: 'About' });
    })
    .catch((error) => {
      alert('Google sign-in failed: ' + error.message);
    });
};

const submitForm = () => {
  // Preserve the original input for duplicate checking
  const originalUsername = formData.value.username.trim();
  
  // Sanitize inputs before processing to avoid unwanted characters
  formData.value.username = sanitizeInput(formData.value.username);
  formData.value.password = sanitizeInput(formData.value.password);

  // Validate the username and password inputs
  validateName(true);
  validatePassword(true);

  // Proceed only if there are no validation errors
  if (!errors.value.username && !errors.value.password) {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check for admin login first
    if (formData.value.username === 'admin@123.com' && formData.value.password === 'Lcd123456!') {
      // Admin login successful
      alert('Welcome Admin!');
      isAuthenticated.value = true;
      useAuth().login('admin'); // Assign 'admin' role to this session
      router.push({ name: 'Admin' });  // Redirect to the Admin page
      return;  // Exit the function to avoid checking regular users
    }

    // Check for regular users in local storage
    const user = existingUsers.find(
      user => user.username === formData.value.username && user.password === formData.value.password
    );

    if (user) {
      // Regular user login successful
      alert(`Welcome, ${user.username}! You have successfully logged in.`);
      isAuthenticated.value = true;
      useAuth().login('user'); // Assign 'user' role to this session
      router.push({ name: 'About' });  // Redirect to the main About page
    } else {
      // Invalid credentials, show an error message
      alert('Invalid username or password. Please try again.');
    }
  }
};



const clearUsers = () => {
  localStorage.removeItem('users');
  alert('All user data has been cleared!');
};

// Validation functions
const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters';
  } else {
    errors.value.username = null;
  }
};

const validatePassword = (blur) => {
  if (formData.value.password.length < 6) {
    if (blur) errors.value.password = 'Password must be at least 6 characters length.';
  } else {
    errors.value.password = null;
  }
};

const clearForm = () => {
  formData.value.username = '';
  formData.value.password = '';
};
</script>

<style scoped>

.auth-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e0f7fa 0%, #e0f2f1 100%);
}

.auth-card {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.input-group input {
  width: calc(100% - 20px);
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
}

.error-text {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.btn-primary,
.btn-secondary,
.btn-danger {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
  transition: background-color 0.3s;
}

.btn-secondary {
  background-color: #2196F3;
  color: white;
  transition: background-color 0.3s;
}

.btn-danger {
  background-color: #f44336;
  color: white;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #45a049;
}

.btn-secondary:hover {
  background-color: #1976D2;
}

.btn-danger:hover {
  background-color: #d32f2f;
}

/* Google Login Button Styles */
.btn-google {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4285F4;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
}

.btn-google img {
  margin-right: 10px;
  width: 20px;
  height: 20px;
}

.btn-google:hover {
  background-color: #357ae8;
}
</style>
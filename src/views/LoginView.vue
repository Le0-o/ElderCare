
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
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import router from '../router/index';
  import { useAuth } from '../router/authenticate';
  
  const { isAuthenticated } = useAuth();
  const isRegistering = ref(false); // Toggle between login and register mode
  
  const formData = ref({
    username: '',
    password: '',
  });
  
  const errors = ref({
    username: null,
    password: null,
  });
  
  // Toggle between login and register mode
  const toggleMode = () => {
    isRegistering.value = !isRegistering.value;
    clearForm();
  };
  
  // Sanitize user input to prevent XSS attacks
  const sanitizeInput = (input) => {
    const div = document.createElement('div');
    div.innerText = input;
    return div.innerHTML;
  };
  
  // Submit form and handle login or registration
  const submitForm = () => {
    // Sanitize inputs before processing
    formData.value.username = sanitizeInput(formData.value.username);
    formData.value.password = sanitizeInput(formData.value.password);
  
    validateName(true);
    validatePassword(true);
  
    if (!errors.value.username && !errors.value.password) {
      if (isRegistering.value) {
        // Register new user
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = existingUsers.some(user => user.username === formData.value.username);
  
        if (userExists) {
          alert('User already exists! Please try a different username.');
          return;
        }
  
        existingUsers.push({ username: formData.value.username, password: formData.value.password });
        localStorage.setItem('users', JSON.stringify(existingUsers));
        alert('Registration successful! Please login.');
        toggleMode(); // Switch to login mode
      } else {
        // Login existing user
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const user = existingUsers.find(
          user => user.username === formData.value.username && user.password === formData.value.password
        );
  
        if (user) {
          alert(`Welcome, ${user.username}! You have successfully logged in.`);
          isAuthenticated.value = true;
          useAuth().login('user'); // Assume all registered users are regular users
          router.push({ name: 'About' });
        } else {
          alert('Invalid username or password. Please try again.');
        }
      }
    }
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
      if (blur) errors.value.password = `Password must be at least 6 characters length.`;
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
  .btn-secondary {
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
  
  .btn-primary:hover {
    background-color: #45a049;
  }
  
  .btn-secondary:hover {
    background-color: #1976D2;
  }
  </style>
  
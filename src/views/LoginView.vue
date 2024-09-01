<template>
    
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h1 class="text-center">🗄️ Dear User Please login</h1>
          <form @submit.prevent="submitForm" >
            <div class="row mb-3 offset-md-3">
              <div class="col-md-6 col-sm-6">
                <label for="username" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  @blur="() => validateName(true)"
                  @input="() => validateName(true)"
                  v-model="formData.username"
                />
                
                <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
              
              </div>
            </div>
            <div class="row mb-3 offset-md-3">
              <div class="col-md-6 col-sm-6">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  @blur="() => validatePassword(true)"
                  @input="() => validatePassword(true)"
                  v-model="formData.password"
                />
                <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
              </div>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary me-2">Submit</button>
              <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  
    
  </template>
  <script setup>
  import { ref } from 'vue'
  import router from '../router/index'
  import {useAuth} from '../router/authenticate'
  
  const hardCodeUserName = 'user'
  const hardCodePassword = '123456'
  const adminUserName = 'admin'; 
  const adminPassword = '1234567'; 
  const {isAuthenticated} = useAuth()
   
  const formData = ref({
    username: '',
    password: '',
  })
  

  
  // const submitForm = () => {
  //   validateName(true)
  //   validatePassword(true)
  //   if (!errors.value.username && !errors.value.password && formData.value.username === hardCodeUserName && formData.value.password === hardCodepassword){
  //       alert("Grats! login success")
  //       isAuthenticated.value = true
  //       console.log("logininview",isAuthenticated.value)
  //       router.push({name:'About'})}
  //   }
// login.vue
const submitForm = () => {
  validateName(true);
  validatePassword(true);

  // Check the login credentials of the user or administrator
  if (!errors.value.username && !errors.value.password) {
    if (
      (formData.value.username === hardCodeUserName && formData.value.password === hardCodePassword) ||
      (formData.value.username === adminUserName && formData.value.password === adminPassword)
    ) {
      // Determine the role based on the user name
      const userRole = formData.value.username === adminUserName ? 'admin' : 'user';
      
      // The login success message for the administrator or common user is displayed
      if (userRole === 'admin') {
        alert("Welcome, Admin! You have successfully logged in.");
      } else {
        alert("Grats! login success");
      }

      isAuthenticated.value = true;
      useAuth().login(userRole); // Set the user role during login
      console.log("logininview", isAuthenticated.value);
      router.push({ name: 'About' });
    }
  }
};


  
  const errors = ref({
    username: null,
    password: null,  
  })
  
  const validateName = (blur) => {
    if (formData.value.username.length < 3) {
      if (blur) errors.value.username = 'Name must be at least 3 characters'
    } else {
      errors.value.username = null
    }
  }
  
  const validatePassword = (blur) => {
    
    if (formData.value.password.length < 6) {
      if (blur) errors.value.password = `Password must be at least 6 characters length.`
    } else {
      errors.value.password = null
    }
  }
  
  </script>
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
  import router from '../router'
  
  const hardCodeUserName = 'user'
  const hardCodepassword = '123456'
   
  const formData = ref({
    username: '',
    password: '',
  })
  

  
  const submitForm = () => {
    validateName(true)
    validatePassword(true)
    if (!errors.value.username && !errors.value.password && formData.value.username === hardCodeUserName && formData.value.password === hardCodepassword){
        alert("Grats! login success")
        router.push({name:'About'})}
    }
  

  
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
// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from './firebase/init';
// import { initializeApp } from 'firebase/app';
// Initialize Firebase and Auth
// const firebaseApp = initializeApp();  // Initialize Firebase app
const auth = getAuth(firebaseApp);  // Initialize Firebase authentication
const googleProvider = new GoogleAuthProvider();  // Initialize Google login provider

// Initialize Vue app
const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

// Mount Vue app
app.mount('#app')

// Export auth and googleProvider for use in other parts of the app
export { auth, googleProvider };

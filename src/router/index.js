// import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import AboutView from '../views/AboutView.vue'
// import LoginView from '../views/LoginView.vue'
// import RatingView from '../views/RatingView.vue'; // Import the new rating page
// import {useAuth} from './authenticate'
// const {isAuthenticated} = useAuth()
// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: HomeView
//   }, 
//   {
//     path: '/about',
//     name: 'About',
//     component: AboutView
//   },
//   {
//     path: '/login',
//     name: 'Login',
//     component: LoginView
//   },
//   {
//     path: '/rate',
//     name: 'Rate',
//     component: RatingView, // Add the new rating route
//   },
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })


// router.beforeEach((to, from, next) => {
//   const { isAuthenticated, userRole } = useAuth();
//   if (to.name === 'About' ) {
//     if (isAuthenticated.value && (userRole.value === 'admin' || userRole.value === 'user')) {
//       next();
//     } else {
//       next({ name: 'Login' });
//     }
//   } else {
//     next();
//   }
// });

// export default router
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LoginView from '../views/LoginView.vue';
import RatingView from '../views/RatingView.vue'; // Import the new rating page
import { useAuth } from './authenticate';

const { isAuthenticated } = useAuth();

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/rate',
    name: 'Rate',
    component: RatingView, // Add the new rating route
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add route guard to check authentication before navigating
router.beforeEach((to, from, next) => {
  const { isAuthenticated, userRole } = useAuth();

  // Restrict access to the 'About' page to authenticated users
  if (to.name === 'About') {
    if (isAuthenticated.value && (userRole.value === 'admin' || userRole.value === 'user')) {
      next();
    } else {
      next({ name: 'Login' });
    }
  } 
  // Restrict access to the 'Rate' page to authenticated users
  else if (to.name === 'Rate') {
    if (isAuthenticated.value) {
      next();
    } else {
      next({ name: 'Login' });
    }
  } 
  else {
    next();
  }
});

export default router;

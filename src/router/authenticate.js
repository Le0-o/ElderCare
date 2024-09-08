
import { ref } from 'vue';
import router from '../router';

const isAuthenticated = ref(false);
const userRole = ref(null); // add user

export function useAuth() {
  const login = (role) => {
    isAuthenticated.value = true;
    userRole.value = role; // set user
  };

  const logout = () => {
    isAuthenticated.value = false;
    userRole.value = null; // clear user
  };

  return { isAuthenticated, login, logout, userRole };
}

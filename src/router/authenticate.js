// import {ref} from 'vue'
// import router from'../router'

// const isAuthenticated = ref(false)
// export function useAuth() {
    
//     const login = ()=>{
//         isAuthenticated.value = true;
//         // router.push({name:'About'})
//     }

//     const logout = ()=>{
//         isAuthenticated.value = false;
        
//     }
//     return{isAuthenticated,login,logout}
// }
// authenticate.js
import { ref } from 'vue';
import router from '../router';

const isAuthenticated = ref(false);
const userRole = ref(null); // 添加用户角色变量

export function useAuth() {
  const login = (role) => {
    isAuthenticated.value = true;
    userRole.value = role; // 设置用户角色
  };

  const logout = () => {
    isAuthenticated.value = false;
    userRole.value = null; // 清除用户角色
  };

  return { isAuthenticated, login, logout, userRole };
}

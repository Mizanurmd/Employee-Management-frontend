import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import EmployeeDetails from '@/views/employee/employeeDetails.vue'
import EditEmployeeModal from '@/views/modal/EditEmployeeModal.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/employeeDetails',
      name: 'employeeDetails',
      component: EmployeeDetails,
    },
    {
      path: '/editEmployeeModal',
      name: 'editEmployeeModal',
      component: EditEmployeeModal,
    },
  ],
})

export default router
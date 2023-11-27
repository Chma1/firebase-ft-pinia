import { createWebHistory, createRouter } from "vue-router";
import Login from '../Views/Login.vue'
import Register from '../Views/RegisterView.vue'
import Home from '../Views/Home.vue'
import ErrorViews from '../Views/ErrorViews.vue'
import EditComponents from'../components/EditDocuments.vue'
import { useUserStore } from "../store/userStore.js"

// se coloca antes (ruta protegida)
const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loadingUser = true
  const user = await userStore.currentsUser()
  if (user) {
    next();
  } else {
    next("/login");
  }
  setTimeout(() => {
    userStore.loadingUser = false
  }, 500);

}

const routes = [
  { path: "/", name: "home", component: Home, beforeEnter: requireAuth },
  { path: "/edit/:id", name: "edit", component: EditComponents, beforeEnter: requireAuth },
  { path: "/login", name: "login", component: Login },
  { path: "/register", name: "register", component: Register },
  { path: "/:AllCatch(.*)", name: "error", component: ErrorViews },
];

const router = createRouter({
  routes,
  linkActiveClass: 'active',
  history: createWebHistory(),
});

export default router;

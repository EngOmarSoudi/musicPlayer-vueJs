import { createRouter, createWebHistory } from "vue-router";

import useUserStore from "@/stores/user";


const Home = () => import("@/views/Home.vue");
const About = () => import( "@/views/About.vue" );
const Manage = () => import( "@/views/Manage.vue" );
const Song = () => import( "@/views/Song.vue" );

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "about",
    path: "/about",
    component: About,
  },
  {
    name: "manage",
    // alias:'/manage',
    path: "/manage-music",
    component: Manage,
    beforeEnter:((to, from, next) => {
      // console.log("Manage Global Guard");
      next();
    } ),
    meta: {
      requiresAuth:true,
    },
  },
  {
    path: "/manage",
    redirect: { name: "manage" },
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "home" },
  },
  {
    name: "song",
    path: '/song/:id',
    component: Song,
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-green-500 border-b-4 border-green-500",
});
router.beforeEach((to, from, next) => {
  // console.log(to.meta);
  if ( !to.meta.requiresAuth )
  {
    next();
    return;
  }
  const store = useUserStore();
    if (store.userLoggedIn) {
      next();
    } else {
      next({ name: "home" });
    }
  
});
export default router;

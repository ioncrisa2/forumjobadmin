import { createRouter,createWebHistory } from "vue-router";
import store from "@/store/index.js";

const routes = [
  {
    path:'/',
    redirect:'/dashboard',
    component: () => import('@/components/DefaultLayouts.vue'),
    meta:{requiresAuth:true},
    children:[
      {path:"/dashboard",name:"dashboard",component:() => import("@/views/dashboard/index.vue")},
      {path:"/company/:id",name:"company.edit",component: () => import("@/views/company/edit.vue")},
      {path:"/job",name:"job",component:() => import("@/views/job/index.vue")},
      {path:"/job/:id",name:"job.edit",component: () => import("@/views/job/edit.vue")},
      {path:"/profile",name:"profile",component:() => import("@/views/profile/index.vue")}
    ]
  },
  { path:'/login',name:'login',component:() => import('@/views/auth/login.vue') },
  { path:'/404',name:'notfound',component:() => import('@/views/NotFound.vue') }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to,from,next) => {
    if(to.meta.requiresAuth && !store.state.auth.token) {
      next({path:'/login'});
    }else if(to.name == 'login' && store.state.auth.token){
      next({path:'/'});
    }else{
      next();
    }
});

export default router;
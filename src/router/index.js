import DefaultLayout from "@/components/layouts/DefaultLayout.vue";
import ChatRoomView from "@/views/ChatRoomView.vue";
import ChatView from "@/views/ChatView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Login",
        component: LoginView,
        meta: { guest: true },
      },
      {
        path: "/register",
        name: "Register",
        component: RegisterView,
        meta: { guest: true },
      },
      {
        path: "/chat",
        name: "Chat",
        component: ChatView,
        meta: { requiresAuth: true },
      },
      {
        path: "/chat/:room_id",
        name: "ChatRoom",
        component: ChatRoomView,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

function isAuthenticated() {
  return !!localStorage.getItem("authToken");
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({ name: "Login", query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (isAuthenticated()) {
      next({ name: "Chat" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export { router, isAuthenticated };

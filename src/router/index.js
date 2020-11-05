import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Recommended",
    component: () => import("@/views/explore/Recommended.vue")
  },
  {
    path: "/playlists",
    name: "Playlists",
    component: () => import("@/views/explore/Playlists.vue")
  },
  {
    path: "/my-collection",
    name: "MyCollection",
    component: () => import("@/views/me/MyCollection.vue")
  },
  {
    path: "/playlist/:id",
    name: "PlaylistPage",
    component: () => import("@/views/explore/PlaylistPage.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

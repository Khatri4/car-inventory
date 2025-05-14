import App from "@/App.vue";
import AddCarComp from "@/components/AddCarComp.vue";
import EditCarComp from "@/components/EditCarComp.vue";
import HomePage from "@/components/HomePage.vue";
import ShowCarComp from "@/components/ShowCarComp.vue";
import { createRouter, createWebHistory } from "vue-router";
import LandingPageComp from "@/components/LandingPageComp.vue";

let route = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: LandingPageComp },
    { path: "/home-page", component: HomePage },
    { path: "/add-car", component: AddCarComp },
    { path: "/edit-car/:id", component: EditCarComp, name: "edit-car" },
    { path: "/show-car/:id", component: ShowCarComp },
  ],
});
export default route;

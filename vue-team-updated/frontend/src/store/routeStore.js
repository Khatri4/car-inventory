
import { defineStore } from "pinia";

export const useRouteStore = defineStore("routeStore", {
  state: () => ({
    currentRoute: "", 
    params: {}, 
  }),
  actions: {
    setRoute(route, params = {}) {
      this.currentRoute = route;
      this.params = params;
    },
  },
});
import { FavoritesView } from "./views/favorites/Favorites";
import { MainView } from "./views/main/Main";

class App {
  appState = {
    favorites: [],
    hello: {
      world: "",
    },
  };

  routes = [
    { path: "", view: MainView },
    { path: "favorites", view: FavoritesView },
  ];

  constructor() {
    window.addEventListener("hashchange", this.route.bind(this));

    this.route();
  }

  route() {
    if (this.currentView) {
      this.currentView.destroy();
    }

    const { view } = this.routes.find((r) => {
      const { hash } = window.location;
      return r.path === hash.slice(1);
    });

    if (!view) return;

    this.currentView = new view(this.appState);
    this.currentView.render();
  }
}

new App();

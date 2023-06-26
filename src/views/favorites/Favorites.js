import onChange from "on-change";

import { AbstractView } from "../../common/View";
import { Header } from "../../components/header/header";
import { CardList } from "../../components/CardList/CardList";

export class FavoritesView extends AbstractView {
  constructor(appState) {
    super();

    this.appState = onChange(appState, this.appStateHook.bind(this));

    this.setTitle("Мои книги");
  }

  appStateHook(path) {
    if (path === "favorites") {
      this.render();
    }
  }

  render() {
    this.app.innerHTML = "";

    this.renderHeader();
    this.renderMain();
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.append(header);
  }

  renderMain() {
    const element = document.createElement("div");

    element.innerHTML = `
        <h1>Найдено книг: ${this.appState.favorites.length}</h1>
    `;

    element.append(
      new CardList(this.appState, { list: this.appState.favorites }).render()
    );

    this.app.append(element);
  }

  destroy() {
    onChange.unsubscribe(this.appState);
  }
}

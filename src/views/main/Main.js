import onChange from "on-change";

import { AbstractView } from "../../common/View";
import { Header } from "../../components/header/header";
import { Search } from "../../components/Search/Search";
import { CardList } from "../../components/CardList/CardList";

export class MainView extends AbstractView {
  state = {
    list: [],
    numFound: 0,
    loading: false,
    searchQuery: "",
    offset: 0,
  };

  constructor(appState) {
    super();

    this.appState = onChange(appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));

    this.setTitle("Поиск книг");
  }

  appStateHook(path) {
    if (path === "favorites") {
      this.render();
    }
  }

  async stateHook(path) {
    if (path === "searchQuery") {
      this.state.loading = true;

      const data = await this.loadList(
        this.state.searchQuery,
        this.state.offset
      );

      this.state.loading = false;
      this.state.list = data.docs;
      this.state.numFound = data.numFound;
    }

    if (["loading", "list", "numFound"].includes(path)) {
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
        <h1>Найдено книг: ${this.state.numFound}</h1>
    `;

    element.append(new Search(this.state).render());
    element.append(new CardList(this.appState, this.state).render());

    this.app.append(element);
  }

  async loadList(q, offset) {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${q}&offset=${offset}`
    );

    return res.json();
  }

  destroy() {
    onChange.unsubscribe(this.appState);
    onChange.unsubscribe(this.state);
  }
}

import { DivComponent } from "../../common/DivComponent";
import "./Header.css";

export class Header extends DivComponent {
  constructor(appState) {
    super();
    this.appState = appState;
  }

  render() {
    this.el.classList.add("header");
    this.el.innerHTML = `
        <img src="./static/logo.svg" alt="logo"/>
        <div class="menu">
            <a class="menu__item" href="#">
                <img src="./static/search.svg" alt="search"/>
                Поиск книг
            </a>
            <a class="menu__item" href="#favorites">
                <img src="./static/favorites.svg" alt="favorites"/>
                Избарнное
                <div class="menu__counter">
                    ${this.appState.favorites.length}
                </div>
            </a>
        </div>
    `;
    return this.el;
  }
}

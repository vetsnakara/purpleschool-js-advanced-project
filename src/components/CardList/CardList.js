import { DivComponent } from "../../common/DivComponent";
import { Card } from "../Card/Card";
import "./CardList.css";

export class CardList extends DivComponent {
  constructor(appState, parentState) {
    super();
    this.appState = appState;
    this.parentState = parentState;
  }

  render() {
    if (this.parentState.loading) {
      this.el.innerHTML = `<div class="card_list__loader">Загрузка...</div>`;
      return this.el;
    }

    this.el.classList.add("card_list");

    const cardGridElement = document.createElement("div");
    cardGridElement.classList.add("card_grid");

    for (const card of this.parentState.list) {
      cardGridElement.append(new Card(this.appState, card).render());
    }

    this.el.append(cardGridElement);

    return this.el;
  }
}

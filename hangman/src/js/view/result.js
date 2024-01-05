import AbstractView from "./abstract.js";

const createResultTemplate = () => {
  return `<section class="hangman__result result">
      <h2 class="result__title visually-hidden">Game desk</h2>
    </section>`;
};

export default class Result extends AbstractView {
  getTemplate() {
    return createResultTemplate();
  }
}

import AbstractView from "./abstract.js";

const createResultTemplate = () => {
  return `<section class="hangman__results">
    </section>`;
};

export default class Result extends AbstractView {

  getTemplate() {
    return createResultTemplate();
  }
}

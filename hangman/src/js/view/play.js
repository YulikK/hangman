import AbstractView from "./abstract.js";

const createPlayTemplate = () => {
  return `<section class="hangman__play">
    </section>`;
};

export default class Play extends AbstractView {
  getTemplate() {
    return createPlayTemplate();
  }
}

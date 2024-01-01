import AbstractView from "./abstract.js";

const createHangmanWrapperTemplate = () => {
  return `<article class="hangman__wrapper">
    </article>`;
};

export default class HangmanWrapper extends AbstractView {
  getTemplate() {
    return createHangmanWrapperTemplate();
  }
}

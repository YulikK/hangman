import AbstractView from "./abstract.js";

const createHangmanWrapperTemplate = () => {
  return `<article class="hangman__wrapper">
      <h1 class="hangman__title">Hangman</h1>
    </article>`;
};

export default class HangmanWrapper extends AbstractView {
  getTemplate() {
    return createHangmanWrapperTemplate();
  }
}

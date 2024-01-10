import AbstractView from "./abstract.js";

const createHangmanGameWrapperTemplate = () => {
  return `<div class="hangman__game-wrapper">
      </div>`;
};

export default class HangmanGameWrapper extends AbstractView {
  getTemplate() {
    return createHangmanGameWrapperTemplate();
  }
}

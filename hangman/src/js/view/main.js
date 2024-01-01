import AbstractView from "./abstract.js";

const createMainTemplate = () => {
  return `<main class="hangman">
      <h1 class="hangman__title">Hangman</h1>
    </main>`;
};

export default class Main extends AbstractView {
  getTemplate() {
    return createMainTemplate();
  }
}

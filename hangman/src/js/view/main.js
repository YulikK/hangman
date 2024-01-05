import AbstractView from "./abstract.js";

const createMainTemplate = () => {
  return `<main class="hangman">
    </main>`;
};

export default class Main extends AbstractView {
  getTemplate() {
    return createMainTemplate();
  }
}

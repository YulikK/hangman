import AbstractView from "./abstract.js";

const createGameTemplate = () => {
  return `<section class="hangman__game game">
      <h2 class="game__title visually-hidden">Game desk</h2>
    </section>`;
};

export default class Game extends AbstractView {
  getTemplate() {
    return createGameTemplate();
  }
}

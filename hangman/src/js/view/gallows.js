import AbstractView from "./abstract.js";

const createGallowsTemplate = () => {
  return `<div class="hangman__gallows">
          <img
            class="hangman__gallows-tree"
            src="img/tree.png"
            alt="allows"
            width="514"
            height="572"
          />
        </div>`;
};

export default class Gallows extends AbstractView {
  getTemplate() {
    return createGallowsTemplate();
  }
}

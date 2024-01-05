import AbstractView from "./abstract.js";

const createGallowsTemplate = () => {
  return `<div class="result__gallows">
          <img
            class="result__gallows-tree"
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

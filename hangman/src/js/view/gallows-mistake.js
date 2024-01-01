import AbstractView from "./abstract.js";

const createGallowsMistakeTemplate = (mistakeCount) => {
  return `<img
            class="hangman__gallows-mistake"
            src="img/mistake-${mistakeCount}.png"
            alt="mistake"
            width="514"
            height="572"
          />`;
};

export default class GallowsMistake extends AbstractView {
  constructor(mistakeCount) {
    super();
    this._mistakeCount = mistakeCount;
  }

  updateMistake(mistakeCount) {
    this._mistakeCount = mistakeCount;
    this.getElement().src = `img/mistake-${this._mistakeCount}.png`;
  }

  getTemplate() {
    return createGallowsMistakeTemplate(this._mistakeCount);
  }
}

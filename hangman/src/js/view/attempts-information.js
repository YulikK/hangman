import AbstractView from "./abstract.js";
import { MAX_MISTAKE_COUNT } from "../const.js";

const createAttemptsInformationTemplate = (mistakeCount) => {
  return `<p class="hangman__attempts-information">${mistakeCount}/${MAX_MISTAKE_COUNT}</p>`;
};

export default class AttemptsInformation extends AbstractView {
  constructor(mistakeCount) {
    super();
    this._mistakeCount = mistakeCount;
  }

  updateMistake(mistakeCount) {
    this._mistakeCount = mistakeCount;
    this.getElement().innerText = `${this._mistakeCount}/${MAX_MISTAKE_COUNT}`;
  }

  getTemplate() {
    return createAttemptsInformationTemplate(this._mistakeCount);
  }
}

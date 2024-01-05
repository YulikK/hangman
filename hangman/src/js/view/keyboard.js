import AbstractView from "./abstract.js";
import { KEYBOARD } from "../utils/const.js";

const createLetterTemplate = (letter) => {
  return `<p class="keyboard__letter keyboard__letter--active" data-key="${letter}">${letter.toUpperCase()}</p>`;
};

const createRowTemplate = (row) => {
  const keyboardLetterTemplate = row
    .map((letter) => createLetterTemplate(letter))
    .join(``);
  return `<div class="keyboard__row">
      ${keyboardLetterTemplate}
    </div>`;
};

const createKeyboardTemplate = () => {
  const keyboardRowTemplate = KEYBOARD.map((row) =>
    createRowTemplate(row),
  ).join(``);
  return `<section class="game__keyboard keyboard">
    <h2 class="keyboard__title visually-hidden">Keyboard</h2>
      ${keyboardRowTemplate}
    </section>`;
};

export default class Keyboard extends AbstractView {
  constructor() {
    super();
    this._keyClickHandler = this._keyClickHandler.bind(this);
    this._keyDownHandler = this._keyDownHandler.bind(this);
  }

  getTemplate() {
    return createKeyboardTemplate();
  }

  _keyClickHandler(evt) {
    if (!evt.target.classList.contains("keyboard__letter")) {
      return;
    }
    if (evt.target.classList.contains("keyboard__letter--active")) {
      evt.target.classList.remove("keyboard__letter--active");
      evt.target.classList.add("keyboard__letter--inactive");
      evt.preventDefault();
      this._callback.keyboardClick(evt.target.innerText);
    }
  }

  _keyDownHandler(evt) {
    if (evt.key) {
      const keyElement = this.getElement().querySelector(
        `p[data-key="${evt.key.toLowerCase()}"]`,
      );
      if (keyElement) {
        if (keyElement.classList.contains("keyboard__letter--active")) {
          keyElement.classList.remove("keyboard__letter--active");
          keyElement.classList.add("keyboard__letter--inactive");
          evt.preventDefault();
          this._callback.keyboardClick(evt.key.toUpperCase());
        }
      }
    }
  }

  setKeyClickHandler(callback) {
    this._callback.keyboardClick = callback;
    this.getElement().addEventListener(`click`, this._keyClickHandler);
    document.addEventListener(`keydown`, this._keyDownHandler);
  }

  deleteKeyClickHandler() {
    this.getElement().removeEventListener(`click`, this._keyClickHandler);
    document.removeEventListener(`keydown`, this._keyDownHandler);
  }
}

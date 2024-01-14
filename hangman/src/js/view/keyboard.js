import AbstractView from "./abstract.js";
import { KEYBOARD } from "../utils/const.js";
import { createDomElement } from "../utils/render.js";

const getPropertiesTemplate = () => {
  return {
    tag: "section",
    className: "game__keyboard keyboard",
  };
};

const getPropertiesTitleTemplate = () => {
  return {
    tag: "h3",
    className: "keyboard__title visually-hidden",
    textContent: "Keyboard",
  };
};

const getPropertiesRowTemplate = () => {
  return {
    tag: "div",
    className: "keyboard__row",
  };
};

const getPropertiesLetterTemplate = (letter) => {
  return {
    tag: "p",
    className: "keyboard__letter keyboard__letter--active",
    textContent: letter.toUpperCase(),
    data: letter,
  };
};

export default class Keyboard extends AbstractView {
  constructor() {
    super();
    this._elements = this.generateNode();
    this._structure = {
      element: this._elements.section,
      child: [
        {
          element: this._elements.title,
        },
      ],
    };
    KEYBOARD.forEach((row, index) => {
      this._structure["child"].push({
        element: this._elements[`row_${index}`],
        child: this.getLettersArray(row),
      });
    });

    this._keyClickHandler = this._keyClickHandler.bind(this);
    this._keyDownHandler = this._keyDownHandler.bind(this);
  }

  generateNode() {
    const nodeList = {
      section: createDomElement(getPropertiesTemplate()),
      title: createDomElement(getPropertiesTitleTemplate()),
      row: createDomElement(getPropertiesRowTemplate()),
    };

    KEYBOARD.forEach((row, index) => {
      nodeList[`row_${index}`] = createDomElement(getPropertiesRowTemplate());
      row.forEach((letter) => {
        nodeList[`letter_${letter}`] = createDomElement(
          getPropertiesLetterTemplate(letter),
        );
      });
    });

    return nodeList;
  }

  getLettersArray(row) {
    const letterArr = row.map((letter) => {
      const letterObj = new Object();
      letterObj.element = this._elements[`letter_${letter}`];
      return letterObj;
    });
    return letterArr;
  }

  _keyClickHandler(evt) {
    if (!evt.target.classList.contains("keyboard__letter")) {
      return;
    }
    if (evt.target.classList.contains("keyboard__letter--active")) {
      evt.target.classList.remove("keyboard__letter--active");
      evt.target.classList.add("keyboard__letter--inactive");
      evt.preventDefault();
      this._callback.keyboardClick(evt.target.data);
    }
  }

  _keyDownHandler(evt) {
    if (evt.key) {
      const keyElement = this._elements[`letter_${evt.key.toLowerCase()}`];
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

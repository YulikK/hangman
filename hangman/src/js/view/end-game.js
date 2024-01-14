import AbstractView from "./abstract.js";
import { createDomElement } from "../utils/render.js";

const getPropertiesAsideTemplate = () => {
  return {
    tag: "aside",
    className: "modal-results",
  };
};

const getPropertiesDiveTemplate = () => {
  return {
    tag: "div",
    className: "modal-results__wrapper",
  };
};

const getPropertiesTitleTemplate = (isWin) => {
  return {
    tag: "h2",
    className: "modal-results__title",
    textContent: `${isWin ? "Uh, congratulations!" : "Ups..."}`,
  };
};

const getPropertiesInformationTemplate = (answer, question) => {
  return {
    tag: "p",
    className: "modal-results__information",
    innerHTML: `<span class="modal-results__answer">${answer}</span> - ${question}`,
  };
};

const getPropertiesButtonTemplate = () => {
  return {
    tag: "a",
    className: "modal-results__button",
    textContent: "Play again",
  };
};

export default class EndGame extends AbstractView {
  constructor(question, isWin) {
    super();
    this._isWin = isWin;
    this._question = question.text;
    this._answer = question.answer;
    this._elements = this.generateNode();
    this._structure = {
      element: this._elements.aside,
      child: [
        {
          element: this._elements.div,
          child: [
            {
              element: this._elements.title,
            },
            {
              element: this._elements.information,
            },
            {
              element: this._elements.closeBtn,
            },
          ],
        },
      ],
    };
    this._playAgainClickHandler = this._playAgainClickHandler.bind(this);
  }

  generateNode() {
    return {
      aside: createDomElement(getPropertiesAsideTemplate()),
      div: createDomElement(getPropertiesDiveTemplate()),
      title: createDomElement(getPropertiesTitleTemplate(this._isWin)),
      information: createDomElement(
        getPropertiesInformationTemplate(this._answer, this._question),
      ),
      closeBtn: createDomElement(getPropertiesButtonTemplate()),
    };
  }

  _playAgainClickHandler(evt) {
    evt.preventDefault();
    this._callback.playAgainClick();
  }

  setPlayAgainClickHandler(callback) {
    this._callback.playAgainClick = callback;
    this._elements.closeBtn.addEventListener(
      `click`,
      this._playAgainClickHandler,
    );
  }
}

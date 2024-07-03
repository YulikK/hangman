import AbstractView from "./abstract.js";
import { createDomElement } from "../utils/render.js";

const getPropertiesTemplate = () => {
  return {
    tag: "main",
    className: "hangman",
  };
};

const getPropertiesArticleTemplate = () => {
  return {
    tag: "article",
    className: "hangman__wrapper",
  };
};

const getPropertiesTitleTemplate = () => {
  return {
    tag: "h1",
    className: "hangman__title",
    textContent: "Hangman",
  };
};

const getPropertiesDivTemplate = () => {
  return {
    tag: "div",
    className: "hangman__game-wrapper",
  };
};

export default class Main extends AbstractView {
  constructor() {
    super();
    this._elements = this.generateNode();
    this._structure = {
      element: this._elements.main,
      child: [
        {
          element: this._elements.article,
          child: [
            {
              element: this._elements.title,
            },
            {
              element: this._elements.div,
            },
          ],
        },
      ],
    };
  }

  generateNode() {
    return {
      main: createDomElement(getPropertiesTemplate()),
      article: createDomElement(getPropertiesArticleTemplate()),
      title: createDomElement(getPropertiesTitleTemplate()),
      div: createDomElement(getPropertiesDivTemplate()),
    };
  }
}

import AbstractView from "./abstract.js";
import { MAX_MISTAKE_COUNT } from "../utils/const.js";
import { createDomElement } from "../utils/render.js";

const getPropertiesResultSectionTemplate = () => {
  return {
    tag: "section",
    className: "hangman__result result",
  };
};

const getPropertiesResultTitleTemplate = () => {
  return {
    tag: "h3",
    className: "result__title visually-hidden",
    textContent: "Game result",
  };
};

const getPropertiesGallowsSectionTemplate = () => {
  return {
    tag: "div",
    className: "result__gallows",
  };
};

const getPropertiesGallowsTreeTemplate = () => {
  return {
    tag: "img",
    className: "result__gallows-tree",
    src: "img/tree.png",
    alt: "allows",
    width: "514",
    height: "572",
  };
};

const getPropertiesGallowsMistakeTemplate = (mistakeCount) => {
  return {
    tag: "img",
    className: "result__gallows-mistake visually-hidden",
    src: `img/mistake-${mistakeCount === 0 ? 1 : mistakeCount}.png`,
    alt: "mistake",
    width: "514",
    height: "572",
  };
};

const getPropertiesAttemptsDivTemplate = () => {
  return {
    tag: "div",
    className: "result__attempts",
  };
};

const getPropertiesAttemptsHeartTemplate = () => {
  return {
    tag: "img",
    className: "result__heart",
    src: "img/heart.png",
    alt: "",
    width: "61",
    height: "66",
  };
};

const getPropertiesAttemptsInformationTemplate = (mistakeCount) => {
  return {
    tag: "p",
    className: "result__attempts-information",
    textContent: `${mistakeCount}/${MAX_MISTAKE_COUNT}`,
  };
};

export default class Result extends AbstractView {
  constructor(mistakeCount) {
    super();
    this._mistakeCount = mistakeCount;
    this._elements = this.generateNode();
    this._structure = {
      element: this._elements.resultSection,
      child: [
        {
          element: this._elements.resultTitle,
        },
        {
          element: this._elements.gallowsDiv,
          child: [
            {
              element: this._elements.gallowsTree,
            },
            {
              element: this._elements.gallowsMistake,
            },
          ],
        },
        {
          element: this._elements.attemptsDiv,
          child: [
            {
              element: this._elements.attemptsHeart,
            },
            {
              element: this._elements.attemptsInformation,
            },
          ],
        },
      ],
    };
  }
  generateNode() {
    return {
      resultSection: createDomElement(getPropertiesResultSectionTemplate()),
      resultTitle: createDomElement(getPropertiesResultTitleTemplate()),
      gallowsDiv: createDomElement(getPropertiesGallowsSectionTemplate()),
      gallowsTree: createDomElement(getPropertiesGallowsTreeTemplate()),
      gallowsMistake: createDomElement(
        getPropertiesGallowsMistakeTemplate(this._mistakeCount),
      ),
      attemptsDiv: createDomElement(getPropertiesAttemptsDivTemplate()),
      attemptsHeart: createDomElement(getPropertiesAttemptsHeartTemplate()),
      attemptsInformation: createDomElement(
        getPropertiesAttemptsInformationTemplate(this._mistakeCount),
      ),
    };
  }

  updateMistake(mistakeCount) {
    this._mistakeCount = mistakeCount;
    if (this._mistakeCount === 1) {
      this._elements.gallowsMistake.classList.remove("visually-hidden");
    }
    this._elements.gallowsMistake.src = `img/mistake-${this._mistakeCount}.png`;
    this._elements.attemptsInformation.textContent = `${this._mistakeCount}/${MAX_MISTAKE_COUNT}`;
  }
}

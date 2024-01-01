(() => {
  "use strict";
  const e = JSON.parse(
    '[{"id":"1","text":"Is it a fruit or a tech company?","answer":"apple"},{"id":"2","text":"Where can you relax with a sandy shore?","answer":"beach"},{"id":"3","text":"What do you do when you\'re happy?","answer":"smile"},{"id":"4","text":"Which striped animal lives in the jungle?","answer":"tiger"},{"id":"5","text":"What do you listen to for entertainment?","answer":"music"},{"id":"6","text":"What dish is often ordered at parties?","answer":"pizza"},{"id":"7","text":"What word describes clear weather?","answer":"sunny"},{"id":"8","text":"What do people do at parties?","answer":"dance"},{"id":"9","text":"Where can you see the flow of water?","answer":"river"},{"id":"10","text":"What word describes a positive mood?","answer":"happy"},{"id":"11","text":"What is Earth\'s natural satellite?","answer":"moon"},{"id":"12","text":"What twinkles in the night sky?","answer":"stars"},{"id":"13","text":"What do you read for pleasure?","answer":"books"},{"id":"14","text":"What is a vast body of water?","answer":"ocean"},{"id":"15","text":"What do people do for physical activity?","answer":"sport"},{"id":"16","text":"How do you express your creative side?","answer":"paint"},{"id":"17","text":"Where do we live?","answer":"earth"},{"id":"18","text":"What do you do to restore energy?","answer":"sleep"},{"id":"19","text":"What is delicious and good for your health?","answer":"fruit"},{"id":"20","text":"What do you watch for entertainment in a cinema?","answer":"movie"}]',
  );
  class t {
    constructor() {
      this._questions = [];
    }
    setQuestions(e) {
      this._questions = e.slice();
    }
    getQuestions() {
      return this._questions;
    }
    adaptToClient(e) {
      return Object.assign({}, e, { id: e.id, text: e.text, answer: e.answer });
    }
  }
  class n {
    constructor() {
      if (new.target === n)
        throw new Error("Can't instantiate Abstract, only concrete one.");
      (this._element = null), (this._callback = {});
    }
    getTemplate() {
      throw new Error("Abstract method not implemented: getTemplate");
    }
    getElement() {
      return (
        this._element || (this._element = a(this.getTemplate())), this._element
      );
    }
    removeElement() {
      this._element = null;
    }
  }
  const s = (e, t) => {
      e instanceof n && (e = e.getElement()),
        t instanceof n && (t = t.getElement()),
        e.append(t);
    },
    a = (e) => {
      const t = document.createElement("div");
      return (t.innerHTML = e), t.firstChild;
    };
  class o extends n {
    getTemplate() {
      return '<main class="hangman">\n      <h1 class="hangman__title">Hangman</h1>\n    </main>';
    }
  }
  class i extends n {
    getTemplate() {
      return '<article class="hangman__wrapper">\n    </article>';
    }
  }
  class r {
    constructor(e) {
      (this._mistakeCount = 0),
        (this._gameContainer = e),
        (this._resultComponent = new o()),
        (this._mainComponent = new o()),
        (this._hangmanWrapperComponent = new i()),
        (this._resultComponent = new o()),
        (this._playComponent = new i());
    }
    init(e) {
      (this._questions = e),
        (this._currentQuestion = _getRandomQuestion()),
        (this._questionComponent = new QuestionView(this._currentQuestion)),
        this._renderGame();
    }
    _renderGame() {
      s(this._gameContainer, this._mainComponent),
        s(this._mainComponent, this._hangmanWrapperComponent),
        s(this._hangmanWrapperComponent, this._resultComponent),
        s(this._hangmanWrapperComponent, this._playComponent);
    }
    _getRandomQuestion() {
      return this._questions[
        Math.floor(Math.random() * this._questions.length)
      ];
    }
    getQuestion() {
      return this._questionComponent.getElement();
    }
    destroy() {
      ((e) => {
        if (null !== e) {
          if (!(e instanceof n)) throw new Error("Can remove only components");
          e.getElement().remove(), e.removeElement();
        }
      })(this._questionComponent);
    }
  }
  const h = document.querySelector("body");
  if (null !== h) {
    const n = new t();
    ((e) => {
      const t = e.map(n.adaptToClient);
      n.setQuestions(t);
    })(e),
      new r(h).init(n.getQuestions());
  }
})();

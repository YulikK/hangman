export default class Questions {
  constructor() {
    this._questions = [];
  }

  setQuestions(questions) {
    this._questions = questions.slice();
  }

  getQuestions() {
    return this._questions;
  }

  adaptToClient(question) {
    const adaptedQuestion = Object.assign({}, question, {
      id: question.id,
      text: question.text,
      answer: question.answer,
    });
    return adaptedQuestion;
  }
}

import mockFile from "../mock/questions.json";
import QuestionModel from "./model/questions.js";
import HangmanPresenter from "./presenter/hangman.js";

const siteBodyElement = document.querySelector(`body`);

if (siteBodyElement !== null) {
  const questionModel = new QuestionModel();

  const initData = (data) => {
    const questions = data.map(questionModel.adaptToClient);
    questionModel.setQuestions(questions);
  };

  initData(mockFile);

  const hangmanPresenter = new HangmanPresenter(siteBodyElement);
  hangmanPresenter.init(questionModel.getQuestions());
}

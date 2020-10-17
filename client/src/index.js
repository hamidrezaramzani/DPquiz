import './style/style.css';
import { questionWriting, goToSecondForm, backToQuestionForm, addAnswer, createQuiz, checkPictureIsValid, nextQuestion } from './quiz';
import './routes';

const questionInput = document.getElementById("question");
const submitQuestion = document.getElementById("submit-questions");
const backToQuestion = document.getElementById("back-to-questions");
const addAnswerButton = document.getElementById("add-to-answers");
const submitQuiz = document.getElementById("submit-quiz-question");
const picture = document.getElementById("picture");
const next = document.getElementById("next");
if (questionInput) {
    questionInput.addEventListener("keyup", questionWriting);
    submitQuestion.addEventListener("click", goToSecondForm);
    backToQuestion.addEventListener("click", backToQuestionForm);
    addAnswerButton.addEventListener("click", addAnswer);
    submitQuiz.addEventListener("click", createQuiz);
    picture.addEventListener("change", checkPictureIsValid);
}

if (next) {
    next.addEventListener("click" , nextQuestion);
}
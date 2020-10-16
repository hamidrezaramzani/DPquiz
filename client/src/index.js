import './style/style.css';
import { questionWriting, goToSecondForm, backToQuestionForm, addAnswer, createQuiz, checkPictureIsValid } from './quiz';
import './routes';

const questionInput = document.getElementById("question");
const submitQuestion = document.getElementById("submit-questions");
const backToQuestion = document.getElementById("back-to-questions");
const addAnswerButton = document.getElementById("add-to-answers");
const submitQuiz = document.getElementById("submit-quiz-question");
const picture = document.getElementById("picture");

if (questionInput) {
    questionInput.addEventListener("keyup", questionWriting);
}
if (submitQuestion) {
    submitQuestion.addEventListener("click", goToSecondForm);
}

if (backToQuestion) {
    backToQuestion.addEventListener("click", backToQuestionForm);
}

if (addAnswerButton)
    addAnswerButton.addEventListener("click", addAnswer);

if (submitQuiz)
    submitQuiz.addEventListener("click", createQuiz);

if (picture) {
    picture.addEventListener("change", checkPictureIsValid);
}
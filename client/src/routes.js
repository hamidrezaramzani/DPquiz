import Router from './libs/Router';
import index from './pages/index.html';
import addQuiz from './pages/add-quiz.html';
import list from './pages/list.html';
import { setCurrectQuestion } from './quiz';
const routes = new Router({
    page404: () => {
        console.log("Page 404");
    }
});

routes.add("/", () => {
    document.title = "صفحه اصلی";
    document.body.innerHTML = index;
});


routes.add("/add-quiz", () => {
    document.title = "اضافه کردن سوال آیین نامه";
    document.body.innerHTML = addQuiz;
});


routes.add("/list", async () => {
    document.title = "لیست سوالات";
    document.body.innerHTML = list;
    const responsePromise = await fetch("http://localhost:5000/api/v1/quiz/list");
    const response = await responsePromise.json();
    setCurrectQuestion(response[0]);
    localStorage.setItem("questions", JSON.stringify(response));
    let seconds = 120;
    const timer = setInterval(() => {
        seconds -= 1;
        if (seconds == 0) {
            clearInterval(timer);
            location.href = "/";
        }

        document.getElementById("timer").innerText = Math.floor(seconds / 60) + ":" + Math.floor(seconds % 60);
    }, 1000);
});


function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}


routes.listen();
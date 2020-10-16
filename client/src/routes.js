import Router from './libs/Router';
import index from './pages/index.html';
import addQuiz from './pages/add-quiz.html';
const routes = new Router({
    page404 : () => {
        console.log("Page 404");
    }
});

routes.add("/",() => {
    document.title = "صفحه اصلی";
    document.body.innerHTML = index;
});


routes.add("/add-quiz",() => {
    document.title = "اضافه کردن سوال آیین نامه";
    document.body.innerHTML = addQuiz;
});
routes.listen();
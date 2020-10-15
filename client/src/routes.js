import Router from './libs/Router';
import index from './pages/index.html';
const routes = new Router({
    page404 : () => {
        console.log("Page 404");
    }
});

routes.add("/",() => {
    document.title = "صفحه اصلی";
    document.body.innerHTML = index;
});

routes.listen();
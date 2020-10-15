"use strict";
const Router = function (data) {
    const routes = [{ path: '/404' }];

    if (data.page404) {
        routes[0].cb = data.page404;
    }

    const add = function (path, cb) {
        routes.push({ path, cb });
    };

    const flush = function () {
        routes = [];
    };


    const listen = function () {
        const path = location.pathname;
        let isMatch = false;
        for (let index = 0; index < routes.length; index++) {
            if (routes[index].path == path) {
                isMatch = true;
                routes[index].cb();
                break;
            }
        }
        if (!isMatch) {
            location.replace("/404");
        }
    };

    Router.prototype.add = add;
    Router.prototype.flush = flush;
    Router.prototype.listen = listen;
};

export default Router;
import axios from 'axios';
import env from '../../build/env';
import semver from 'semver';
import packjson from '../../package.json';

let util = {};

util.title = function (title) {
    title = title || 'qqVue';
    window.document.title = title;
};

const ajaxUrl = env === 'development' ? 'http://127.0.0.1:8888' : env === 'production' ? 'https://www.url.com' : 'https://debug.url.com';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};

util.showThisRoute = function (itAccess, currentAccess) {
    if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
        return util.oneOf(currentAccess, itAccess);
    } else {
        return itAccess === currentAccess;
    }
};

util.getRouterObjByName = function (routers, name) {
    if (!name || !routers || !routers.length) {
        return null;
    }
    // debugger;
    let routerObj = null;
    for (let item of routers) {
        if (item.name === name) {
            return item;
        }
        routerObj = util.getRouterObjByName(item.children, name);
        if (routerObj) {
            return routerObj;
        }
    }
    return null;
};

util.handleTitle = function (vm, item) {
    if (typeof item.title === 'object') {
        return vm.$t(item.title.i18n);
    } else {
        return item.title;
    }
};

util.setCurrentPath = function (vm, name) {
    let currentPathObj = vm.$store.state.app.routers.filter(item => {
        if (item.children.length <= 1) {
            return item.children[0].name === name;
        } else {
            let i = 0;
            let childArr = item.children;
            let len = childArr.length;
            while (i < len) {
                if (childArr[i].name === name) {
                    return true;
                }
                i++;
            }
            return false;
        }
    })[0];

    let currentPathArr = [
        {
            title: currentPathObj.title,
            path: '',
            name: currentPathObj.name
        }
    ];
    vm.$store.commit('setCurrentPath', currentPathArr);

    return currentPathArr;
};

util.toDefaultPage = function (routers, name, route, next) {
    let len = routers.length;
    let i = 0;
    let notHandle = true;
    while (i < len) {
        if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
            route.replace({
                name: routers[i].children[0].name
            });
            notHandle = false;
            next();
            break;
        }
        i++;
    }
    if (notHandle) {
        next();
    }
};

export default util;
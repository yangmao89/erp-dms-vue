import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Layout from '@/layout';
import Vuex from "vuex";
import getters from "../store/getters";

/**
 *
 * @type {{path: string, component: (function(): (Promise<*>|*)), hidden: boolean}}
 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/error-page/401'),
        hidden: true
    }
]

const modulesFiles = require.context('./modules', true, /\.js$/)
export const asyncRoutes = modulesFiles.keys().reduce((asyncRoutes, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    asyncRoutes = asyncRoutes.concat(value.default)
    return asyncRoutes
}, [])


const createRouter = () => new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter();

export function resetRouter(){
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;
}
export default router;


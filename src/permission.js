// 权限拦截

import router from '@/router'
import store from '@/store'
import {Message} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken} from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({showSpinner: false})

const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async(to, from, next) => {
    NProgress.start();
    document.title = getPageTitle(to.meta.title);

    const hasToken = getToken();
    if(hasToken){
        if(to.path == "/login"){
            next({path: '/'})
            NProgress.done();
        } else {
            try{
                const hasRoles = store.getters.roles && store.getters.roles.length > 0
                if(hasRoles){
                    next();
                } else {
                    const {roles} = await store.dispatch("user/getUserInfo")
                    const accessRoutes = await store.dispatch("permission/generateRoutes", roles);
                    router.addRoutes(accessRoutes);
                    next({...to, replace: true})
                }
            } catch (error) {
                await store.dispatch('user/resetToken')
                Message.error(error || 'Has Error')
                next(`/login?redirect=${to.path}`)
            }
        }
    } else {
        if(whiteList.indexOf(to.path) !== -1){
            next()
        } else {
            next(`/login?redirect=${to.path}`)
            NProgress.done();
        }
    }
})

router.afterEach((to, from, next) => {
    NProgress.done();
})
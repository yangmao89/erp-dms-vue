import {login, logout, getInfo} from '@/api/login/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}

const actions = {
    login({commit}, userInfo){
        const {username, password} = userInfo;
        return new Promise((resolve, reject) => {
            login({username: username.trim(), password: password }).then(response => {
                const { data } = response;
                commit("SET_TOKEN", data.token);
                setToken(data.token);
                resolve();
            }).catch(err => {
                reject(error)
            })
        })
    },
    logout({commit}){
        return new Promise((resolve, reject) => {
            logout().then(response => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                resetRouter()
                resolve();
            }).catch(error => {
                reject(error)
            })
        })
    },
    getUserInfo({commit, state}){
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response
                if (!data) {
                    reject('获取用户信息失败，请重新登陆！');
                }
                const {roles, name, avatar} = data
                if (!roles || roles.length <= 0) {
                    reject('getInfo: roles must be a non-null array!')
                }
                commit('SET_ROLES', roles)
                commit('SET_NAME', name)
                commit('SET_AVATAR', avatar)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
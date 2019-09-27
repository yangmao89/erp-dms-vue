import Cookies from 'js-cookie';

const TOKEN_KEY = "Admin-Token";

export function setToken(token){
    Cookies.set(TOKEN_KEY, token);
}

export function getToken(){
    return Cookies.get(TOKEN_KEY);
}

export function removeToken(){
    Cookies.remove(TOKEN_KEY);
}
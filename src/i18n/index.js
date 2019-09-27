import VueI18n from 'vue-i18n'
import Vue from 'vue'

import zh from '@/i18n/zh/index'
import en from '@/i18n/en/index'

Vue.use(VueI18n)

const i18n = {
    locale: localStorage.getItem("lang") || 'zh',
    messages: {
        'zh': zh,
        'en': en
    }
}

export default i18n;


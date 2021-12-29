import Vue from 'vue'
import axios from 'axios'
/* eslint-disable */
Vue.use({
    install(Vue) {
        // Vue.prototype.$http = axios
        Vue.prototype.$http = axios.create({
            baseURL: process.env.VUE_APP_URL_BASE_API,
            // baseURL: 'http://jpsback.mcc.tec.br',
        })
        Vue.prototype.$httpExt = axios.create({ })
    }
})
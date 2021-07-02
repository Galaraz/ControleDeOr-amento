import Vue from 'vue'
import axios from 'axios'
/* eslint-disable */
Vue.use({
    install(Vue) {
        // Vue.prototype.$http = axios
        Vue.prototype.$http = axios.create({
            baseURL: 'http://127.0.0.1:8000/',
            // baseURL: 'http://jpsback.mcc.tec.br',
        })
        Vue.prototype.$httpExt = axios.create({ })
    }
})
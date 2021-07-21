import Vue from 'vue';
import Vuex from 'vuex';

import layout from './layout';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    layout,
  },
  state: {
    user: { id:null, uuid:null, name:null },
    nomePagina: '',
  },
  mutations: {
    setUser(state, payload){
      state.user = payload
    },
    clearUser(state){
      state.user = { id:null, uuid:null, name:null }
      state.privilegios = []
      state.sistemas = [] 
      state.appToken = null
      state.appTokenExpiration = null
    },
    setNomePagina(state, payload){
      state.nomePagina = payload
    },
  } 
});

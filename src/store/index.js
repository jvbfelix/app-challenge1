import { createStore } from 'vuex'

export default createStore({
  state: {
    ApiKey: localStorage.getItem('CobliAPIKey') || '',
  },
  mutations: {
    login: (state,t) => { 
      localStorage.setItem('CobliAPIKey', t)
      state.ApiKey = localStorage.getItem('CobliAPIKey') || ''
    },
    logout: (state) => {
      localStorage.removeItem('CobliAPIKey')
      state.ApiKey = localStorage.getItem('CobliAPIKey') || ''
    },
  },
  actions: {
    login (state,t) {
      this.commit('login',t)
    },
    logout () {
      this.commit('logout')
    },
  },
  getters: {
    isAuthenticated: state => !!state.ApiKey,
    ApiKey: state => state.ApiKey,
  },
  modules: {
  }
})

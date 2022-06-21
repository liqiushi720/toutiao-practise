import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/stroage'

Vue.use(Vuex)
const TOKEN_LOGIN = 'TOKEN_LOGIN'
export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_LOGIN)
  },
  getters: {},
  mutations: {
    setUser (state, payload) {
      state.user = payload
      setItem(TOKEN_LOGIN, state.user)
    }
  },
  actions: {},
  modules: {}
})

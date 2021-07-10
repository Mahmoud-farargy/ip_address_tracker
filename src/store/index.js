import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchResults: {},
    loadingResults: false
  },
  mutations: {
    updateSearchResults: (state, payload ) => {
      state.searchResults = payload;
    },
    updateLoading: (state, val) => {
      state.loadingResults = val;
    }
  },
  actions: {
    updateSearchResults: (state, payload) => state.commit("updateSearchResults", payload),
    updateLoading: (state, payload) =>  state.commit("updateLoading", payload)
  },
  getters: {
    getSearchResults: state => state.searchResults,
    getLoadingState: state =>  state.loadingResults
  }
})

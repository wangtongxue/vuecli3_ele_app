import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const types = {
  setLocation: 'setLocation',
  setAddress: 'setAddress'
}
const state = {
  location: {},
  address: ''
}
const getters = {
  location: state => state.location,
  address: state => state.address
}
const mutations = {
  [types.setLocation](state, location){
    if(location){
      state.location = location
    }else {
      state.location = null
    }
  },
  [types.setAddress](state, address){
    if(address){
      state.address = address
    }else {
      state.address = ''
    }
  }
}
const actions = {
  setLocation: ({commit}, location) => {
    commit(types.setLocation, location)
  },
  setAddress: ({commit}, address) => {
    commit(types.setAddress, address)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import actions from './actions'


Vue.use(Vuex)
const store = new Vuex.Store({
    modules,
    actions,
    strict: true
})   


export default store
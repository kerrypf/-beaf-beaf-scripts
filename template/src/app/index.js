import App from './view'
import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

import './assets/style'

Vue.use(ElementUI);

function render(store,router){
    const vue = new Vue({
        el:'#app',
        store:store,
        router:router,
        render: h => h(App)
    }) 
}

export {
    render
}
import App from './view'
import Vue from 'vue'

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
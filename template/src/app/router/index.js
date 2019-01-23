import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'

Vue.use(VueRouter)
// *** 实例化VueRouter
let router = new VueRouter({
    routes,
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: true
})



router.beforeEach((to, from, next) =>{
    next()
})

    
export default  router
    

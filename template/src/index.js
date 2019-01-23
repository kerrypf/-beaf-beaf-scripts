
import service from './app/service'
import store from './app/model/vuex'
import router from './app/router'
// console.log(location,service.common.get('user_info_get',{
//     id:1231
// }))

import { render } from './app'

// console.log(service,render)
render(store, router)
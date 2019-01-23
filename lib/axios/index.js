import api from '../../model/api'
import Methods,{ axios } from './convert.js'
const decorator = function (){
    let ret = Object.keys(api).reduce(function(pend,key){
        pend[key] = new Methods(api[key])
        return pend
    },{})
    return ret
}
export { axios }
export default decorator

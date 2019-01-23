import api, {axios } from './axios'

import apiConfig from '../model/api'
var core={
    ...api(apiConfig)
}
console.log(core)

export default core
export {
    axios
}
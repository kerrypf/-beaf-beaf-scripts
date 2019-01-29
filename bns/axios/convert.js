import Axios from 'axios'
import _remove from 'lodash/remove'
const axios = Axios.create()
        let cancelToken = Axios.CancelToken;
        
const d = {};
class Req {

    u = null;
    cancel = null;
    promise = null;

    constructor(type, api, params, data){
        this.u = type + '&' + api.url

        this.promise = new Promise((resolve, reject) => {
            const apiUrl = parseUrl(api.url, params)
            const config = formatConfig(api)
            config.cancelToken = new cancelToken((c)=>{   //必须在config中设置cancelToken，才可取消请求
                this.cancel = c
            })
            let axiosAgr = [apiUrl,data,config]
            _remove(axiosAgr, (item)=>{
                return !item
            })

            return axios[type](...axiosAgr)
                .then(response => {
                    return resolve(response)
                    
                }, err => {
                    reject(err)
                })
                .catch((error) => {
                    reject(error)
                })
        }).finally( () => { //请求响应完成（包括取消响应）
            console.log(d[this.u],this,d[this.u] === this)
        } )
    }

    cancelRequest(){
        console.log(this.cancel)
        this.cancel('取消过期请求！！！')
    }
}



/**
 * 保留最后一次的请求
 * @param {string} url 
 */
function handleReqLast(type, api, params, data){
    const u = type + '&' + api.url
    console.log(d[u], 'd[u]')
    if(d[u]){
        d[u].cancelRequest()
    }

    d[u] = new Req(type, api, params, data);

    return d[u].promise;
}

/**
 * 保留第一次的请求
 * @param {string} url 
 */
function handleReq(type, api, params, data){
    const u = type + '&' + api.url
    if(d[u]&&api.abort){
        return Promise.reject("太忙了, 只允许一个请求");
    }

    d[u] = new Req(type, api, params, data);

    return d[u].promise;
}


function formatConfig(api){

    return {}
}
function parseUrl(url,params){

    let computed = url.replace(/\$\{(\w+)\}/g,function (match,key) {
        return params[key]
    })
    return computed
}
class Methods{
    constructor(moduleApi){
        this.moduleApi = moduleApi
    }
    get(apiKey,params){
        const api = this.moduleApi[apiKey]
        return handleReqLast('get', api, params)
        // return api.abort==='after'?handleReqLast('get', api, params):handleReq('get', api, params)
    }
    post(apiKey,params,data){

    }
    put(apiKey,params,data){

    }
    delete(apiKey,params){

    }
}
export default Methods
// export {
//     axios
// }
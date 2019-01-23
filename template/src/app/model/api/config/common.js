
const isLocal = process.env.VUE_ENV==='client'
const base = {
    root: "",
    user_info_get: {
      url: "user/info?id=${id}"
    }
  };
const mock =  isLocal? {
    user_info_get: 'https://beta.dui.ai/console/api/v1.0/friendlyLink/list'
} : {}

Object.keys(mock).forEach( key => {
    if(base[key]){
        base[key].url = mock[key]
    }
} )

export default base

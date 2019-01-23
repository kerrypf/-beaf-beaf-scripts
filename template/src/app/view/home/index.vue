<template>
    <div>
        <span @click="getUser">test Axios</span>
    </div>
</template>
<script>
import service from '../../service'
export default {
    data(){
        return {

        }
    },
    methods: {
        getUser(){
            service.common.get('user_info_get',{
                id:1231
            })
        }
    },
}
</script>
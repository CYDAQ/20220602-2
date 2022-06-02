<script>
    import { defineComponent } from 'vue';
    import Qs from 'qs'
    export default defineComponent({
        setup() {
            const axios = require('axios');
            axios.defaults.baseURL = 'http://192.168.2.7:8093';//测试环境
            // axios.defaults.baseURL = 'http://planapi.shoumi310.com';//正式环境
            const token = localStorage.getItem("User_Token")
            const onput = (data) => {
                return new Promise((resolve) => {
                    axios({
                        headers: {
                            "Content-Type": "application/json;",
                            token: token
                        },
                        method: 'put',
                        url: '/member?password=' + data.data.password + '&old=' + data.data.old,
                    }).then(function (response) {
                        if (response.data.code == 0) {
                            localStorage.removeItem("User_Token");
                            return resolve(response.data)
                        } else if (response.data.code == -1) {
                            localStorage.removeItem("User_Token");
                            return resolve(response.data)
                        } else {
                            return resolve(response.data)
                        }
                    })
                        .catch(function (error) {
                            return error
                        });
                })
            }
            const onget = (data) => {
                return new Promise((resolve) => {
                    axios({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            token: token
                        },
                        method: 'get',
                        url: data.url,
                        data: data.data
                    }).then(function (response) {
                        return resolve(response)
                    })
                        .catch(function (error) {
                            return error
                        });
                })
            }
            const onpost = (data) => {
                return new Promise((resolve) => {
                    axios({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            token: token
                        },
                        method: 'post',
                        url: data.url,
                        data:Qs.stringify(data.data)
                    }).then(function (response) {
                        return resolve(response)
                    })
                        .catch(function (error) {
                            return error
                        });
                })
            }
            const onlogin = (data) => {
                return new Promise((resolve) => {
                    axios({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        method: 'post',
                        url: '/auth/username',
                        data: Qs.stringify(data)
                    }).then(function (response) {
                        if (response.data.code == 0) {
                            localStorage.setItem("User_Token", response.data.data)
                            return resolve(0)
                        } else {
                            return resolve(response.data)
                        }
                    })
                        .catch(function (error) {
                            console.log(error);
                            return error
                        });
                })
            }

            return {
                onpost,
                onget,
                onlogin,
                onput
            }
        }
    })
</script>
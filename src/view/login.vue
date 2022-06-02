<template>
    <pageNavs :title="title"></pageNavs>
    <div class="Popover" v-if="Popover">
        登录成功
    </div>
    <Popover :Visiable="Visiable"></Popover>
    <div class="container login">
        <div class="d-flex">
            <div class="col-9 ">
                <form target="iframe" autocomplete="off">
                    <div class="form-group flex-row">
                        <label for="exampleInputEmail1 ">账号:</label>
                        <input type="email " class="form-control flex-1" autocomplete="off" id="exampleInputEmail1"
                            v-model="data.username" aria-describedby="emailHelp">
                    </div>
                    <div class="form-group flex-row">
                        <label for="exampleInputPassword">密码:</label>
                        <input type="password" class="form-control flex-1" autocomplete="off" id="exampleInputPassword1"
                            v-model="data.password">
                    </div>
                    <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="exampleCheck">
                        <label class="form-check-label" for="exampleCheck1">同意《增值服务条款》</label>
                    </div>
                    <div v-if="Warning!==''">
                        <h4 style="color: rgb(255, 0, 0);">
                            {{Warning}}
                        </h4>
                    </div>
                    <button type="submit" class=" btn-primary" @click="handleClick">登录</button>
                </form>
                <iframe id="iframe" name="iframe" style="display:none;"></iframe>
            </div>
        </div>
    </div>
    <Request ref="login"></Request>
</template>
<script>
    import pageNavs from './pageNavs'
    import Request from '../components/Request.vue'
    import { useRouter } from "vue-router";
    import { defineComponent, ref } from 'vue';
    import Popover from './Popover'
    export default defineComponent({
        components: { pageNavs, Request, Popover },
        setup() {
            const title = "登录"
            const data = {
                username: '',
                password: ''
            }
            const Visiable=ref('')
            const Popover = ref(false)
            const Warning = ref('')
            const exampleCheck = ref(false)
            const login = ref(null);
            const router = useRouter();
            const handleClick = () => {
                if (exampleCheck.value) {
                    Warning.value = ''
                    new Promise((resolve) => {
                        return resolve(login.value.onlogin(data))
                    }).then(res => {
                        if (res == 0) {
                            Popover.value = true
                            setTimeout(function () {
                                Popover.value = false
                                router.push("/index");
                            }, 500)
                        } else {
                            Warning.value = '账号或密码错误!'
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    Warning.value = '请同意条款!'
                }
            }
            return {
                title,
                data,
                handleClick,
                login,
                exampleCheck,
                Warning,
                Popover,
                Visiable
            }
        }
    })
</script>
<style scoped>
    @import "../style/style.css";


    .d-flex {
        padding: 20px;
    }

    .form-control {
        height: 40px;
        border-radius: 50px;
        background-color: rgb(255, 255, 255);
        border: 1px solid rgb(214, 214, 214);
    }

    .form-group {
        margin: 20px 0;
        align-items: center
    }

    label {
        margin: 0 10px;
    }

    .form-check {
        margin-left: 20px;
    }

    .btn-primary {
        height: 45px;
        width: 100%;
        border-radius: 25px;
        border: 0px;
        background-color: #3cb371;
        color: #fff;
        font-size: 1.1rem;
    }

    .Popover {
        text-align: center;
        position: fixed;
        left: 50%;
        top: 200px;
        width: 150px;
        margin-left: -95px;
        padding: 20px;
        background-color: rgb(255, 255, 255);
        border-radius: 15px;
        z-index: 9999;
        box-shadow: 1px 1px 10px rgba(190, 190, 190, 0.4);
    }
</style>
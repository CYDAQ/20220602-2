<template>
    <pageNavs :title="title" :url='url'></pageNavs>
    <div class="Popover" v-if="Popover">
        {{text}}
    </div>
    <div class="container login">
        <div class="d-flex">
            <form target="iframe" autocomplete="off">
                <div class="form-group flex-row">
                    <label for="exampleInputPassword">旧密码:</label>
                    <input type="password" v-model="data.data.old" autocomplete="off" name="oldpassword"
                        placeholder="请输入旧密码" class="form-control flex-1" id="exampleInputPassword1">
                </div>
                <div class="form-group flex-row">
                    <label for="exampleInputPassword">新密码:</label>
                    <input type="password" v-model="data.data.password" name="newpassword" placeholder="请输入新密码"
                        autocomplete="off" class="form-control flex-1" id="exampleInputPassword1">
                </div>
                <div class="form-group flex-row">
                    <label for="exampleInputPassword">重新输入:</label>
                    <input type="password" v-model="newpassword2" class="form-control flex-1" placeholder="请重新输入新密码"
                        autocomplete="off" id="exampleInputPassword1">
                </div>

                <button type="submit" class=" btn-primary" @click="handleClick">修改密码</button>
            </form>
            <iframe id="iframe" name="iframe" style="display:none;"></iframe>
        </div>
    </div>
    <Request ref="Visit"></Request>
</template>
<script>
    import pageNavs from './pageNavs'
    import { useRouter } from "vue-router";
    import { defineComponent, ref } from 'vue';
    import Request from '../components/Request.vue'
    export default defineComponent({
        components: { pageNavs, Request },
        setup() {
            const title = "修改密码"
            const url='/Individual'
            const Visit = ref(null)
            const router = useRouter();
            const Popover = ref(false)
            const text = ref('')
            const data = {
                data: {
                    old: '',
                    password: '',
                },
                url: '/member'
            }
            const newpassword2 = ref('')
            const setTime = (eve, key) => {
                text.value = eve
                Popover.value = true
                if (key) {
                    setTimeout(function () {
                        Popover.value = false
                    }, 500)
                } else {
                    setTimeout(function () {
                        Popover.value = false
                        router.push("/login");
                    }, 500)
                }

            }
            const handleClick = () => {
                if (newpassword2.value == '' || data.data.old == '' || data.data.password == '') {
                    setTime("密码不能为空", true)
                    return
                }
                if (newpassword2.value.indexOf(data.data.password) == -1) {
                    setTime("两次输入不一致", true)
                }
                new Promise((resolve) => {
                    return resolve(Visit.value.onput(data))
                }).then((res) => {
                    switch (res.code) {
                        case 0:
                            text.value = "密码修改成功"
                            Popover.value = true
                            setTimeout(function () {
                                Popover.value = false
                                router.push("/login");
                            }, 500)
                            break;
                        case 1:
                            text.value = "登录状态过期，请重新登录"
                            Popover.value = true
                            setTimeout(function () {
                                Popover.value = false
                                router.push("/login");
                            }, 500)
                            break;
                        default:
                            text.value = "旧密码错误!"
                            Popover.value = true
                            data.value = res
                            setTimeout(function () {
                                Popover.value = false
                            }, 500)
                            break;
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
            return {
                title,
                data,
                handleClick,
                Visit,
                newpassword2,
                text,
                Popover,
                url
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
        border: 1px solid #3cb371;
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
        box-shadow: 1px 1px 10px rgba(190, 190, 190, 0.4);
    }

    .btn-primary:active {
        background-color: #1a8349;
        transform: scale(0.98);
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
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
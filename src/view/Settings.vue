<template>
    <pageNavs :title="title"></pageNavs>
    <div style="padding: 20px;">
        <table class="table">
            <tbody class="align">
                <tr @click="Jump('/Modify')">
                    <td>修改密码</td>
                    <td class="" style="text-align: end;font-size: 0.9rem; color: #d8d8d8;">
                        未设置
                        <svg t="1645429065415" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2038" width="16" height="16">
                            <path
                                d="M761.055557 532.128047c0.512619-0.992555 1.343475-1.823411 1.792447-2.848649 8.800538-18.304636 5.919204-40.703346-9.664077-55.424808L399.935923 139.743798c-19.264507-18.208305-49.631179-17.344765-67.872168 1.888778-18.208305 19.264507-17.375729 49.631179 1.888778 67.872168l316.960409 299.839269L335.199677 813.631716c-19.071845 18.399247-19.648112 48.767639-1.247144 67.872168 9.407768 9.791372 21.984142 14.688778 34.560516 14.688778 12.000108 0 24.000215-4.479398 33.311652-13.439914l350.048434-337.375729c0.672598-0.672598 0.927187-1.599785 1.599785-2.303346 0.512619-0.479935 1.056202-0.832576 1.567101-1.343475C757.759656 538.879828 759.199462 535.391265 761.055557 532.128047z"
                                p-id="2039" fill="#2c2c2c"></path>
                        </svg>
                    </td>
                </tr>
                <tr class="align">
                    <td>昵称</td>
                    <td class="flex-row flex-end" style="text-align: end;font-size: 0.9rem; color: #d8d8d8;">
                        <div>
                            未设置
                        </div>
                        <svg t="1645429065415" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2038" width="1rem" height="1rem">
                            <path
                                d="M761.055557 532.128047c0.512619-0.992555 1.343475-1.823411 1.792447-2.848649 8.800538-18.304636 5.919204-40.703346-9.664077-55.424808L399.935923 139.743798c-19.264507-18.208305-49.631179-17.344765-67.872168 1.888778-18.208305 19.264507-17.375729 49.631179 1.888778 67.872168l316.960409 299.839269L335.199677 813.631716c-19.071845 18.399247-19.648112 48.767639-1.247144 67.872168 9.407768 9.791372 21.984142 14.688778 34.560516 14.688778 12.000108 0 24.000215-4.479398 33.311652-13.439914l350.048434-337.375729c0.672598-0.672598 0.927187-1.599785 1.599785-2.303346 0.512619-0.479935 1.056202-0.832576 1.567101-1.343475C757.759656 538.879828 759.199462 535.391265 761.055557 532.128047z"
                                p-id="2039" fill="#2c2c2c"></path>
                        </svg>
                    </td>
                </tr>
                <tr>
                    <td>头像</td>
                    <td class="" style="text-align: end;font-size: 0.9rem; color: #d8d8d8;">
                        未设置
                        <svg t="1645429065415" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2038" width="16" height="16">
                            <path
                                d="M761.055557 532.128047c0.512619-0.992555 1.343475-1.823411 1.792447-2.848649 8.800538-18.304636 5.919204-40.703346-9.664077-55.424808L399.935923 139.743798c-19.264507-18.208305-49.631179-17.344765-67.872168 1.888778-18.208305 19.264507-17.375729 49.631179 1.888778 67.872168l316.960409 299.839269L335.199677 813.631716c-19.071845 18.399247-19.648112 48.767639-1.247144 67.872168 9.407768 9.791372 21.984142 14.688778 34.560516 14.688778 12.000108 0 24.000215-4.479398 33.311652-13.439914l350.048434-337.375729c0.672598-0.672598 0.927187-1.599785 1.599785-2.303346 0.512619-0.479935 1.056202-0.832576 1.567101-1.343475C757.759656 538.879828 759.199462 535.391265 761.055557 532.128047z"
                                p-id="2039" fill="#2c2c2c"></path>
                        </svg>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <div class="container" style="width: 100%;">
                <div>
                    <button type="button" class="btn-primary" @click="Quit" style="width: 100%;">退出登录</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import pageNavs from './pageNavs'
    import { useRouter } from "vue-router";

    export default {
        components: { pageNavs },

        setup() {
            const router = useRouter();
            const title = "设置";
            const model_data = [

            ]
            const Quit = () => {
                localStorage.removeItem("User_Token");
                router.push({
                    path: '/login',
                    query: {
                    },
                });
            }
            return {
                title,
                model_data,
                Quit,
                router
            }
        },
        methods: {
            Jump(path) {
                this.$router.push(path)
            },
        }
    }
</script>
<style scoped>
    @import "../style/style.css";

    .icon {
        float: right;
    }

    table {
        width: 100%;
    }

    tr {
        padding: 20px;
        display: flex;
        flex-flow: row;
        border-bottom: 0.7px solid rgba(0, 0, 0, 0.096);
    }

    td {
        flex-grow: 1;
    }

    .btn-primary {
        height: 45px;
        width: 100%;
        border-radius: 25px;
        border: 0px;
        background-color: #3cb371;
        color: #fff;
        font-size: 1.1rem;
        margin-top: 20px;
    }

    .btn-primary:hover {
        background-color: #1d814aa2;
    }
</style>
<template>
    <nav class="navbar navbar-light bg-light">
        <div class="container-fluid flex-row flex-1">
            <a href="#" class="Return" v-if="Return" @click="Jump(url)" >
                <svg t="1645512745444" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2039" width="24" height="24">
                    <path
                        d="M729.6 931.2l-416-425.6 416-416c9.6-9.6 9.6-25.6 0-35.2-9.6-9.6-25.6-9.6-35.2 0l-432 435.2c-9.6 9.6-9.6 25.6 0 35.2l432 441.6c9.6 9.6 25.6 9.6 35.2 0C739.2 956.8 739.2 940.8 729.6 931.2z"
                        p-id="2040"></path>
                </svg>
            </a>
            <a href="JavaScript:history.go(-1)" class="Return" v-else>
                <svg t="1645512745444" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2039" width="24" height="24">
                    <path
                        d="M729.6 931.2l-416-425.6 416-416c9.6-9.6 9.6-25.6 0-35.2-9.6-9.6-25.6-9.6-35.2 0l-432 435.2c-9.6 9.6-9.6 25.6 0 35.2l432 441.6c9.6 9.6 25.6 9.6 35.2 0C739.2 956.8 739.2 940.8 729.6 931.2z"
                        p-id="2040"></path>
                </svg>
            </a>
            <div class="flex-1 text">
                <h5 style="padding-right: 68px;">{{title}}</h5>
            </div>
        </div>
    </nav>
    <div style="height: 64px;"></div>
</template>
<script>
    import { useRouter } from "vue-router";
    import {  ref } from 'vue';
    export default {
        props: {
            title: String,
            url: String,
            route: String,
        },
        setup(props) {
            const Return=ref(false)
            // if (props.url) {
            //     Return.value=true
            // }
            const router = useRouter();
            const Jump = (path) => {
                router.push({
                    path: path,
                });
                if (props.route=='model') {
                    router.push({
                    path: '/model/'+path,
                    query: {
                        route: props.url,
                    },
                });
                }
            }
            return {
                Jump,
                Return
            }

        }
    }
</script>
<style>
    @import "../style/style.css";

    .nav {
        width: 100%;
        height: 40px;
        border-bottom: 0.5px solid rgb(224, 224, 224);
    }

    .center {
        font-size: 0.8rem !important;
    }

    .login-button {
        width: 40px;
        height: 100%;
        border-width: 0px;
        border-radius: 5px;
        background: #fff;
        font-size: 17px;
        margin: 0px 0 0 10px;
        padding: 0;
    }

    .Return {
        padding:18px 20px;
    }
    .navbar {
        box-shadow: 1px 1px 10px rgba(221, 221, 221, 0.4); 
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        background-color: rgb(255, 255, 255);
        z-index: 99;
    }
</style>
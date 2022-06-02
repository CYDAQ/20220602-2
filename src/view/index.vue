<template>
    <div class="Popover" v-if="Popover">
        {{data.data}}
    </div>
    <header>
        <div class="header_text">
            非购彩平台，如需购彩请前往线下彩票店
        </div>
        <div class="header_img">
            <div class="wrap " :style="{left: Rotation+'px'}">
                <template v-for="(item,key) in imgdate" :key="key">
                    <img class="flex-1" :src="item" alt="">
                </template>
            </div>
        </div>
    </header>
    <div class="index flex-column">
        <div class="flex-1">
            <h3>智能模型</h3>
        </div>
        <div>
            <template v-for="(item,key) in indexdata" :key="key">
                <div class="flex-column model" :style="color[key].styleObject" @click="Jump(item.modelValue)">
                    <div class="flex-row">
                        <div class="flex-1">
                            <img v-bind:src="color[key].Authentication" alt="" srcset="" class="Authentication">
                        </div>
                        <div class="flex-1 text txt_m">{{item.modelName}}</div>
                        <div class="flex-reverse flex-1 sm txt_m">{{item.followCount}}订阅</div>
                    </div>
                    <div class="flex-row">
                        <div class="flex-1 flex-end text">
                            <div class="red ">
                                {{item.profitAmount}}
                            </div>
                            <div class="slategray">
                                近期盈利金额
                            </div>
                        </div>
                        <div class="flex-1 flex-end text">
                            <div class="red ">
                                {{item.winCount}}
                            </div>
                            <div class="slategray">
                                近期盈利次数
                            </div>
                        </div>
                        <div class="">
                            <svg t="1645672436555" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="5192" width="12" height="12">
                                <path
                                    d="M274.432 879.71c-19.328 18.973-19.328 51.516 0 71.237 20.038 20.038 51.83 20.038 71.555 0l403.604-402.973c19.328-20.038 19.328-52.225 0-71.869l-403.605-403.289c-19.723-19.722-51.516-19.722-71.555 0-19.328 20.038-19.328 51.516 0 71.554l367.827 367.157-367.827 368.183z"
                                    p-id="5193" fill="#8a8a8a"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>

    <Request ref="Visit"></Request>
    <footers :footerdata="house"></footers>
</template>
<script>
    import { toRefs, reactive } from 'vue';
    import Request from '../components/Request.vue'
    import { useRouter } from "vue-router";
    import { defineComponent, ref } from 'vue';
    import footers from "./Footers"
    export default defineComponent({
        components: {
            footers,
            Request
        },

        setup() {
            const house = 'house'
            const router = useRouter();
            const Visit = ref();
            const data = {
                url: '/home/model',
                data: {
                },
            }
            const indexdata = ref({})
            const Popover = ref(false)
            const state = reactive({
                Rotation: 0,
                img: 0,
                imgdate: [
                    require("../style/img/2.jpg"),
                    require("../style/img/3.jpg"),
                ]
            })
            const handleClick = () => {
                new Promise((resolve) => {
                    return resolve(Visit.value.onget(data))
                }).then((res) => {
                    switch (res.data.code) {
                        case 0:
                            indexdata.value = res.data.data
                            numderparse(indexdata.value)
                            break;
                        case 1:
                            indexdata.value = res.data.data
                            Popover.value = true
                            setTimeout(function () {
                                Popover.value = false
                                router.push("/login");
                            }, 500)
                            break;
                        default:
                            indexdata.value = res.data.data
                            router.push("/login");
                            break;
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }

            const imgtimes = () => {
                if (state.img < state.imgdate.length - 1) {
                    state.img = state.img + 1;
                    state.Rotation = state.img * -384
                } else {
                    state.Rotation = 0
                    state.img = 0
                }
            }
            const color = [
                {
                    Authentication: require('../style/img/实力.png'),
                    styleObject: {
                        "background-image": " linear-gradient(to right, #edf8ff , #fff)"
                    }
                }, {
                    Authentication: require('../style/img/命中率.png'),
                    styleObject: {
                        "background-image": " linear-gradient(to right, #fff2f2 , #fff)"
                    }
                }, {
                    Authentication: require('../style/img/受欢迎.png'),
                    styleObject: {
                        "background-image": " linear-gradient(to right, #f3fff9 , #fff)"
                    }
                }, {
                    Authentication: require('../style/img/精选.png'),
                    styleObject: {
                        "background-image": " linear-gradient(to right, #f8effb , #fff)"
                    }
                }
            ]
            const numderparse = (eve) => {//将小数点后的0缩短至2位
                for (let index in eve) {
                    let defaultPrize = eve[index].profitAmount.toFixed(2)
                    eve[index].profitAmount = parseFloat(defaultPrize);
                }
            }
            const Jump = (path) => {
                router.push({
                    path: '/model/' + path,
                    query: {
                        route: path,
                    },
                });
            }
            const Times = setInterval(imgtimes, 5000)
            return {
                ...toRefs(state),
                house,
                Times,
                Visit,
                handleClick,
                router,
                Popover,
                color,
                indexdata,
                Jump

            }
        },
        mounted() {
            this.$nextTick(function () {
                this.handleClick(this.data)
            })
        },
        methods: {

        }
    })
</script>
<style lang="less" scoped>
    @import "../style/style.css";

    .header_text {
        background-color: #fffcf1;
        font-weight: 700;
        color: #d89b1e;
        margin: 0;
        text-align: center;
        font-size: 0.7rem;
        padding: 8px;
    }

    .header_img {
        width: 90%;
        height: 10rem;
        background-color: darkgray;
        background-size: 100% 100%;
        margin: 10px auto 0;
        border-radius: 25px;
        overflow: hidden;
    }

    .index {
        width: 90%;
        margin: 0px auto;
    }

    .model {
        width: 95%;
        padding: 11px;
        padding-top: 0;
        border-radius: 15px;
        box-shadow: 1px 1px 10px rgba(190, 190, 190, 0.4);
        margin-bottom: 20px;
    }

    .sm {
        font-size: 0.7rem;
        color: #a8a8a8;
        margin-right: 3px;
    }

    .red {
        color: crimson;
        font-size: 1.5rem;
    }

    .slategray {
        color: slategray;
    }

    .txt_m {
        margin-top: 10px;
    }

    .lefticon {
        box-shadow: 1px 1px 5px rgb(77, 77, 77);
    }

    .wrap {
        width: 2000px;
        height: 10rem;
        perspective: 200px;
        transition: all 1s ease 0s;
        position: relative;
    }

    .wrap img {
        border-radius: 15px;
        width: 24rem;
        height: 10rem;
        opacity: 1;
        float: left;
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
    .Authentication{
        width: 30px;
        height: 50px;
    }
</style>
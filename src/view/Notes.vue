<template>
    <pageNavs :title="title"></pageNavs>
    <div class="notes">
        <div class="container" ref="container">
            <div class="flex-row  ">
                <div class="flex-1 center" :class="{notesborder:notesborder[0]}" @click="Switching(0)">全部</div>
                <div class="flex-1 center" :class="{notesborder:notesborder[1]}" @click="Switching(1)">未结束</div>
                <div class="flex-1 center" :class="{notesborder:notesborder[2]}" @click="Switching(2)">已结束</div>
            </div>
        </div>
        <Set :scrollHeight="containersnum" :loading="loading_Scroll" :Stop="Stop" ref="scroll" @scroll="onScroll">
            <template v-for="(itme,key) in notes_data" :key="key">
                <div class=" card_m" @click="Jump('/Detailed',itme)" ref="target">
                    <div class="card">
                        <div class=" jumbotron-fluid">
                            <div class="flex-row flex-1">
                                <div class="flex-row time">编号:
                                    <div class=""> {{itme.projectId }}</div>
                                </div>
                                <div class="time ">{{itme.followTime}}</div>
                            </div>
                            <div class="flex-row rowmodel">
                                <div class="flex-1 model">
                                    <div class="font-s font">{{itme.status}}</div>
                                    模型状态
                                </div>
                                <div class="flex-1 model">
                                    <div class="font font-s" v-if="itme.Situation=='——'">
                                        <div style="color: rgb(0, 0, 0);">{{itme.Situation}}</div>
                                    </div>
                                    <div class="font font-s" style="color: rgb(230, 0, 0);" v-else>
                                        {{itme.profit}}
                                    </div>
                                    盈利情况
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </Set>
    </div>

    <footers :footerdata="folder"></footers>
    <Request ref="Visit"></Request>
    <Prompt :Prompt="Popover" :Visiable="text"></Prompt>
</template>
<script>
    import pageNavs from './pageNavs'
    import Prompt from './Popover'
    import footers from "./Footers"
    import Set from "./Set"
    import { defineComponent, ref } from 'vue';
    import { useRouter } from "vue-router";
    import Request from '../components/Request.vue'

    export default defineComponent({
        components: {
            pageNavs,
            footers,
            Request,
            Prompt,
            Set
        },
        setup() {
            const title = "我的计划";
            const folder = "folder";
            const router = useRouter();
            const Visit = ref(null)
            const Popover = ref(false)
            const text = ref('')
            const target = ref(null)
            const Set = ref(null)
            const container = ref(null)
            const containersnum = ref(null)
            const scroll = ref(null)
            const Stop = ref(false)
            const notesborder = ref([
                true, false, false
            ])
            const Query = {
                page: 1,
                pageSize: 10,
                statusVal: ''
            }
            const notes_data = ref([])
            const loading_Scroll = ref(false);
            const Prepare = () => {
                const Parameters = {
                    url: '/member/notes?page=' + Query.page + '&pageSize=' + Query.pageSize + '&statusVal=' + Query.statusVal,
                    date: {
                    }
                }
                loading_Scroll.value = true;
                Popover.value = true
                text.value = '加载中...'
                new Promise((resolve) => {
                    return resolve(Visit.value.onget(Parameters))
                }).then((res) => {
                    loading_Scroll.value = false;
                    Popover.value = false
                    if (res.data.code) {
                        text.value = res.data.data
                        Popover.value = true
                        setTimeout(function () {
                            Popover.value = false
                            localStorage.removeItem("User_Token");
                            router.push("/login");
                        }, 1000)
                    } else {
                        if (res.data.total < 11) {
                            Stop.value = true
                            loading_Scroll.value = false
                        }
                        if (Math.ceil(res.data.total / 10) >= Query.page) {
                            notes_data.value = notes_data.value.concat(res.data.rows)
                        }else{
                            Stop.value = true
                            loading_Scroll.value = false
                        }
                    }
                }).catch((err) => {
                    Popover.value = false
                    console.log(err);
                })
            }
            const Height = (eve) => {
                let innerHeight = eve + 'px'
                return {
                    "height": innerHeight
                }
            }
            const Jump = (path, id) => {
                router.push({
                    path: path,
                    query: {
                        id: id.projectId,
                    },
                });
            }
            const onScroll = () => {
                let Bool = scroll.value.onScroll()
                if (Bool && !loading_Scroll.value) {
                    Query.page += 1
                    Prepare()
                }
            }
            const clear=()=>{
                Query.page = 1
                Stop.value = false
                notes_data.value =[]
            }
            const Switching = (eve) => {
                if (eve == 0) {
                    Query.statusVal = ''
                    notesborder.value = [true, false, false]
                } else if (eve == 1) {
                    Query.statusVal = 0
                    notesborder.value = [false, true, false]
                } else {
                    Query.statusVal = 1
                    notesborder.value = [false, false, true]
                }
                clear()
                Prepare()
            }

            return {
                Switching,
                title,
                notes_data,
                folder,
                Prepare,
                Visit,
                text,
                Popover,
                Jump,
                target,
                onScroll,
                Set,
                Height,
                container,
                containersnum,
                scroll,
                loading_Scroll,
                Stop,
                notesborder
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.Prepare()
                this.containersnum = window.innerHeight - 128 - this.$refs.container.offsetHeight;
            })
        },
        methods: {
        }
    })
</script>
<style scoped>
    @import "../style/style.css";

    .login {
        margin-top: 20px;
    }

    .notesborder {
        border-bottom: 2px solid #3cb371;
    }

    .card_m {
        margin: 10px 0;
    }

    .notes .row .col {
        margin-top: 10px;
        padding-bottom: 10px;
    }

    .center {
        margin: 0px 10px;
        padding: 10px 0;
    }

    .container {
        box-shadow: 3px 3px 10px rgba(223, 223, 223, 0.308);
    }

    .card_m {
        background-image:linear-gradient(to right, #3cb37264 , #ffffff);
        padding: 10px;
        border-radius: 15px;
        margin-bottom: 10px;
        box-shadow: 3px 3px 5px rgba(114, 114, 114, 0.308);
        margin: 10px 20px;
        background-image: url('../style/img/background.jpg') ;
    }

    .time {
        font-size: 0.85rem;
        color: #fff;
    }

    .rowmodel {
        text-align: center;
        justify-content: flex-end;

    }

    .rowmodel .model {
        margin: 20px 10px;
        width: 40%;
        color: #fff;
        font-size: 1.1rem;
    }

    .rowmodel .model div {
        margin-bottom: 8px;
    }

    .font-s {
        color: #fff;
        font-size: 1.1em;
        font-weight: 700;
    }

    .box {
        height: 100%;
        line-height: 30px;
        text-align: center;
        overflow-y: scroll
    }
</style>
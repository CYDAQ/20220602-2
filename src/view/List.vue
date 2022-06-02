<template>
    <pageNavs :title="title"></pageNavs>
    <div class=" modeltable">
        <table class="table table-bordered flex-1 flex-column">
            <thead ref="container">
                <tr>
                    <th class="weight">计划编号</th>
                    <td class="weight">进展</td>
                    <td class="weight">状态</td>
                </tr>
            </thead>
            <tbody>
                <Set :scrollHeight="containersnum" :loading="loading_Scroll" :Stop="Stop" ref="scroll"
                    @scroll="onScroll">
                    <template v-for="(item,key) in list_data" :key="key">
                        <div @click="Jump('/Plan/',item.projectId)">
                            <tr class="Ongoing" v-if="item.status=='进行中'">
                                <th scope="row"> {{item.projectId}}</th>
                                <td>{{item.progress}}</td>
                                <td>进行中
                                    <svg t="1645672436555" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="5192" width="18" height="18">
                                        <path
                                            d="M274.432 879.71c-19.328 18.973-19.328 51.516 0 71.237 20.038 20.038 51.83 20.038 71.555 0l403.604-402.973c19.328-20.038 19.328-52.225 0-71.869l-403.605-403.289c-19.723-19.722-51.516-19.722-71.555 0-19.328 20.038-19.328 51.516 0 71.554l367.827 367.157-367.827 368.183z"
                                            p-id="5193" fill="#8a8a8a"></path>
                                    </svg>
                                </td>

                            </tr>
                            <tr class="Lose" v-else-if="item.status=='未中奖'">
                                <th scope="row"> {{item.projectId}}</th>
                                <td>{{item.progress}}</td>
                                <td>未中奖
                                    <svg t="1645672436555" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="5192" width="18" height="18">
                                        <path
                                            d="M274.432 879.71c-19.328 18.973-19.328 51.516 0 71.237 20.038 20.038 51.83 20.038 71.555 0l403.604-402.973c19.328-20.038 19.328-52.225 0-71.869l-403.605-403.289c-19.723-19.722-51.516-19.722-71.555 0-19.328 20.038-19.328 51.516 0 71.554l367.827 367.157-367.827 368.183z"
                                            p-id="5193" fill="#8a8a8a"></path>
                                    </svg>
                                </td>
                            </tr>
                            <tr class="Get" v-else-if="item.status=='已中奖'">
                                <th scope="row"> {{item.projectId}}</th>
                                <td>{{item.progress}}</td>
                                <td>已中奖
                                    <svg t="1645672436555" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="5192" width="18" height="18">
                                        <path
                                            d="M274.432 879.71c-19.328 18.973-19.328 51.516 0 71.237 20.038 20.038 51.83 20.038 71.555 0l403.604-402.973c19.328-20.038 19.328-52.225 0-71.869l-403.605-403.289c-19.723-19.722-51.516-19.722-71.555 0-19.328 20.038-19.328 51.516 0 71.554l367.827 367.157-367.827 368.183z"
                                            p-id="5193" fill="#8a8a8a"></path>
                                    </svg>
                                </td>
                            </tr>
                            <tr v-else>
                                <th scope="row">{{item.projectId}}</th>
                                <td>{{item.progress}}</td>
                                <td>{{item.status}}
                                    <svg t="1645672436555" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="5192" width="18" height="18">
                                        <path
                                            d="M274.432 879.71c-19.328 18.973-19.328 51.516 0 71.237 20.038 20.038 51.83 20.038 71.555 0l403.604-402.973c19.328-20.038 19.328-52.225 0-71.869l-403.605-403.289c-19.723-19.722-51.516-19.722-71.555 0-19.328 20.038-19.328 51.516 0 71.554l367.827 367.157-367.827 368.183z"
                                            p-id="5193" fill="#8a8a8a"></path>
                                    </svg>
                                </td>
                            </tr>
                        </div>
                    </template>
                </Set>
            </tbody>
        </table>
    </div>
    <Prompt :Prompt="Popover" :Visiable="text"></Prompt>
    <Request ref="Visit"></Request>
</template>
<script>
    import { defineComponent, ref, toRefs, reactive } from 'vue';
    import { useRoute } from "vue-router";
    import { useRouter } from "vue-router";
    import Set from "./Set"
    import Request from '../components/Request'
    import Prompt from './Popover'
    import pageNavs from './pageNavs'
    export default defineComponent({
        props: {
            List: String
        },
        components: {
            pageNavs,
            Request,
            Set,
            Prompt

        },
        setup() {
            const router = useRouter();
            const argument = useRoute().query.route;
            const Popover = ref(null)
            const Visit = ref(null)
            const text = ref('')
            const loading_Scroll = ref(false);
            const Stop = ref(false)
            const scroll = ref(null)
            const container = ref(null)
            const containersnum = ref(null)
            const Query = {
                page: 1,
                pageSize: 10,
                statusVal: ''
            }
            const state = reactive({
                title: '计划列表',
                list_data: [],
                text: '',
            
            })
            const Prepare = () => {
                const Parameters = {
                    url: '/project/football/'+argument+'?page=' + Query.page + '&pageSize=' + Query.pageSize,
                    date: {
                    }
                }
                loading_Scroll.value = true;
                Popover.value = true
                text.value = '加载中...'
                loading_Scroll.value = true;
                new Promise((resolve) => {
                    return resolve(Visit.value.onget(Parameters))
                }).then((res) => {
                    loading_Scroll.value = false;
                    Popover.value = false
                    if (res.data.code) {
                        state.text = res.data.data
                        Popover.value = true
                        setTimeout(function () {
                            Popover.value = false
                            // localStorage.removeItem("User_Token");
                            // router.push("/login");
                        }, 1000)
                    } else {
                        if (res.data.total < 11) {
                            Stop.value = true
                            loading_Scroll.value = false
                        }
                        if (Math.ceil(res.data.total / 10) >= Query.page) {
                            state.list_data = state.list_data.concat(res.data.rows)
                        }else{
                            Stop.value = true
                            loading_Scroll.value = false
                        }
                    }

                }).catch((err) => {
                    console.log(err);
                })
            }
            const Jump = (path,id) => {
                console.log(id);
                router.push({
                    path: path+id,
                    query: {
                        id: id,
                        route: argument
                    },
                });
            }
            const onScroll = () => {
                let Bool = scroll.value.onScroll()
                if (Bool && !loading_Scroll.value) {
                    Query.page += 1
                    console.log('ok');
                    Prepare()
                }
            }
            return {
                ...toRefs(state),
                Prepare,
                Jump,
                Visit,
                onScroll,
                Popover,
                text,
                containersnum,
                container
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.Prepare()
                this.containersnum = window.innerHeight - 128 - this.$refs.container.offsetHeight;
            })
        },
    })
</script>
<style scoped>
    @import "../style/style.css";

    tr {
        display: flex;
        flex-flow: row;
        padding: 15px 0;
        border-bottom: 0.75px solid rgb(228, 228, 228);
        margin: 0 15px;
    }

    th,
    td {
        width: 33%;
        font-size: 1rem;
        align-items: center
    }

    th {
        text-align: inherit;
    }

    thead tr {
        border-top: 0.75px solid rgb(228, 228, 228);
    }

    .weight {
        font-weight: 700;

    }

    .Lose {
        background-image: linear-gradient(to right, #fff, #e4e4e4)
    }

    .Get {
        background-image: linear-gradient(to right, #fff, #ffbcbc)
    }

    .container {
        padding: 0 20px
    }

    .card {
        background-color: #3cb372;
        padding: 10px;
        border-radius: 15px;
        margin-bottom: 10px;
        color: rgb(255, 255, 255);
        text-shadow: 1px 1px 2px rgb(117, 117, 117);
        box-shadow: 3px 3px 10px rgba(114, 114, 114, 0.308);

    }

    .sm {
        font-size: 0.7rem;
    }

    .after {
        content: '';
        height: 20px;
        display: block;
    }

    .icon {
        float: right;
    }

    .Moreplans {
        padding: 5px;
        background-color: #3cb372;
        border-radius: 15px;
        margin: 5px;
        box-shadow: 3px 3px 10px rgba(114, 114, 114, 0.308);
        color: #f1f1f1;
        justify-content: flex-end
    }

    .Moreplans h3 {
        margin: 0;
        padding: 10px 25px;
    }
</style>
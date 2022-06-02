<template>
    <pageNavs :title="title" :url="url"></pageNavs>
    <div class="Popover" v-if="Popover">
        {{text}}
    </div>
    <div class="Introduction" @click="handleClick">
        <h3>{{model_data.name}}
            <svg t="1645517567379" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="6731" width="24" height="24" v-if="Details">
                <path
                    d="M512 64c-247.039484 0-448 200.960516-448 448S264.960516 960 512 960 960 759.039484 960 512 759.039484 64 512 64zM512 832.352641c-26.496224 0-48.00043-21.504206-48.00043-48.00043 0-26.496224 21.504206-48.00043 48.00043-48.00043s48.00043 21.504206 48.00043 48.00043S538.496224 832.352641 512 832.352641zM600.576482 505.184572c-27.839699 27.808735-56.575622 56.544658-56.575622 82.368284l0 54.112297c0 17.664722-14.336138 32.00086-32.00086 32.00086s-32.00086-14.336138-32.00086-32.00086l0-54.112297c0-52.352533 39.999785-92.352318 75.32751-127.647359 25.887273-25.887273 52.67249-52.639806 52.67249-73.984034 0-53.343368-43.07206-96.735385-95.99914-96.735385-53.823303 0-95.99914 41.535923-95.99914 94.559333 0 17.664722-14.336138 31.99914-32.00086 31.99914s-32.00086-14.336138-32.00086-31.99914c0-87.423948 71.775299-158.559333 160.00086-158.559333s160.00086 72.095256 160.00086 160.735385C672.00086 433.791157 635.680581 470.080473 600.576482 505.184572z"
                    p-id="6732"></path>
            </svg>
            <svg t="1645517512062" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="6459" width="24" height="24" v-else>
                <path
                    d="M463.99957 784.352211c0 26.509985 21.490445 48.00043 48.00043 48.00043s48.00043-21.490445 48.00043-48.00043c0-26.509985-21.490445-48.00043-48.00043-48.00043S463.99957 757.842226 463.99957 784.352211z"
                    p-id="6460"></path>
                <path
                    d="M512 960c-247.039484 0-448-200.960516-448-448S264.960516 64 512 64 960 264.960516 960 512 759.039484 960 512 960zM512 128.287273c-211.584464 0-383.712727 172.128262-383.712727 383.712727 0 211.551781 172.128262 383.712727 383.712727 383.712727 211.551781 0 383.712727-172.159226 383.712727-383.712727C895.712727 300.415536 723.551781 128.287273 512 128.287273z"
                    p-id="6461"></path>
                <path
                    d="M512 673.695256c-17.664722 0-32.00086-14.336138-32.00086-31.99914l0-54.112297c0-52.352533 39.999785-92.352318 75.32751-127.647359 25.887273-25.919957 52.67249-52.67249 52.67249-74.016718 0-53.343368-43.07206-96.735385-95.99914-96.735385-53.823303 0-95.99914 41.535923-95.99914 94.559333 0 17.664722-14.336138 31.99914-32.00086 31.99914s-32.00086-14.336138-32.00086-31.99914c0-87.423948 71.775299-158.559333 160.00086-158.559333s160.00086 72.095256 160.00086 160.735385c0 47.904099-36.32028 84.191695-71.424378 119.295794-27.839699 27.776052-56.575622 56.511974-56.575622 82.3356l0 54.112297C544.00086 659.328155 529.664722 673.695256 512 673.695256z"
                    p-id="6462"></path>
            </svg>


        </h3>
        <p v-if="Details">
            {{model_data.remark}}
        </p>
    </div>
    <div class="modelcard flex-1">
        <div class="col text  title">
            <h1>{{model_data.profitAmount}}</h1>
            <p>累计中奖金额(元)</p>
        </div>
        <div class=" flex-row Details">
            <div class="flex-1 text">
                <p>{{model_data.winCount}}</p>
                <p>中奖次数</p>
            </div>
            <div class="flex-1 text">
                <p>{{model_data.followCount}}</p>
                <p>收藏人数</p>
            </div>
        </div>
    </div>
    <div class=" modeltable">
        <table class="table table-bordered flex-1 flex-column">
            <thead>
                <tr>
                    <th class="weight">计划编号</th>
                    <td class="weight">进展</td>
                    <td class="weight">状态</td>
                </tr>
            </thead>
            <tbody>
                <template v-for="(item,key) in football_data.rows" :key="key">
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
            </tbody>
        </table>
        <div class="Moreplans" @click="Jump('/List','')">
            <h3>更多计划
                <svg t="1645672436555" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="5192" width="24" height="24">
                    <path
                        d="M274.432 879.71c-19.328 18.973-19.328 51.516 0 71.237 20.038 20.038 51.83 20.038 71.555 0l403.604-402.973c19.328-20.038 19.328-52.225 0-71.869l-403.605-403.289c-19.723-19.722-51.516-19.722-71.555 0-19.328 20.038-19.328 51.516 0 71.554l367.827 367.157-367.827 368.183z"
                        p-id="5193" fill="#f1f1f1"></path>
                </svg>
            </h3>

        </div>
    </div>
    <!-- <div>
        <div class="container">
            <div class="title h5">
                <h3>
                    大神观点
                </h3>
            </div>
            <template v-for="(item, index) in Viewpoint" :key="index">
                <div class="card Comment" @click="introductionClick(index)">
                    <div class="jumbotron jumbotron-fluid">
                        <div class=" card_m">
                            <div class="row">
                                <div class="col">
                                    <div class="img float">
                                    </div>
                                    <div class="float">
                                        {{item.username}}
                                    </div>
                                </div>
                                <div class="col sm flex-reverse">
                                    {{item.time}}
                                </div>
                            </div>
                            <div class="clear">{{item.introduction}}</div>
                            <div v-if="item.condition">
                                {{item.Comment}}
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div> -->
    <div class="after">

    </div>
    <Request ref="Visit"></Request>
</template>
<script>
    import pageNavs from './pageNavs'
    import { toRefs, reactive, defineComponent, ref } from 'vue';
    import { useRoute } from "vue-router";
    import { useRouter } from "vue-router";
    import Request from '../components/Request'
    export default defineComponent({
        components: {
            pageNavs,
            Request
        },
        setup() {
            const title = "智能模型详情";
            const route = useRoute().query.route;
            const router = useRouter();
            const Visit = ref();
            const Viewpoint = ref()
            const url='/'
            const data = {
                url: '/model/' + route,
                data: {}
            }
            const Popover = ref(false)
            const text = ref('')
            const model_data = ref({
                name: "亚盘赢盘模型",
                remark: "亚盘赢盘模型描述",
                value: "asia_win_model",
                profitAmount: 0.00,
                winCount: 0,
                followCount: 0
            })
            const football = {
                url: '/project/football/' + route + '?page=1&pageSize=5',
                data: {

                }
            }
            const football_data = ref({
                rows: []
            })
            const Prepare = (eve, key) => {
                new Promise((resolve) => {
                    return resolve(Visit.value.onget(eve))
                }).then((res) => {
                    console.log(res);

                    if (res.data.code) {
                        console.log(res.data.data);
                        text.value = res.data.data
                        Popover.value = true
                        setTimeout(function () {
                            Popover.value = false
                            localStorage.removeItem("User_Token");
                            router.push("/login");
                        }, 1000)
                    } else {
                        if (key == 1) {
                            model_data.value = res.data
                        } else {
                            football_data.value = res.data
                        }
                    }

                }).catch((err) => {
                    console.log(err);
                })
            }
            const state = reactive({
                Details: false,
                folder: true,
                person: true,
                condition: false,
                model_data: [
                    {
                        id: '1',
                        img: '',
                        username: '小二哥哥',
                        time: "2022-01-12",
                        introduction: '以前玩的时候，明明能把比赛分析的明明白白，一下去就乱了，自从用了这个模型就再也不用担心了',
                        Comment: '以前玩的时候，明明能把比赛分析的明明白白，一下去就乱了，自从用了这个模型就再也不用担心了',
                        condition: false
                    },
                    {
                        id: '2',
                        img: '',
                        username: '小二哥哥',
                        time: "2022-01-12",
                        introduction: '以前玩的时候，明明能把比赛分析的明明白白，一下去就乱了，自从用了这个模型就再也不用担心了',
                        Comment: '以前玩的时候，明明能把比赛分析的明明白白，一下去就乱了，自从用了这个模型就再也不用担心了',
                        condition: false
                    }
                ]
            });

            const table = [

            ]
            const handleClick = () => {
                state.Details = !state.Details
            };
            const introductionClick = (e) => {
                state.model_data[e].condition = !state.model_data[e].condition
            };
            const Jump = (path, id) => {
                router.push({
                    path: path + id,
                    query: {
                        id: id,
                        route:route
                    },
                });
            }
            return {
                ...toRefs(state),
                title,
                handleClick,
                table,
                introductionClick,
                Jump,
                Prepare,
                Visit,
                football,
                data,
                model_data,
                Viewpoint,
                football_data,
                Popover,
                text,
                url
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.Prepare(this.data, 1)
                this.Prepare(this.football, 0)
            })
        },
        methods: {

        }
    })
</script>
<style scoped>
    @import "../style/style.css";

    .Introduction {
        padding: 5px;
        background-color: #FFDB44;
        border-radius: 15px;
        margin: 5px;
        box-shadow: 3px 3px 10px rgba(114, 114, 114, 0.308);
    }

    .Introduction h3 {
        margin: 0;
        padding: 10px 25px;
    }

    .Introduction p {
        padding: 0 20px;
    }

    .img {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50px;
        margin-right: 8px;
        background-color: #e2e2e2;
        font-size: 00.5rem;
        margin-bottom: 10px;
    }

    svg {
        margin: 0;
    }

    .modelcard {
        width: 90%;
        margin: 0;
        padding: 0 18px;
        padding-top: 40px;

    }

    .modelcard .title h1 {
        margin: 0;
        margin-bottom: 10px;
    }

    p {
        margin: 0;
    }

    .Details {
        margin: 40px 0 20px;
    }

    .Details p {
        margin: 5px 0;
    }

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
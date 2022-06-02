<template>
    <pageNavs :title="title" :url="plan" :route="'model'"></pageNavs>
    <div>
        <div class="header_text flex-row content">
            <div>
                此为追号计划，中奖请停止后续投入
            </div>
        </div>
        <div class="Serialnumber flex-column card_m">
            <div class="flex-row">
                <div class="flex-1 sm">编号: <a class="color">{{plan_data.projectId}}</a> </div>
                <div class=" sm">{{plan_data.time}} </div>
            </div>
            <div class="flex-row ">
                <div class="col7 flex-1 ">
                    <div>{{plan_data.projectStatus}}</div>
                    <div>模型状态</div>
                </div>
                <div class="col7 flex-1">
                    <div style="color: rgb(255, 99, 99);">{{plan_data.profitPer}}%</div>
                    <div>预计收益</div>
                </div>
            </div>
        </div>
        <div>
            <div>
                <div class="card plancard">
                    <div class="jumbotron jumbotron-fluid">
                        <div class=" flex-column">
                            <template v-for="(item,index) in plan_data.list" :key="item.id">
                                <div class="flex-row row plan_data" :style="tablecolor(item.status)">
                                    <div class="col-7" :class="item.status=='进行中' ? 'Select' : ''">
                                        <h3 style="margin: 0;">{{item.home}}vs{{item.away}}</h3>
                                        <div>赛事:{{item.game}}</div>
                                        <div>时间:{{item.time}}</div>
                                        <div> 盘口:{{item.pan}}</div>
                                        <div>推荐:{{item.option}}</div>
                                        <div>参考赔率:{{item.odd}}</div>
                                    </div>
                                    <div class="span">
                                        <div style="color:#000;margin-bottom: auto;" class="planRadius sm">
                                            {{index+1}}-3
                                        </div>
                                        <div class="span" style=" align-items: flex-end" v-if="item.status=='进行中'">
                                            <h3 class="size planRadius">
                                                <!-- <span class="badge bg-dark"></span> -->
                                                <div class="status">
                                                    {{item.status}}
                                                </div>
                                                <div class="flex-row align button-ms" @click="Jump('/PlanAdd',item)">
                                                    <div >添加笔记</div>
                                                </div>
                                            </h3>
                                        </div>
                                        <div v-else>
                                            <h3 class="size planRadius">
                                                {{item.status}}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div>
                <div class="card plancard">
                    <h3>我的笔记</h3>
                    <div class="jumbotrons jumbotron-fluid">
                        <div class=" flex-column">
                            <template v-for="(item, key)  in plan_data.notes" :key="key">
                                <div class="flex-row row plan_data" :style="tablecolor(item.status)"
                                    style="flex-flow: column;">
                                    <div style=" width: 100%;" class="flex-row flex-1">
                                        <div class="col-7">
                                            <h3 style="margin: 0;">{{item.home}}vs{{item.away}}</h3>
                                            <p style="margin: 0; font-size: 0.9rem; color: rgb(139, 139, 139);">{{item.game}} /
                                                {{item.time}}</p>
                                            <!-- <div>编号:{{item.matchId}}</div> -->
                                            <table>
                                                <tr>
                                                    <td></td>
                                                    <td>赔率</td>
                                                    <td>盘口</td>
                                                    <td>投入奖金</td>
                                                    <td>预计奖金</td>
                                                </tr>
                                                <tr>
                                                    <td>参考</td>
                                                    <td>{{item.defaultOdd}}</td>
                                                    <td>{{item.defaultPan}}</td>
                                                    <td>{{item.defaultPrize/item.defaultOdd}}</td>
                                                    <td>{{item.defaultPrize}}</td>
                                                </tr>
                                                <tr>
                                                    <td>模拟</td>
                                                    <td>{{item.noteOdd}}</td>
                                                    <td>{{item.notePan}}</td>
                                                    <td>{{item.notePrize/item.noteOdd}}</td>
                                                    <td>{{item.notePrize}}</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div class="flex-column span">
                                            <div class="sm ma-bot" style="float: right; color: #000">
                                                推荐:{{item.option}}
                                                <!-- <h5 style="margin:auto 0 0;" class="ma-bot">
                                                    <span class="badge-Label Grey-Label"
                                                        v-if="item.status=='未中奖'">未中奖</span>
                                                    <span class="badge-Label Green-Label"
                                                        v-if="item.status=='进行中'">进行中</span>
                                                    <span class="badge-Label blue-Label"
                                                        v-if="item.status=='未开奖'">未开奖</span>
                                                    <span class="badge-Label orange-Label"
                                                        v-if="item.status=='已中奖'">已中奖</span>
                                                </h5> -->
                                            </div>
                                            <div class="flex-row align button-ms" @click="put('/PlanAdd',item)"  v-if="item.status=='进行中'">
                                                <div>修改笔记</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="after"></div>
    </div>
    <Request ref="Visit"></Request>
    <Popover :Prompt="Popover" :Visiable="text"></Popover>

</template>
<script>
    import pageNavs from './pageNavs'
    import { toRefs, reactive, defineComponent, ref } from 'vue';
    import { useRoute } from "vue-router";
    import { useRouter } from "vue-router";
    import Request from '../components/Request'
    import Popover from './Popover'

    export default defineComponent({
        components: { pageNavs, Request, Popover },

        setup() {
            const title = "我的计划";
            const route = useRoute().query.id;
            const router = useRouter();
            const Visit = ref();
            const flex = ref([])
            const Popover = ref(false)
            const text = ref('')
            const state = reactive({
                Details: false,
                plan_data: {},
                data: {
                    url: '/project/' + route,
                    data: {}
                },
                Subscription: {
                    url: '/project/' + route + '/follow',
                    data: {}
                },
                preprocessor: false
            })
            const Prompt = (eve) => {
                Popover.value = true
                text.value = eve
                setTimeout(function () {
                    Popover.value = false
                    router.push("/index");
                }, 500)
            }
            const flex_arr = (eve) => {//将小数点后的0缩短至2位
                for (let index in eve) {
                    let defaultPrize = eve[index].defaultPrize.toFixed(2)
                    eve[index].defaultPrize = parseFloat(defaultPrize);
                    // let now = new Date(eve[index].time),
                    //     y = now.getFullYear(),
                    //     m = now.getMonth() + 1,
                    //     d = now.getDate();
                    // eve[index].time = y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d)
                }
            }
            const Prepare = (eve) => {
                new Promise((resolve) => {
                    return resolve(Visit.value.onget(eve))
                }).then((res) => {
                    console.log(res);
                    if (res.data.code) {
                        login('/login')
                        Prompt(res.data.data)
                        return
                    }
                    flex_arr(res.data.notes)
                    state.plan_data = res.data
                    preprocessor()
                }).catch((err) => {
                    console.log(err);
                    // Prompt('登录状态过期')
                })
            }
            const preprocessor = () => {
                for (let index = 0; index < state.plan_data.list.length; index++) {
                    if (state.preprocessor) {
                        state.plan_data.list[index].status = '未开始'
                    }
                    if (state.plan_data.list[index].status == '进行中') {
                        state.preprocessor = true
                    }
                }
            }
            const flex_click = (eve) => {
                flex.value[eve] = !flex.value[eve]
            }
            const tablecolor = (e) => {
                switch (e) {
                    case '未开始':
                        return {
                            "background-image": " linear-gradient(to left, #E1F5FE, #fff)"
                        }
                    case '进行中':
                        return {
                            "background-image": " linear-gradient(to left, #E0F2F1 , #fff)",
                            'color': '#000'
                        }
                    case '未开奖':
                        return {
                            "background-image": " linear-gradient(to left, #E1F5FE, #fff)"
                        }
                    case '中奖':
                        return {
                            "background-image": " linear-gradient(to left,#FFF3E0 , #fff)"
                        }
                    case "未中奖":
                        return {
                            "background-image": " linear-gradient(to left,#EEEEEE, #fff)"
                        }
                    default:
                        break;
                }
            }
            const login = (path) => {
                router.push({
                    path: path
                })
            }
            const Jump = (path, id) => {
                router.push({
                    path: path,
                    query: {
                        matchId: id.matchId,
                        route: route,
                        odd: id.odd,
                        pan: id.pan,
                        home: id.home + 'vs' + id.away,
                        game: id.game,
                        time: id.time,
                        option: id.option,
                    },
                });
            }
            const put = (path, id) => {
                router.push({
                    path: path,
                    query: {
                        matchId: id.matchId,
                        route: route,
                        odd: id.defaultOdd,
                        pan: id.defaultPan,
                        home: id.home + 'vs' + id.away,
                        game: id.game,
                        time: id.time,
                        option: id.option,
                        noteOdd: id.noteOdd,
                        notePan: id.notePan,
                        notePrize: id.notePrize,
                        state: true
                    },
                });
            }
            return {
                title,
                tablecolor,
                ...toRefs(state),
                Jump,
                Prepare,
                Visit,
                flex,
                flex_arr,
                flex_click,
                route,
                put,
                Prompt,
                Popover,
                text
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.Prepare(this.data)
            })
        },
        methods: {

        }
    })
</script>
<style scoped>
    @import "../style/style.css";

    html {
        color: rgb(87, 87, 87);
    }

    .Serialnumber {
        padding: 20px;
        margin: 20px;
        margin-bottom: 10px;
        box-shadow: 0px 0px 10px rgba(114, 114, 114, 0.308);
        background-image: linear-gradient(to right, #F1F8E9, #fff);
        border-radius: 15px;
        color: rgb(109, 109, 109);
    }

    .sm {
        color: rgb(247, 247, 247);
        font-size: 10px;
    }

    .color {
        color: #FFDB44;
        text-decoration: none;
        text-shadow: 0.5px 0.5px 1px rgba(192, 192, 192, 0.726);
    }

    .plancard {
        padding: 0 20px;
        padding-top: 0;
    }

    .col-2,
    .col-7,
    .col-3 {
        flex-grow: 1;
    }

    .col-7 {}

    .col-7 div {
        margin: 1px 0;
        color: #9e9e9e;
    }

    .Select div{
        color: #272727;

    }

    .header_text {
        background-color: #fffcf1;
        font-weight: 700;
        color: #d89b1e;
        margin: 0;
        text-align: center;
        font-size: 0.7rem;
        padding: 8px;
        text-align: center;
    }

    .row {
        border-radius: 10px;
        padding: 10px;
        margin: 5px;
        box-shadow: -2px 1px 5px rgba(202, 202, 202, 0.726);
        display: flex;
    }

    .jumbotrons .row {
        align-items: flex-start;
        border-radius: 10px;
        padding: 10px;
        margin: 5px;
        box-shadow: -2px 1px 5px rgba(202, 202, 202, 0.726);
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

    .Collection {
        padding: 20px;
    }

    .container {
        margin: 20px;
        margin-top: 40px;
        font-size: 0.9rem;
    }

    .badge-dark {
        padding: 5px;
        float: right;
        clear: both;
        align-items: center;
        font-size: 1rem;
        color: #3cb472cc;
        border-radius: 15px;
        flex-direction: row-reverse;
        flex-wrap: wrap;
    }

    .badge-dark:active {
        background-color: #3cb47236;
        box-shadow: inset -2px 1px 5px rgba(202, 202, 202, 0.726);
    }

    .badge-Label {
        padding: 5px;
        border-radius: 5px;
        width: 2.5rem;
        float: right;
        clear: both;
        margin-top: 5px;
        text-align: center;
    }

    .Green-Label {
        color: rgba(60, 180, 114, 0.8);
        background-color: rgba(60, 180, 114, 0.2);
        border: 1px solid rgba(60, 180, 114, 0.8);
    }

    .Grey-Label {
        color: rgba(128, 128, 128, 0.8);
        background-color: rgba(128, 128, 128, 0.2);
        border: 1px solid rgba(128, 128, 128, 0.8);
        ;
    }

    .blue-Label {
        color: rgba(40, 181, 246, 0.8);
        background-color: rgba(40, 181, 246, 0.2);
        border: 1px solid rgba(40, 181, 246, 0.8);
    }

    .orange-Label {
        color: rgba(255, 111, 0, 0.8);
        background-color: rgba(255, 111, 0, 0.2);
        border: 1px solid rgba(255, 111, 0, 0.8);
    }

    .footer {
        position: fixed;
        left: 0px;
        bottom: 0px;
        width: 100%;
        z-index: 9999;
    }

    .after {
        content: '';
        height: 30px;
        display: block;
    }

    .col7 {
        text-align: center;
        margin: 10px 10px 0;
    }

    .col7 div {
        margin: 10px;
    }

    .flex {
        width: 100%;
        text-align: center;
    }

    .card_m {
        background-image: linear-gradient(to right, #3cb37264, #ffffff);
        padding: 10px;
        border-radius: 15px;
        margin-bottom: 10px;
        box-shadow: 3px 3px 5px rgba(114, 114, 114, 0.308);
        margin: 10px 20px;
        background-image: url('../style/img/background.jpg');
        color: #fff;
    }

    .size {
        margin: 0;
        font-size: 1rem;
    }

    .planRadius {
        text-align: end;
    }

    .span {
        display: grid;
        align-items: flex-end
    }

    .ma-bot {
        margin-bottom: auto;
    }

    td,
    th {
        border-bottom: 1px solid #ddd;
        padding: 5px 8px;
        text-align: center;
        font-size: 0.6em;
    }

    tr {
        border-bottom: 0.75px solid #5d5d5d;
    }

    table {
        margin: 5px 0 0px 0;
        border-collapse: collapse;
    }

    .plan_data {
        color: rgb(157, 157, 157);
    }
    .status{
        margin-bottom: 10px;
    }
</style>
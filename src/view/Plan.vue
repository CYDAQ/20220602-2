<template>
    <pageNavs :title="title"></pageNavs>
    <div>
        <div class="header_text flex-row content">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                <path
                    d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            <div>
                此为追号计划，中奖请停止后续投入
            </div>
        </div>
        <div class="Serialnumber flex-row">
            <div class="col-7 flex-1">当前预计收益: <a href="#" class="color"> {{plan_data.profitPer}}%</a> </div>
        </div>
        <div>
            <div class=" ">
                <div class="card plancard">
                    <div class="jumbotron jumbotron-fluid">
                        <div class=" card_m flex-column">
                            <template v-for="item in plan_data.list" :key="item.id">
                                <div class="flex-row row" :style="tablecolor(item.status)">
                                    <div class="col-2 ">
                                        <h4 class="planRadius">{{item.matchId}}</h4>
                                    </div>
                                    <div class="col-7 ">
                                        <h3 style="margin: 0;">{{item.home}}vs{{item.away}}</h3>
                                        <div>{{item.game}}{{item.time}}</div>
                                        <div> 盘口:{{item.pan}}</div>
                                        <div>推荐:{{item.option}}</div>
                                        <div>参考赔率:{{item.odd}}</div>
                                    </div>
                                    <div class="col-3">
                                        <h5>
                                            <span class="badge bg-dark">{{item.status}}</span>
                                        </h5>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="Collection">

            <div class="container grey">
                <div>温馨提示:</div>
                <div>
                    收藏成功后，可对本计划进行模拟投注，形成自己的实战笔记，便于后续复盘.
                </div>
            </div>
        </div>
        <div class="after"></div>
        <div class="footer">
            <div class="d-flex " style="padding:20px;">
                <button type="button" class=" btn-primary " @click="Jump('/Detailed',route)" v-if="isFollow">
                    <div>
                        已收藏，编辑我的计划
                    </div>
                </button>
                <button type="button" class=" btn-primary " style="background-color: #9E9E9E;" v-else-if="Failure">
                    <div>
                        收藏计划
                    </div>
                </button>
                <button type="button" class=" btn-primary " @click="Jump('/Collection',route)" v-else-if="!isFollow">
                    <div>
                        收藏计划
                    </div>
                </button>

            </div>
        </div>
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
        components: { pageNavs, Request },
        setup() {
            const title = "大小球计划详情";
            const route = useRoute().query.id;
            const argument = useRoute().query.route;
            const router = useRouter();
            const Visit = ref();
            const state = reactive({
                plan_data: {},
                data: {
                    url: '/project/' + route,
                    data: {}
                },
                Subscription: {
                    url: '/project/' + route + '/follow',
                    data: {}
                },
                isFollow: false,
                Failure: false
            })
            const Prepare = (eve) => {
                new Promise((resolve) => {
                    return resolve(Visit.value.onget(eve))
                }).then((res) => {
                    if (res.data.code) {
                        Jump('/login')
                    } else
                        if (res.data.isFollow) {
                            state.isFollow = true
                        }
                    Failure(res.data.list[0])
                    state.plan_data = res.data
                }).catch((err) => {
                    console.log(err);
                })
            }
            const Failure = (eve) => {
                let time = eve.time
                if (Date.parse(new Date()) > Date.parse(new Date(time))) {
                    state.Failure = true
                }
            }
            const tablecolor = (e) => {
                switch (e) {
                    case "未中奖":
                        return {
                            "background-image": " linear-gradient(to left, #e2e2e2 , #fff)"
                        }
                    case '进行中':
                        return {
                            "background-image": " linear-gradient(to left, #E0F2F1 , #fff)"
                        }
                    case '未开始':
                        return {
                            "background-image": " linear-gradient(to left, #6DAFCF, #fff)"
                        }
                    case '中奖':
                        return {
                            "background-image": " linear-gradient(to left, #FBAE54 , #fff)"
                        }
                    case '未开奖':
                        return {
                            "background-image": " linear-gradient(to left, #E1F5FE, #fff)"
                        }
                    default:
                        break;
                }
            }
            const Collection = () => {
                new Promise((resolve) => {
                    return resolve(Visit.value.onget(state.Subscription))
                }).then((res) => {
                    return res
                }).catch((err) => {
                    console.log(err);
                })
            }
            const Jump = (path, id) => {
                const url = ref()
                if (path == '/Collection') {
                    url.value = path
                    Collection()
                } else {
                    url.value = path
                }

                router.push({
                    path: url.value,
                    query: {
                        id: id,
                        route: argument
                    },
                });
            }
            return {
                ...toRefs(state),
                title,
                tablecolor,
                route,
                router,
                Visit,
                Prepare,
                Jump
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

    .Serialnumber {
        padding: 10px;
        margin: 20px;
        margin-bottom: 10px;
        box-shadow: 0px 0px 10px rgba(114, 114, 114, 0.308);
        background-color: #3cb371;
        color: #fff;
        border-radius: 15px;
    }

    .color {
        color: #FFDB44;
        text-decoration: none;
        text-shadow: 0.5px 0.5px 1px rgba(192, 192, 192, 0.726);
    }

    .plancard {
        padding: 20px;
        padding-top: 0;
    }

    .col-2,
    .col-7,
    .col-3 {
        flex-grow: 1;
        margin: 3px;
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
        align-items: center;
        border-radius: 10px;
        padding: 10px;
        margin: 5px;
        /* background-image: linear-gradient(to left, #e2e2e2, #fff); */
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
        font-size: 0.9rem;
    }

    .grey {
        text-align: center;
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
        height: 64px;
        display: block;
    }
</style>
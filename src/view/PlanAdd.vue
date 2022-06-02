<template>
    <pageNavs :title="title"></pageNavs>
    <!-- <div class="Popover" v-if="Popover">
        {{text}}
    </div> -->
    <div class="container flex-column">
        <div class="card">
            <div class="flex-row">
                <div class="flex-column">
                    <h3 class="row flex-column">{{adddata.Team1}}
                        <div style="font-size: 1rem; margin-left:10px ;">
                            ({{adddata.Competition}})
                        </div>
                    </h3>

                </div>
                <div class="row sm">{{adddata.time}}</div>
            </div>
            <div class="flex-row">
                <div class="row">
                    <div class="xl">{{adddata.method}}</div>
                    <div>盘口</div>
                </div>
                <div class="row">
                    <div class="xl">{{adddata.Referenc}} / {{adddata.option}}</div>
                    <div>参考赔率/推荐</div>
                </div>
            </div>

        </div>
        <div class="row ">
            <div class="col-4">
                模拟投注盘口:
            </div>
            <div class="input-group input-group-sm mb-2 col">
                <input type="number" class="form-control" aria-label="Sizing example input" v-model="data.data.pan"
                    placeholder="" aria-describedby="inputGroup-sizing-sm">
            </div>
        </div>
        <div class="row ">
            <div class="col-4">
                模拟投注赔率:
            </div>
            <div class="input-group input-group-sm mb-2 col">
                <input type="number" class="form-control" aria-label="Sizing example input" v-model="data.data.odd"
                    placeholder="" aria-describedby="inputGroup-sizing-sm">
            </div>
            <!-- <div class='map-overlay top'>
                <div class='map-overlay-inner'>
                    <input @change="slider" id='slider' type='range' min='-1025' max='1025' step='25'
                        v-model='sliderdata' />
                </div>
            </div> -->
        </div>
        <div class="row ">
            <div class="col-4">
                模拟投入金额:
            </div>
            <div class="input-group input-group-sm mb-2 col">
                <input type="number" class="form-control" aria-label="Sizing example input" v-model="data.data.amount"
                    placeholder="100(参考金额)" aria-describedby="inputGroup-sizing-sm">
            </div>
        </div>
        <div class="container">
            <div>
                <button @click="slider(data.data)" type="button" class="btn-primary">保存</button>
            </div>
        </div>
    </div>
    <Request ref="Visit"></Request>
    <Prompt :Prompt="Popover" :Visiable="text"></Prompt>
</template>
<script>
    import pageNavs from './pageNavs'
    import Prompt from './Popover'
    import { defineComponent, ref, watch } from 'vue';
    import { useRouter } from "vue-router";
    import Request from '../components/Request.vue'
    import { useRoute } from "vue-router";

    export default defineComponent({
        components: { pageNavs, Request, Prompt },
        setup() {
            const title = "添加笔记";
            const matchId = useRoute().query.matchId;
            const route = useRoute().query.route;
            const url = ref()
            const Visit = ref(null)
            const router = useRouter();
            const Popover = ref(false)
            const text = ref('')
            const sliderdata = ref(0)
            const numder = ref(0)
            const adddata = ref({
                time: useRoute().query.time,
                Team1: useRoute().query.home,
                Ball: useRoute().query.time,
                Recommend: useRoute().query.pan,
                Referenc: useRoute().query.odd,
                method: useRoute().query.pan,
                Competition: useRoute().query.game,
                option: useRoute().query.option,
                noteOdd: useRoute().query.noteOdd,
                notePan: useRoute().query.notePan,
                notePrize: useRoute().query.notePrize,
                state: useRoute().query.state,
            })
            const data_arr = [
                'pan',
                'odd',
                'amount',
            ]
            const reminder_arr = [
                '模拟投资盘口',
                '模拟投资赔率',
                '模拟投入金额',
            ]
            const data = ref({
                url: '/notes/football',
                data: {
                    projectId: route,
                    matchId: matchId,
                    pan: null,
                    odd: null,
                    amount: null
                }
            })
            data.value.data.pan = adddata.value.noteOdd
            data.value.data.odd = adddata.value.notePan
            data.value.data.amount = adddata.value.notePrize
            console.log(data);
            const slider = () => {
                for (let i in data_arr) {
                    let Temporary = data.value.data[data_arr[i]]
                    if (Temporary !== null) {
                        if (Temporary != '') {
                            if (Number(Temporary)) {
                                console.log('ok');
                            } else {
                                reminder(i, 0)
                                return
                            }
                        } else {
                            reminder(i, 1)
                            return
                        }
                    } else {
                        reminder(i, 1)
                        return
                    }
                }
                Prepare(data.value)
            }
            const reminder = (eve, key) => {
                switch (key) {
                    case 1:
                        text.value = reminder_arr[eve] + '不能为空'
                        break;
                    default:
                        text.value = reminder_arr[eve] + '参数错误'
                        break;
                }
                Popover.value = true
                setTimeout(() => {
                    Popover.value = false
                }, 1000)
            }
            const Prepare = (eve) => {
                Popover.value = true
                text.value = '添加中...'
                new Promise((resolve) => {
                    return resolve(Visit.value.onpost(eve))
                }).then((res) => {
                    Popover.value = false
                    if (res.data.code == 0) {
                        if (adddata.value.state) {
                            Jump('/MorePlans')
                        } else {
                            Jump('/Collection')
                        }
                    } else if (res.data.code == -1) {
                        text.value = res.data.data
                        Popover.value = true
                        setTimeout(function () {
                            Popover.value = false
                        }, 1000)
                    } else {
                        text.value = res.data.data
                        Popover.value = true
                        setTimeout(function () {
                            Popover.value = false
                            localStorage.removeItem("User_Token");
                            router.push("/login");
                        }, 1000)
                    }

                }).catch((err) => {
                    Popover.value = false
                    console.log(err);
                })
            }

            const Jump = (path) => {
                router.push({
                    path: path,
                    query: {
                        id: route,
                    },
                });
            }
            const IntegerToFloat = (date) => {
                date = date * 0.01
                if (date == null || date == 'NaN') {
                    return '';
                }
                const arr = date.toString().split('.');
                if (arr.length === 1) {
                    return `${date}.00`;
                } else if (arr.length === 2 && arr[1].length === 1) {
                    return `${date}0`;
                } else {
                    return date.toFixed(2)
                }
            }
            watch(() => sliderdata.value, (_val, oldVal) => {
                numder.value = IntegerToFloat(oldVal)
            });

            return {
                title,
                adddata,
                url,
                Visit,
                Jump,
                Prepare,
                slider,
                sliderdata,
                numder,
                data,
                Popover,
                text
            }

        },
        watch: {

        },
        methods: {

        }
    })
</script>
<style scoped>
    @import "../style/style.css";

    .container {
        padding: 20px;
    }

    .form-control {
        height: 30px;
        width: 100%;
        border-radius: 15px;
        border: 1px solid #3cb371;
    }

    .row {
        margin-top: 10px;
    }

    .card {
        background-image: linear-gradient(to right, #F1F8E9, #fff);
        padding: 10px;
        color: #5a5a5a;
        box-shadow: 3px 3px 5px rgba(114, 114, 114, 0.308);
        border-radius: 15px;
    }

    .card .row {
        margin: 15px 10px;
        flex-grow: 1;
        text-align: center;
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

    .btn-primary:active {
        background-color: #fff;
        border: 1px solid #3cb371;
        color: #3cb371;
    }

    .sm {
        font-size: 0.8rem;
        float: right;
        text-align: end !important;
        margin: 15px 0 0 0 !important;
    }

    .xl {
        font-size: 1.1rem;
        color: #E53935;
    }



    .map-overlay .map-overlay-inner {
        background-color: #fff;
        border-radius: 3px;
        padding: 10px;
        margin-bottom: 10px;
    }

    .map-overlay label {
        display: block;
        margin: 0 0 10px;
    }

    .map-overlay input {
        width: 100%;
    }

    input[type='range']::-webkit-slider-runnable-track {
        background-color: #eee;
        height: 4px;
        border-radius: 8px;
        background: #3cb371;
    }

    input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: 5px solid #fff;
        height: 14px;
        width: 14px;
        border-radius: 8px;
        background: #1ba1e2;
        cursor: pointer;
    }

    input[type='range']::-ms-thumb {
        border: 3px solid #fff;
        height: 7px;
        width: 7px;
        border-radius: 8px;
        background: #1ba1e2;
        cursor: pointer;
    }

    .Popover {
        text-align: center;
        position: fixed;
        left: 50%;
        top: 200px;
        width: 150px;
        margin-left: -115px;
        padding: 40px;
        background-color: rgb(255, 255, 255);
        border-radius: 15px;
        z-index: 9999;
        box-shadow: 1px 1px 10px rgba(190, 190, 190, 0.4);
    }
</style>
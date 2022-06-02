<template>
    <pageNavs :title="title"></pageNavs>
    <div class="container Collection">
        <div>
            <div style="color: #3cb371;">
                <h2>添加成功!</h2>
            </div>
            <div class="Prompt">
                <img class="Collection_img" src="../style/img/Prompt.png" alt="" srcset="">
            </div>
            <div style="color: #3cb371;">
                <h3>请在“我的计划”中查看，和<br>制定自己的实战笔记。 </h3>
            </div>
        </div>
        <div class="container">
            <div class="flex-row">
                <a href="JavaScript:history.go(-1)" class="flex-1" style="margin-right:5px; width: 100%;">
                    <button type="button" class="btn-primary Grey" style="margin-right: 8px;">返回</button>
                </a>
                <button type="button" class="btn-primary flex-1" @click="Jump('/Detailed')">查看计划</button>
            </div>
        </div>
    </div>
    <footers :footerdata="folder"></footers>
</template>
<script>
    import { toRefs, reactive ,defineComponent} from 'vue';
    import footers from "./Footers"
    import pageNavs from './pageNavs'
    import { useRoute } from "vue-router";
    import { useRouter } from "vue-router";
    export default  defineComponent({
        components: { pageNavs, footers },
        setup() {
            const title = "大小球计划详情";
            const folder = true
            const route = useRoute().query.id;
            const argument = useRoute().query.route;
            const router = useRouter();
            const state = reactive({
                Details: true,
                person: true,
            });
            const adddata = {
                time: '欧冠 10.13 02:13',
                Team1: '曼联',
                Team2: '切尔希',
                Ball: '2.5',
                Recommend: '大球',
                Referenc: '4.45',
                Status: '0',
                method: "大小球"
            }
            const Jump = (path) => {
                router.push({
                    path: path,
                    query: {
                        id: route,
                        route: argument
                    },
                });
            }
            return {
                ...toRefs(state),
                title,
                folder,
                adddata,
                Jump
            }
        },
        methods: {
        }
    })
</script>
<style scoped>
    @import "../style/style.css";

    .container .text {
        margin-top: 8px;
    }

    .Collection {
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

    .Grey {
        background-color: #c8c8c8;
    }

    .Collection_img {
        width: 100%;
    }

    .container {
        font-size: 0.9rem;
        padding: 20px;
    }
</style>
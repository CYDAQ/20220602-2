<template>
    <div class="after">

    </div>
    <div class="footernew flex-row">
        <div class="flex-1 text">
            <template v-if="house">
                <svg t="1645501232431" class="icon content" viewBox="0 0 1024 1024" version="1.1" @click="Jump('/')"
                    xmlns="http://www.w3.org/2000/svg" p-id="12127" width="24" height="24">
                    <path
                        d="M946.5 505L560.1 118.8l-25.9-25.9c-12.3-12.2-32.1-12.2-44.4 0L77.5 505c-12.3 12.3-18.9 28.6-18.8 46 0.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8 12.1-12.1 18.7-28.2 18.7-45.3 0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204z m217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"
                        p-id="12128"></path>
                </svg>
                <div>
                    首页
                </div>
            </template>
            <template v-else>
                <svg t="1646015278782" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2725" width="24" height="24">
                    <path
                        d="M925.866667 396.8l-32-27.733333c-78.933333-66.133333-185.6-157.866667-320-273.066667l-12.8-10.666667C533.333333 61.866667 490.666667 61.866667 462.933333 85.333333l-151.466666 130.133334c-85.333333 72.533333-155.733333 132.266667-211.2 179.2-17.066667 12.8-25.6 32-25.6 53.333333v4.266667c2.133333 38.4 34.133333 66.133333 70.4 66.133333H192v358.4c0 29.866667 23.466667 53.333333 53.333333 53.333333h164.266667c27.733333-2.133333 49.066667-25.6 49.066667-53.333333v-185.6c0-12.8 8.533333-21.333333 21.333333-21.333333h64c12.8 0 21.333333 8.533333 21.333333 21.333333v185.6c0 29.866667 23.466667 53.333333 53.333334 53.333333h164.266666c27.733333-2.133333 49.066667-25.6 49.066667-53.333333V518.4h46.933333c38.4 0 70.4-32 70.4-70.4 0-21.333333-8.533333-38.4-23.466666-51.2z"
                        p-id="2726" fill="#3cb371"></path>
                </svg>
                <div style="color: #3cb371;">
                    首页
                </div>
            </template>
        </div>
        <div class="flex-1 text">
            <template v-if="folder">
                <svg t="1645501373024" class="icon" viewBox="0 0 1024 1024" version="1.1" @click="Jump('/Notes')"
                    xmlns="http://www.w3.org/2000/svg" p-id="20173" width="24" height="24">
                    <path d="M895.8 592.1a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z" fill="#515151" p-id="20174">
                    </path>
                    <path
                        d="M928 687.9c-17.8 0-32.2 14.4-32.2 32.1v80.7c0 35.3-28.7 64-64 64H192.5c-35.3 0-64-28.7-64-64V225c0-35.3 28.7-64 64-64H415l82.7 143.3c6.6 11.4 19.2 17.2 31.5 15.8h302.5c35.3 0 64 28.7 64 64v80c0 17.7 14.4 32.1 32.2 32.1s32.2-14.4 32.2-32.1c0-0.8 0-1.6-0.1-2.4v-77.5C960 329 925.1 282 876.1 264v-1c0-68.2-55.8-124-124-124H476.2l-14.8-25.7c-7.4-12.9-18-16.2-27.3-16l-0.1-0.1H192.1c-70.7 0-128 57.3-128 128v574.1c0 70.7 57.3 128 128 128h640c70.7 0 128-57.3 128-128v-76.9c0.1-0.8 0.1-1.6 0.1-2.4 0-17.7-14.4-32.1-32.2-32.1zM747.1 202.8c31.6 0 58 23.2 63.1 53.4H543.9l-30.8-53.4h234z"
                        fill="#515151" p-id="20175"></path>
                </svg>
                <div>
                    我的计划
                </div>
            </template>
            <template v-else>
                <svg t="1646015373722" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="3840" width="24" height="24">
                    <path
                        d="M81.16 412.073333L0 709.653333V138.666667a53.393333 53.393333 0 0 1 53.333333-53.333334h253.413334a52.986667 52.986667 0 0 1 37.713333 15.62l109.253333 109.253334a10.573333 10.573333 0 0 0 7.54 3.126666H842.666667a53.393333 53.393333 0 0 1 53.333333 53.333334v74.666666H173.773333a96.2 96.2 0 0 0-92.613333 70.74z m922-7.113333a52.933333 52.933333 0 0 0-42.386667-20.96H173.773333a53.453333 53.453333 0 0 0-51.453333 39.333333L11.773333 828.666667a53.333333 53.333333 0 0 0 51.453334 67.333333h787a53.453333 53.453333 0 0 0 51.453333-39.333333l110.546667-405.333334a52.953333 52.953333 0 0 0-9.073334-46.373333z"
                        fill="#3cb371" p-id="3841"></path>
                </svg>
                <div style="color: #3cb371;">
                    我的计划
                </div>
            </template>
        </div>

        <div class="flex-1 text">
            <template v-if="person">
                <svg t="1645501535083" class="icon" viewBox="0 0 1024 1024" version="1.1" @click="Jump('/Individual')"
                    xmlns="http://www.w3.org/2000/svg" p-id="23959" width="24" height="24">
                    <path
                        d="M512 192.8c70.4 0 128 57.6 128 128s-57.6 128-128 128c-36 0-68.8-14.4-93.6-40.8-24.8-26.4-36.8-60-34.4-96 4-63.2 56.8-115.2 120-118.4 2.4-0.8 4.8-0.8 8-0.8M512 640c53.6 0 140.8 13.6 216 43.2 64 25.6 104 57.6 104 84v64.8H192v-64.8c0-26.4 40-58.4 104-84 75.2-29.6 162.4-43.2 216-43.2m0-511.2h-11.2c-96 5.6-174.4 83.2-180.8 178.4-7.2 112 80.8 204.8 191.2 204.8 105.6 0 192-86.4 192-192S617.6 128.8 512 128.8zM512 576c-128 0-384 64-384 191.2v96c0 17.6 14.4 32 32 32h704c17.6 0 32-14.4 32-32V766.4C896 640 640 576 512 576z"
                        p-id="23960"></path>
                </svg>
                <div>
                    个人中心
                </div>
            </template>
            <template v-else>
                <svg t="1646015425026" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4914" width="24" height="24">
                    <path
                        d="M535.6 511.8c95.1-10.5 172.1-87.5 182.6-182.6C732 204 634.4 98.2 512 98.2c-114.6 0-207.5 92.8-207.5 207.4v0.1c0 122.4 105.9 219.9 231.1 206.1zM512 572.4c-138.5 0-415 79.4-415 237.1v88.9c0 16.4 13.3 29.6 29.6 29.6h770.7c16.4 0 29.6-13.3 29.6-29.6v-88.9C927 651.9 650.5 572.4 512 572.4z"
                        p-id="4915" fill="#3cb371"></path>
                </svg>
                <div style="color: #3cb371;">
                    个人中心
                </div>
            </template>

        </div>
    </div>
</template>
<script>
    import { toRefs, reactive } from 'vue';

    export default {
        name: 'footers',
        props: {
            footerdata: String,

        },
        setup(props) {
            const state = reactive({
                house: true,
                folder: true,
                person: true,
            });
            if (props.footerdata !== null) {
                switch (props.footerdata) {
                    case 'house':
                        state.house = false
                        break;
                    case 'folder':
                        state.folder = false
                        break;
                    case 'person':
                        state.person = false
                        break;
                    default:
                        break;
                }
            }

            return {
                ...toRefs(state)
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

    .footer {
        position: fixed;
        left: 0px;
        bottom: 0px;
        width: 100%;
        height: 50px;
        background-color: rgb(255, 255, 255);
        z-index: 9999;
    }

    .footer i {
        margin: 8px;
        font-size: 1.5rem;
    }

    .footer col div {
        margin: auto;
    }

    .footernew {
        position: fixed;
        left: 0px;
        bottom: 0px;
        width: 100%;
        padding: 10px 0;
        background-color: rgb(255, 255, 255);
        box-shadow: 0px 0px 10px rgba(212, 212, 212, 0.4);
        flex-basis: 50px;
        flex-wrap: nowrap
    }

    .after {
        content: '';
        height: 64px;
        display: block;
    }

    svg {
        text-align: center;
    }

    .icon {
        width: 100%;
    }

    .footernew .text {
        font-size: 0.8rem;
        width: 33%;
    }

</style>
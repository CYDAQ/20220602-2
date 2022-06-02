<template>
    <div class="scroll" ref="scroll" :style='Height(scrollHeight)'>
        <slot></slot>
        <div v-if="loading" class="loading">
            正在加载...
        </div>
        <div v-if="Stop" class="loading">
            到底了
        </div>
    </div>
</template>
<script>
    import { defineComponent, ref, watch } from 'vue';
    export default defineComponent({
        props: {
            loading: Boolean,
            scrollHeight: Number,
            Stop: Boolean
        },
        setup(props) {
            const scroll = ref(null)
            const loading_scroll = ref(false)
            watch(() => props.loading, (_val, oldVal) => {
                loading_scroll.value = oldVal
                scroll.value.scrollTop = scroll.value.scrollTop - 3
            });
            const onScroll = () => {
                let top = scroll.value.scrollTop
                let bodyHeight = scroll.value.offsetHeight
                if (props.Stop) {
                    return
                }
                if (top + bodyHeight >= scroll.value.scrollHeight) {
                    return { code: 0 }
                }
            }
            const Height = (eve) => {
                let innerHeight = eve + 'px'
                return {
                    "height": innerHeight
                }
            }
            return {
                scroll,
                onScroll,
                Height,
            }
        },
        mounted() {
            this.$nextTick(function () {

            })
        },
    })
</script>
<style scoped>
    .scroll {
        overflow-y: scroll
    }

    .loading {
        margin: 20px;
        color: #969696;
    }
</style>
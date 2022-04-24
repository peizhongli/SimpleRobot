<template>
    <div :class="`tooltip-el ${customClass}`" v-long-press="handleLongPress">
        <slot></slot>
    </div>
    <div v-click-outside="handleClickOutside" v-show="visible" ref="tipEl" :class="`tooltip ${direction}`" :style="styleOpt">
        <slot name="content">{{content}}</slot>
    </div>
</template>
<script setup>
    import {nextTick, ref, watch} from 'vue';
    import vClickOutside from '@/directive/clickOutside.js';
    import vLongPress from '@/directive/longPress';
    import useTipContent from '@/hooks/useTipContent';

    const tipEl = ref(null);

    const props = defineProps({
        content: String,
        visible: Boolean,
        customClass: {
            type: String,
            default: ''
        }
    });

    const emit = defineEmits(['close', 'visible-change']);

    const {direction, styleOpt, getTipSize, setTipStyle, setDirection} = useTipContent(tipEl);

    const handleClickOutside = () => {
        emit('visible-change', false);
    };

    const handleLongPress = async el => {
        const {height, width} = await getTipSize();
        const position = el.getBoundingClientRect();
        // 子元素才是内部的实际视图单位
        const elChildLeft = el.children[0].getBoundingClientRect().x;
        // 判断是否超出视图
        const overViewTop = el.offsetTop < height;
        const overViewLeft = elChildLeft > window.innerWidth - width;
        setDirection(overViewTop ? 'bottom' : 'top');
        setTipStyle({
            left: overViewLeft ? `calc(100% - ${width + 8}px)` : `${elChildLeft}px`,
            top: `${overViewTop ? position.bottom : (position.top - height)}px`
        });
        emit('visible-change', true);
    };
</script>
<style scoped lang="less">
    .tooltip {
        position: fixed;
        width: max-content;
        padding: 1px 5px;
        background-color: rgba(0, 0, 0, .7);
        border-radius: 3px;
        z-index: 9;

        &::before {
            content: "";
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
        }

        &.top {
            &::before {
                top: 100%;
                border-top: 4px solid rgba(0, 0, 0, .7);
            }
        }

        &.bottom {
            &::before {
                bottom: 100%;
                border-bottom: 4px solid rgba(0, 0, 0, .7);
            }
        }
    }
</style>


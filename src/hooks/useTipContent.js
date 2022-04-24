import {ref, nextTick} from 'vue';

export default el => {
    if (!el) {
        throw new Error('element is required');
    }
    const direction = ref('bottom');
    const styleOpt = ref({});

    const getTipSize = async () => {
        styleOpt.value = {
            visibility: 'hidden',
            display: 'block',
        };
        await nextTick();
        if (!el.value instanceof HTMLElement) {
            throw new Error('element is invalid');
        }
        const tipHeight = el.value.scrollHeight;
        const tipWidth = el.value.scrollWidth;
        styleOpt.value = {};

        return {
            height: tipHeight + 8, // 小三角高度+8
            width: tipWidth,
        };
    };

    const setTipStyle = opt => {
        styleOpt.value = opt;
    };

    const setDirection = opt => {
        direction.value = opt;
    };

    return {
        direction,
        styleOpt,
        getTipSize,
        setTipStyle,
        setDirection,
    };
};

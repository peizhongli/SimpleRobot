export default {
    mounted(el, binding, vNode) {
        let pressTimer = null;

        const startListen = e => {
            if (!pressTimer) {
                pressTimer = setTimeout(() => {
                    binding.value(el);
                }, 750);
            }
            e.preventDefault();
        };

        const endListen = () => {
            if (pressTimer) {
                clearTimeout(pressTimer);
                pressTimer = null;
            }
        };

        el.__longPressStart__ = startListen;
        el.__longPressEnd__ = endListen;
        el.addEventListener('touchstart', startListen);
        el.addEventListener('touchend', endListen);
        el.addEventListener('touchcancel', endListen);
        el.addEventListener('touchmove', endListen);
    },
    unmounted(el) {
        document.removeEventListener('touchstart', el.__longPressStart__);
        document.removeEventListener('touchend', el.__longPressEnd__);
        document.removeEventListener('touchcancel', el.__longPressEnd__);
        document.removeEventListener('touchmove', el.__longPressEnd__);
        delete el.__longPressStart__;
        delete el.__longPressEnd__;
    },
};

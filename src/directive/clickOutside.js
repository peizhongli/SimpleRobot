export default {
    mounted(el, binding, vnode) {
        const handler = e => {
            if (el.contains(e.target)) {
                return;
            }
            binding.value(e);
        };
        el.__clickOutside__ = handler;
        document.addEventListener('click', handler);
    },
    unmounted(el) {
        document.removeEventListener('click', el.__clickOutside__);
        delete el.__clickOutside__;
    },
};

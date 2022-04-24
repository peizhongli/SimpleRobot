<template>
    <div :class="`chat-item ${item.from}`">
        <Tooltip :visible="visible" @visible-change="onVisibleChange">
            <template #content>
                <button @click="handleDelete(item)" class="delete-btn">删除</button>
            </template>
            <template #default>
                <div class="chat-item-content">{{item.content}}</div>
                <div class="chat-item-time">{{item.time}}</div>
            </template>
        </Tooltip>
    </div>
</template>
<script setup>
    import {useSlots, ref} from 'vue';
    import Tooltip from '@/components/Tooltip.vue';

    const props = defineProps({
        item: Object,
    })

    const emit = defineEmits(['deleteItem']);

    const visible = ref(false);

    const onVisibleChange = value => {
        visible.value = value;
    };

    const handleDelete = item => {
        emit('deleteItem', item.id);
    };

</script>
<style lang="less" scoped>
    .delete-btn {
        color: #fff;
    }

    .chat-item {
        position: static;
        margin-bottom: 24px;

        :deep(.tooltip-el) {
            position: relative;
            width: 100%;
            display: flex;
        }

        &.mine {
            :deep(.tooltip-el) {
                justify-content: flex-end;
            }

            .chat-item-content {
                color: #fff;
                background-color: #8866ec;
                border-radius: 10px 10px 0 10px;
                box-shadow: 0 0 5px 0 rgba(136, 102, 236, .6);
            }
        }

        &.friend {
            .chat-item-content {
                background-color: #f5f5f5;
                border-radius: 10px 10px 10px 0;
                box-shadow: 0 0 5px 0 rgba(245, 245, 245, .6);
            }
        }

        &-content {
            padding: 10px;
            max-width: 80%;
            line-height: normal;
            animation: show .2s;
        }

        &-time {
            position: absolute;
            bottom: -18px;
            font-size: 12px;
            color: #999;
        }
    }

    @keyframes show {
        from {
            opacity: 0;
            transform: scale(.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
</style>

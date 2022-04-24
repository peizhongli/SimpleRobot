<template>
    <div class="chat-wrap">
        <h1 class="chat-title">{{robotName}}</h1>
        <section class="chat-list" ref="chatListWrap">
            <ChatItem v-for="item in chatList" :key="item.id" :item="item" @delete-item="deleteChat" />
        </section>
        <div class="chat-input-wrap">
            <input class="chat-input" type="text" maxlength="128" v-model="userInput" v-focus @keyup.enter="sendMes">
            <button
                class="send-btn"
                :disabled="!userInput.trim()"
                @click="sendMes"
            >发送</button>
        </div>
    </div>
</template>

<script setup>
import {nextTick, ref, watch} from 'vue';
import ChatItem from '@/components/ChatItem.vue';
import useChatList from '@/hooks/useChatList';
import useInput from '@/hooks/useInput';
import vFocus from '@/directive/focus';

defineProps({
    robotName: String,
})

const chatListWrap = ref(null);
const {chatList, pushChatLeft, sendChat, deleteChat} = useChatList();
const {userInput, clearInput} = useInput();

const sendMes = async () => {
    if(!userInput.value.trim()) {
        return;
    }
    sendChat(userInput.value);
    clearInput();
};

const scrollToEnd = async el => {
    await nextTick();
    el.scrollTop = el.scrollHeight;
};

// auto scroll
watch(chatList.value, () => {
    chatListWrap && scrollToEnd(chatListWrap.value);
})

window.setTimeout(() => {
    pushChatLeft('hello world!');
}, 1000);

</script>

<style scoped lang="less">
.chat {
    &-wrap {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    &-title {
        width: 100%;
        margin: 0;
        padding: 10px 0;
        font-size: 16px;
        text-align: center;
        box-shadow: 0 -5px 15px 0 rgba(0, 0, 0, .2);
    }
    &-list {
        position: relative;
        flex: 1;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    &-input {
        flex: 1;
        border: 0;
        outline: none;
        &-wrap {
            position: relative;
            display: flex;
            padding: 10px;

            &::before {
                position: absolute;
                box-sizing: border-box;
                content: ' ';
                pointer-events: none;
                top: -50%;
                right: -50%;
                bottom: -50%;
                left: -50%;
                border-top: 1px solid #eee;
                transform: scale(.5);
            }

            .send-btn {
                margin-left: 10px;
                height: 32px;
                padding: 0 8px;
                outline: none;
                border: 0;
                background-color: #8866ec;
                color: #fff;
                border-radius: 16px;

                &:disabled {
                    opacity: .6;
                }
            }
        }
    }
}
</style>

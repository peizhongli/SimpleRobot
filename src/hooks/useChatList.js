import {ref} from 'vue';
import {format} from 'date-fns';
import uuid from '@/utils/uuid';
import {postChatMes} from '@/api/chat';

export default () => {
    const chatList = ref([]);

    const pushChat = (content, from) => {
        const date = new Date();
        chatList.value.push({
            from,
            content,
            time: format(date, 'yyyy/mm/dd HH:MM'),
            id: uuid(),
        });
    };

    const pushChatLeft = content => {
        pushChat(content, 'friend');
    };

    const pushChatRight = content => {
        pushChat(content, 'mine');
    };

    const deleteChat = id => {
        const index = chatList.value.findIndex(i => i.id === id);
        chatList.value.splice(index, 1);
    };

    const fetchPostMessage = async text => {
        const {results: answers} = await postChatMes(text);
        answers && answers.forEach(i => {
            pushChatLeft(i.values.text);
        });
    };


    const sendChat = content => {
        pushChatRight(content);
        fetchPostMessage(content);
    };


    return {
        chatList,
        pushChatLeft,
        pushChatRight,
        sendChat,
        deleteChat,
    };
};

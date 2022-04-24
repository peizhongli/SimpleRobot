import {ref} from 'vue';

export default () => {
    const userInput = ref('');

    const clearInput = () => {
        userInput.value = '';
    };

    return {
        userInput,
        clearInput,
    };
};

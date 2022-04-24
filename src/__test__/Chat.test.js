import {mount} from '@vue/test-utils';
import Chat from '@/view/Chat';
import longpress from '@/directive/longPress';
import focus from '@/directive/focus';
import clickoutside from '@/directive/clickOutside';

describe('Chat', () => {
    const wrapper = mount(Chat, {
        global: {
            directives: {
                focus,
                longpress,
                clickoutside,
            },
        },
    });
    it('render correct contents', async () => {
        await wrapper.setProps({
            robotName: 'ninja',
        });
        expect(wrapper.find('.chat-title').text()).toBe('ninja');
        expect(wrapper.find('.send-btn').isDisabled()).toBeTruthy();
    });

    it('enter click to send correct mes', async () => {
        await wrapper.find('input[type="text"]').setValue('hello!');
        await wrapper.find('.send-btn').trigger('click');
        expect(wrapper.find('.chat-item').text()).toContain('hello!');
        expect(wrapper.find('.chat-item').classes()).toContain('mine');
        expect(wrapper.findAll('.chat-item')).toHaveLength(1);
    });

    it('enter delete btn to delete mes', async () => {
        await wrapper.find('.delete-btn').trigger('click');
        expect(wrapper.findAll('.chat-item')).toHaveLength(0);
    });
});

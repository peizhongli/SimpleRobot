import uuid from '@/utils/uuid';

test('uuid works', async () => {
    URL.createObjectURL = jest.fn(() => 'faker createObjectURL');
    URL.revokeObjectURL = jest.fn(() => 'faker revokeObjectURL');
    expect(uuid()).toBe('faker createObjectURL');
});

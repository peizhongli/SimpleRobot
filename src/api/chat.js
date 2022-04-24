import request from 'utils/axios';
import {TULING_API_KEY, REQ_TYPE} from '@/constants';

const userId = 'abc123';
// 登录方法
export const postChatMes = text => {
    return request({
        url: '/api/v2',
        method: 'post',
        data: {
            reqType: REQ_TYPE.TEXT,
            perception: {
                inputText: {
                    text,
                },
                // inputImage: {
                //     url: 'imageUrl'
                // },
                // selfInfo: {
                //     location: {
                //         city: '北京',
                //         province: '北京',
                //         street: '信息路'
                //     }
                // }
            },
            userInfo: {
                apiKey: TULING_API_KEY,
                userId,
            },
        },
    });
};

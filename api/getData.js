// api/getData.js
// 仅封装 GPS 数据读取
import { OneNetApi } from '../sdk.js';  // 确保 sdk.js 支持模块化，否则直接在 index.html 引入

const apiKey = 'tIEbQvV3+u9IZvVwlIZZtZ10F8QmEeU12Koqjx30StqQBBVXMtkqdmgDY4+mCZBw';  // 替换你的 Master-APIKey
const deviceId = 2469496646;          // 替换你的设备ID
const api = new OneNetApi(apiKey);

export async function getGPS() {
    return new Promise((resolve, reject) => {
        api.getDataStreams(deviceId).done(function(data){
            if(data.data){
                const gpsStream = data.data.find(stream => stream.id === 'GPS');
                if(gpsStream && gpsStream.current_value){
                    resolve(gpsStream.current_value);
                } else {
                    reject('GPS数据为空');
                }
            } else {
                reject('获取失败');
            }
        });
    });
}

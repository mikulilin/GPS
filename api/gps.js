// Vercel Serverless Function
import fetch from 'node-fetch';
import crypto from 'crypto';

// 用户填写：产品信息
const PRODUCT_ID = 'dyLIMxujKq';
const DEVICE_NAME = 'nbiot';
const API_KEY = '你的OneNET设备APIKey';

export default async function handler(req, res) {
  try {
    // 当前时间戳
    const now = Math.floor(Date.now() / 1000);
    const et = now + 300; // token 有效期 5 分钟

    const resStr = `products/${PRODUCT_ID}/devices/${DEVICE_NAME}`;
    const method = 'md5';
    const signStr = resStr + et + method + API_KEY;

    const sign = crypto.createHash('md5').update(signStr).digest('base64');

    const authorization = `version=2018-10-31&res=${encodeURIComponent(resStr)}&et=${et}&method=${method}&sign=${encodeURIComponent(sign)}`;

    const url = `https://api.heclouds.com/devices/${DEVICE_NAME}/datapoints`;

    const params = new URLSearchParams({
      datastream_id: 'GPS',
      limit: '10'
    });

    const response = await fetch(`${url}?${params.toString()}`, {
      headers: {
        'Authorization': authorization,
        'Accept': 'application/json'
      }
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

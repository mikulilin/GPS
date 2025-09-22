// api/gps.js
import https from 'https';
import url from 'url';

export default function handler(req, res) {
  // OneNET 设备信息
  const PRODUCT_ID = 'dyLIMxujKq';
  const DEVICE_NAME = 'nbiot';
  const API_KEY = 'bzBsTjREcEh0azVBb0FCNkp3WG1tUGJFajlEWTRBcHA=';

  // 构建查询参数
  const queryParams = new url.URLSearchParams({
    product_id: PRODUCT_ID,
    device_name: DEVICE_NAME,
    datastream_id: 'GPS',
    limit: '10'
  }).toString();

  const options = {
    hostname: 'iot-api.heclouds.com',
    path: '/datapoint/history-datapoints?' + queryParams,
    method: 'GET',
    headers: {
      'Authorization': API_KEY,
      'Accept': 'application/json'
    }
  };

  https.get(options, (oneRes) => {
    let data = '';
    oneRes.on('data', (chunk) => { data += chunk; });
    oneRes.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        res.status(200).json(jsonData);
      } catch (err) {
        res.status(500).json({ error: '返回不是合法JSON', raw: data });
      }
    });
  }).on('error', (err) => {
    res.status(500).json({ error: err.message });
  });
}

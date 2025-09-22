// 使用 Node 18+ 原生 fetch，无需 node-fetch
export default async function handler(req, res) {
  const PRODUCT_ID = "dyLIMxujKq";
  const DEVICE_NAME = "nbiot";
  const AUTH_TOKEN = "version=2022-05-01&res=userid%2F464993&et=1758508478&method=sha1&sign=uVq%2FUSFNtfKq9yth7RNVLNICUD8%3D";

  const url = `https://iot-api.heclouds.com/datapoint/history-datapoints?product_id=${PRODUCT_ID}&device_name=${DEVICE_NAME}&datastream_id=GPS&limit=10`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": AUTH_TOKEN,
        "Accept": "application/json",
      },
    });

    const text = await response.text();

    try {
      const data = JSON.parse(text);
      res.status(200).json(data);
    } catch (jsonErr) {
      console.error("非 JSON 响应:", text);
      res.status(500).json({ error: "非 JSON 响应", raw: text });
    }
  } catch (err) {
    console.error("请求失败:", err);
    res.status(500).json({ error: err.message });
  }
}

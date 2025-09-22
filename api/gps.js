export default async function handler(req, res) {
  const PRODUCT_ID = "dyLIMxujKq";
  const DEVICE_NAME = "nbiot";
  const AUTH_TOKEN = "version=2022-05-01&res=userid%2F464993&et=1758508478&method=sha1&sign=uVq%2FUSFNtfKq9yth7RNVLNICUD8%3D";

  const url = `https://iot-api.heclouds.com/datapoint/history-datapoints?product_id=${PRODUCT_ID}&device_name=${DEVICE_NAME}&datastream_id=GPS&limit=10`;

  try {
    const response = await fetch(url, {
      headers: {
        "Authorization": AUTH_TOKEN,
        "Accept": "application/json"
      }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "获取数据失败", details: err.toString() });
  }
}

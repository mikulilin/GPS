export default async function handler(req, res) {
  try {
    const PRODUCT_ID = "dyLIMxujKq";
    const DEVICE_NAME = "nbiot";
    const AUTH_TOKEN = "version=2018-10-31&res=products%2FdyLIMxujKq%2Fdevices%2Fnbiot&et=9958183737&method=md5&sign=repoGc9KTRy9kUS0Nfm32g%3D%3D";

    const url = `https://iot-api.heclouds.com/datapoint/history-datapoints?product_id=${PRODUCT_ID}&device_name=${DEVICE_NAME}&datastream_id=GPS&limit=5`;

    const response = await fetch(url, {
      headers: {
        Authorization: AUTH_TOKEN,
        Accept: "application/json"
      }
    });

    // 如果 OneNET 返回的不是 JSON，会直接抛错
    const text = await response.text();
    try {
      const data = JSON.parse(text);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: "OneNET 返回的不是 JSON", raw: text });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

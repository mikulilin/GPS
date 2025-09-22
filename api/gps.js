// api/gps.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const PRODUCT_ID = "dyLIMxujKq";      // 替换为你的产品ID
  const DEVICE_NAME = "nbiot";          // 替换为你的设备名称
  const AUTH_TOKEN = "version=2022-05-01&res=userid%2F464993&et=1758508478&method=sha1&sign=uVq%2FUSFNtfKq9yth7RNVLNICUD8%3D"; // 替换为你的 token

  const url = `https://iot-api.heclouds.com/datapoint/history-datapoints?product_id=${PRODUCT_ID}&device_name=${DEVICE_NAME}&datastream_id=GPS&limit=10`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": AUTH_TOKEN,
        "Accept": "application/json"
      }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch GPS data", details: error.message });
  }
}

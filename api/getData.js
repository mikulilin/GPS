import fetch from "node-fetch";

export default async function handler(req, res) {
  const product_id = "dyLIMxujKq";    // 替换为你的 product_id
  const device_name = "nbiot";        // 替换为你的 device_name
  const authorization = "version=2022-05-01&res=userid%2F464993&et=1758443149&method=sha1&sign=rbw8Y0jOBxvTb9ule0R7qrguUi4%3D"; // 替换为你的签名

  const url = `https://api.heclouds.com/datapoint/history-datapoints?product_id=${product_id}&device_name=${device_name}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "authorization": authorization
      }
    });

    const contentType = response.headers.get("content-type") || "";
    let data;

    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.error("OneNET 返回非 JSON 数据:", text);
      data = { dp: { GPS: [], Longitude: [], Latitude: [] }, message: "OneNET 返回非 JSON 数据", raw: text };
    }

    // 提取 datastreams
    if (data.code === 0 && data.data && data.data.datastreams) {
      const dp = { GPS: [], Longitude: [], Latitude: [] };
      data.data.datastreams.forEach(ds => {
        if (dp.hasOwnProperty(ds.id)) dp[ds.id] = ds.datapoints;
      });
      data.dp = dp;
    } else {
      data.dp = { GPS: [], Longitude: [], Latitude: [] };
    }

    res.status(200).json(data);

  } catch (err) {
    console.error("请求 OneNET 出错:", err);
    res.status(200).json({ dp: { GPS: [], Longitude: [], Latitude: [] }, message: "请求 OneNET 出错: " + err.message });
  }
}

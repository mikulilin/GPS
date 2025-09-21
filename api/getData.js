import fetch from "node-fetch"; // Vercel Node.js 环境需要

export default async function handler(req, res) {
  const deviceId = "2469496646"; // 替换为你的设备ID
  const apiKey = "version=2018-10-31&res=products%2FdyLIMxujKq%2Fdevices%2Fnbiot&et=9998183737&method=md5&sign=mNhuxhUEoHGTLQegr2Wbjw%3D%3D"; // 替换为你的 API Key

  const url = `https://api.heclouds.com/devices/${deviceId}/datapoint/history-datapoints?datastream_id=GPS`;

  try {
    const response = await fetch(url, {
      headers: { "api-key": apiKey }
    });

    const text = await response.text(); // 获取原始返回
    console.log("OneNET 返回:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseErr) {
      console.error("JSON 解析失败:", parseErr);
      data = null;
    }

    // 判断返回是否有 GPS 数据
    if (data && data.dp && data.dp.GPS && data.dp.GPS.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(200).json({ dp: { GPS: [] }, message: "设备暂无 GPS 数据" });
    }

  } catch (err) {
    console.error("请求 OneNET 出错:", err);
    res.status(200).json({ dp: { GPS: [] }, message: "请求 OneNET 出错: " + err.message });
  }
}

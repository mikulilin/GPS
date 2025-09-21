import fetch from "node-fetch";

export default async function handler(req, res) {
  const deviceId = "2469496646"; // 替换为你的设备ID
  const apiKey = "version=2018-10-31&res=products%2FdyLIMxujKq%2Fdevices%2Fnbiot&et=9998183737&method=md5&sign=mNhuxhUEoHGTLQegr2Wbjw%3D%3D"; // 替换为你的 API Key

  const url = `https://api.heclouds.com/devices/${deviceId}/datapoint/history-datapoints?datastream_id=GPS`;

  try {
    const response = await fetch(url, { headers: { "api-key": apiKey } });

    const contentType = response.headers.get("content-type") || "";
    let data;

    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      // OneNET 返回 HTML 或错误文本
      const text = await response.text();
      console.error("OneNET 返回非 JSON 数据:", text);
      data = { dp: { GPS: [] }, message: "OneNET 返回非 JSON 数据，请检查 API Key 或设备状态", raw: text };
    }

    // 保证 dp.GPS 存在
    if (!data.dp || !data.dp.GPS) data.dp = { GPS: [] };
    if (!data.message) data.message = data.dp.GPS.length > 0 ? "" : "设备暂无 GPS 数据";

    res.status(200).json(data);

  } catch (err) {
    console.error("请求 OneNET 出错:", err);
    res.status(200).json({ dp: { GPS: [] }, message: "请求 OneNET 出错: " + err.message });
  }
}

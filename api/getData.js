import fetch from "node-fetch";

export default async function handler(req, res) {
  const deviceId = "2469496646"; // 替换为你的设备ID
  const apiKey = "version=2018-10-31&res=products%2FdyLIMxujKq%2Fdevices%2Fnbiot&et=9998183737&method=md5&sign=mNhuxhUEoHGTLQegr2Wbjw%3D%3D"; // 替换为你的 API Key

  const url = `https://api.heclouds.com/devices/${deviceId}/datapoint/history-datapoints?datastream_id=GPS`;

  try {
    const response = await fetch(url, { headers: { "api-key": apiKey } });

    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      const text = await response.text();
      console.error("OneNET 返回非 JSON 数据:", text);
      res.status(200).json({
        dp: { GPS: [] },
        message: "OneNET 返回非 JSON 数据，请检查 API Key 或设备状态",
        raw: text
      });
      return;
    }

    const data = await response.json();

    // 判断是否有 GPS 数据
    if (data && data.dp && data.dp.GPS && data.dp.GPS.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(200).json({
        dp: { GPS: [] },
        message: "设备暂无 GPS 数据"
      });
    }

  } catch (err) {
    console.error("请求 OneNET 出错:", err);
    res.status(200).json({
      dp: { GPS: [] },
      message: "请求 OneNET 出错: " + err.message
    });
  }
}

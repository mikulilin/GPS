export default async function handler(req, res) {
  const deviceId = "2469496646";  // 替换为你的设备ID
  const apiKey = "version=2018-10-31&res=products%2FdyLIMxujKq%2Fdevices%2Fnbiot&et=9998183737&method=md5&sign=mNhuxhUEoHGTLQegr2Wbjw%3D%3D"; // 替换为你的 API Key

  // 查询历史数据点
  const url = `https://api.heclouds.com/devices/${deviceId}/datapoint/history-datapoints?datastream_id=GPS`;

  try {
    const response = await fetch(url, {
      headers: { "api-key": apiKey }
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

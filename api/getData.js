export default async function handler(req, res) {
  const deviceId = "2469496646";      // 替换为你的 OneNET 设备ID
  const apiKey = "version=2018-10-31&res=products%2FdyLIMxujKq%2Fdevices%2Fnbiot&et=1758183737&method=md5&sign=bbDmpi9BkOWjLa6HWBlf1g%3D%3D";        // 替换为你的 OneNET API Key

  const url = `https://api.heclouds.com/devices/${deviceId}/datapoint/history-datapoints?datastream_id=GPS`;

  try {
    const response = await fetch(url, {
      headers: {
        "api-key": apiKey
      }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

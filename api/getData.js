export default async function handler(req, res) {
  const deviceId = "你的设备ID";      // 替换为你的 OneNET 设备ID
  const apiKey = "你的APIKey";        // 替换为你的 OneNET API Key

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

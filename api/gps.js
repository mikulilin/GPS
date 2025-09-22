export default async function handler(req, res) {
  try {
    const response = await fetch("https://iot-api.heclouds.com/datapoint/history-datapoints?product_id=dyLIMxujKq&device_name=nbiot&datastream_id=GPS&limit=10", {
      headers: {
        Authorization: "version=2022-05-01&res=userid%2F464993&et=1758508478&method=sha1&sign=uVq%2FUSFNtfKq9yth7RNVLNICUD8%3D"
      }
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    console.error("获取数据失败:", error);
    res.status(500).json({ error: "获取数据失败" });
  }
}

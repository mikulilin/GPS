export default async function handler(req, res) {
  try {
    const response = await fetch("https://iot-api.heclouds.com/datapoint/history-datapoints?product_id=dyLIMxujKq&device_name=nbiot&datastream_id=GPS&limit=10", {
      headers: {
        Authorization: "version=2018-10-31&res=products%2FdyLIMxujKq%2Fdevices%2Fnbiot&et=9958183737&method=md5&sign=repoGc9KTRy9kUS0Nfm32g%3D%3D"
      }
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    console.error("获取数据失败:", error);
    res.status(500).json({ error: "获取数据失败" });
  }
}

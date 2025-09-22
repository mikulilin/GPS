import requests
import json

# 用户自己填写
PRODUCT_ID = "dyLIMxujKq"
DEVICE_NAME = "nbiot"
AUTH_TOKEN = "version=2018-10-31&res=products%2FdyLIMxujKq%2Fdevices%2Fnbiot&et=1798183737&method=md5&sign=w7deU9zmFKjLEVUb4umy6w%3D%3D"

def get_gps_history():
    url = "https://iot-api.heclouds.com/datapoint/history-datapoints"
    params = {
        "product_id": PRODUCT_ID,
        "device_name": DEVICE_NAME,
        "datastream_id": "GPS",
        "limit": 10
    }
    headers = {
        "Authorization": AUTH_TOKEN,
        "Accept": "application/json"
    }
    try:
        response = requests.get(url, params=params, headers=headers)
        data = response.json()
        datastreams = data.get("data", {}).get("datastreams", [])
        gps_list = []
        if datastreams:
            gps_points = datastreams[0].get("datapoints", [])
            for point in gps_points:
                value = point.get("value")
                gps_list.append({
                    "time": point.get("at"),
                    "lat": value.get("lat"),
                    "lon": value.get("lon")
                })
        return {"code": 0, "gps": gps_list}
    except Exception as e:
        return {"code": -1, "error": str(e), "raw": response.text}

def handler(event, context):
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(get_gps_history())
    }

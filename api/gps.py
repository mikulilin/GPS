import json
import requests
import os

# 环境变量方式存储，避免写死在代码中
PRODUCT_ID = os.environ.get("PRODUCT_ID", "dyLIMxujKq")
DEVICE_NAME = os.environ.get("DEVICE_NAME", "nbiot")
AUTH_TOKEN = os.environ.get("AUTH_TOKEN", "在这里填你的Authorization")

def handler(request):
    """
    Vercel serverless function entry
    """
    url = "https://iot-api.heclouds.com/datapoint/history-datapoints"
    headers = {
        "Accept": "application/json, text/plain, */*",
        "authorization": AUTH_TOKEN
    }
    params = {
        "product_id": PRODUCT_ID,
        "device_name": DEVICE_NAME,
        "datastream_id": "GPS",
        "limit": 50  # 最近50条
    }
    
    try:
        resp = requests.get(url, headers=headers, params=params)
        data = resp.json()
        # 只返回 GPS 数据点
        gps_points = []
        datastreams = data.get("data", {}).get("datastreams", [])
        for stream in datastreams:
            if stream.get("id") == "GPS":
                for point in stream.get("datapoints", []):
                    gps_points.append({
                        "time": point.get("at"),
                        "lat": point.get("value", {}).get("lat"),
                        "lon": point.get("value", {}).get("lon")
                    })
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps(gps_points)
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }

import json
import requests

# 用户填写
PRODUCT_ID = "dyLIMxujKq"
DEVICE_NAME = "nbiot"
AUTH_TOKEN = "version=2022-05-01&res=userid%2F464993&et=1758508478&method=sha1&sign=uVq%2FUSFNtfKq9yth7RNVLNICUD8%3D"

def handler(request):
    """
    Vercel Serverless Python API
    """
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
        resp = requests.get(url, params=params, headers=headers)
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": resp.text  # 直接返回原始数据
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"error": str(e)})
        }

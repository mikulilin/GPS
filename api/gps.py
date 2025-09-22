import json
import requests
from datetime import datetime
from flask import Flask, jsonify, request

# 如果使用 Vercel 的 Serverless Functions，就不需要 Flask 直接返回 dict 也行
# 这里假设用 Flask 方便本地调试

app = Flask(__name__)

# ==== 用户填写 ====
PRODUCT_ID = "dyLIMxujKq"  # 你的产品ID
DEVICE_NAME = "nbiot"      # 你的设备名称
AUTH_TOKEN = "version=2022-05-01&res=userid%2F464993&et=1758508478&method=sha1&sign=uVq%2FUSFNtfKq9yth7RNVLNICUD8%3D"
# =================

def get_gps_history(product_id, device_name, auth_token, limit=10):
    url = "https://iot-api.heclouds.com/datapoint/history-datapoints"
    params = {
        "product_id": product_id,
        "device_name": device_name,
        "datastream_id": "GPS",
        "limit": limit
    }
    headers = {
        "Authorization": auth_token,
        "Accept": "application/json"
    }

    response = requests.get(url, params=params, headers=headers)
    try:
        data = response.json()
        return data
    except Exception as e:
        return {"error": str(e), "raw": response.text}

@app.route("/api/gps", methods=["GET"])
def fetch_gps():
    data = get_gps_history(PRODUCT_ID, DEVICE_NAME, AUTH_TOKEN)
    return jsonify(data)

# Flask 本地调试入口
if __name__ == "__main__":
    app.run(debug=True)

import urllib3, requests, base64

model_id = "zq8yyogw"
# Read secrets from environment variables
baseten_api_key = "ZHj7mFSL.fV6nUTwrqBhiHWRvKS62daiz4oNjEMyG"
"https://model-zq8yyogw.api.baseten.co/development/predict",
# Open a local file
with open("sample3.m4a", "rb") as f: 
    encoded_audio = base64.b64encode(f.read()).decode("utf-8")
    
# Define the data payload
data = {"audio_data": encoded_audio}
# Make the POST request
# response = requests.post(url, headers=headers, data=data) 
resp = urllib3.request(
    "POST",
    # Endpoint for production deployment, see API reference for more
    f"https://model-{model_id}.api.baseten.co/production/predict",
    headers={"Authorization": f"Api-Key {baseten_api_key}"},
    json=data
)
data = resp.json()
print(data)

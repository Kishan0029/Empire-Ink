
import urllib.request, json
req = urllib.request.Request("http://127.0.0.1:8002/api/v1/generations/",
                             data=json.dumps({
                                 "prompt": "A Mughal emperor standing in a grand palace courtyard",
                                 "seed": 42,
                                 "steps": 4,
                                 "guidance_scale": 3.5,
                                 "lora_strength": 0.7
                             }).encode('utf-8'),
                             headers={'Content-Type': 'application/json'})
with urllib.request.urlopen(req) as res:
    print(res.read().decode())

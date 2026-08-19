
import urllib.request, json
req = urllib.request.Request("http://127.0.0.1:8002/api/v1/generations/gen_5f512d97")
with urllib.request.urlopen(req) as res:
    print(res.read().decode())

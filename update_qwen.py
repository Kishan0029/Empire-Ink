
with open('/home/jovyan/empire-and-ink/backend/services/generation_service.py', 'r') as f:
    code = f.read()
code = code.replace('device_map="cpu"', 'device_map="cuda"')
code = code.replace('max_new_tokens=80', 'max_new_tokens=48')
with open('/home/jovyan/empire-and-ink/backend/services/generation_service.py', 'w') as f:
    f.write(code)

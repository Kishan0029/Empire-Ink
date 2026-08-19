with open('/home/jovyan/empire-and-ink/backend/services/generation_service.py', 'r') as f:
    code = f.read()
old = '''        # Temporary test: bypass Qwen.
        enhanced_prompt = user_prompt
        qwen_time = 0'''
new = '''        # Qwen prompt enhancement
        qwen_start = time.time()
        enhanced_prompt = self.enhance_prompt(user_prompt)
        qwen_time = time.time() - qwen_start'''
if old in code:
    with open('/home/jovyan/empire-and-ink/backend/services/generation_service.py', 'w') as f:
        f.write(code.replace(old, new))
    print('Replaced successfully.')
else:
    print('Old string not found.')

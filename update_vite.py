
import sys
with open('/home/jovyan/empire-and-ink/vite.config.ts', 'r') as f:
    content = f.read()

content = content.replace("base: '/notebook/s-jcer-ece-112/internship/proxy/5173/',", "base: './',")

with open('/home/jovyan/empire-and-ink/vite.config.ts', 'w') as f:
    f.write(content)
print("Updated base path back to './'")

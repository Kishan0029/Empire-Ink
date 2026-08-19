
import sys

with open('/home/jovyan/empire-and-ink/src/app/api/services/generationService.ts', 'r') as f:
    content = f.read()

content = content.replace('"/generations", {', '"/generations/", {')

with open('/home/jovyan/empire-and-ink/src/app/api/services/generationService.ts', 'w') as f:
    f.write(content)
print("Added trailing slash to generationService")

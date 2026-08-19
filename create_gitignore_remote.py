
import os

content = '''# Dependencies
node_modules/
.pnp
.pnp.js

# Build outputs
dist/
dist-ssr/
build/
*.png

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
share/python-wheels/
*.egg-info/
.installed.cfg
*.egg

# Virtual environments
venv/
env/
ENV/
env.bak/
venv.bak/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# OS files
.DS_Store
Thumbs.db

# Project specific ignores
outputs/
mughalz/*.safetensors
cloudflared
cloudflared.exe
'''

with open('/home/jovyan/empire-and-ink/.gitignore', 'w') as f:
    f.write(content)

print("Created .gitignore")

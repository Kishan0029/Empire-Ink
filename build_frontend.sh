
#!/bin/bash
cd /home/jovyan/empire-and-ink
export PATH=/opt/conda/envs/empire/bin:$PATH
npm run build
nohup python3 -m http.server 5173 --directory dist > frontend.log 2>&1 &

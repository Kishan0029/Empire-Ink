
#!/bin/bash
cd /home/jovyan/empire-and-ink
export PATH=/opt/conda/envs/empire/bin:$PATH
nohup npm run dev -- --host 0.0.0.0 --port 5173 > frontend.log 2>&1 &

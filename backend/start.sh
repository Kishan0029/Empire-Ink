#!/bin/bash
cd /home/jovyan/empire-and-ink/backend
nohup /opt/conda/envs/empire/bin/python -m uvicorn app.main:app --host 0.0.0.0 --port 8002 > /home/jovyan/empire-and-ink/backend/server.log 2>&1 &

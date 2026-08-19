
import os

content = '''#!/usr/bin/env bash

set -e

PROJECT_DIR="$HOME/empire-and-ink"
ENV_NAME="empire"

echo "============================================================"
echo "        EMPIRE & INK — 1-TAP DGX RESTORE"
echo "============================================================"

cd "$PROJECT_DIR"

echo ""
echo "[1/6] Setting up Conda environment..."

# Source Conda
source "$(conda info --base)/etc/profile.d/conda.sh"

if conda env list | awk '{print $1}' | grep -qx "$ENV_NAME"; then
    echo "Environment '$ENV_NAME' already exists."
else
    conda create -y -n "$ENV_NAME" python=3.11
fi

conda activate "$ENV_NAME"

echo ""
echo "[2/6] Installing Python dependencies..."

if python -c "import torch" >/dev/null 2>&1; then
    echo "PyTorch already installed."
else
    pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 --index-url https://download.pytorch.org/whl/cu124
fi

pip install transformers diffusers accelerate peft safetensors sentencepiece bitsandbytes huggingface_hub fastapi uvicorn pydantic sqlalchemy

echo ""
echo "[3/6] Downloading AI Models..."

python download_models.py

echo ""
echo "[4/6] Building Frontend..."

if ! command -v npm >/dev/null 2>&1; then
    echo "npm not found. Attempting to install nodejs..."
    conda install -y -c conda-forge nodejs
fi

npm install
npm run build

echo ""
echo "[5/6] Starting Backend API..."

# Kill existing uvicorn if any
pkill -f "uvicorn app.main:app" || true
nohup uvicorn app.main:app --host 0.0.0.0 --port 8002 > backend.log 2>&1 &

echo ""
echo "[6/6] Starting Frontend Server..."

# Kill existing python http server if any
pkill -f "python3 -m http.server 5173" || true
nohup python3 -m http.server 5173 --directory dist > frontend.log 2>&1 &

echo ""
echo "============================================================"
echo "        RESTORE COMPLETE"
echo "============================================================"
echo "Backend running on port 8002"
echo "Frontend running on port 5173"
'''

with open('/home/jovyan/empire-and-ink/restore_dgx.sh', 'w') as f:
    f.write(content)

os.chmod('/home/jovyan/empire-and-ink/restore_dgx.sh', 0o755)

print("Created restore_dgx.sh")

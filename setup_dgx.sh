#!/usr/bin/env bash

set -e

REPO_URL="https://github.com/Kishan0029/Empire-Ink.git"
PROJECT_DIR="$HOME/empire-and-ink"
ENV_NAME="empire"

echo "============================================================"
echo "        EMPIRE & INK — DGX ONE-CLICK SETUP"
echo "============================================================"

echo ""
echo "[1/9] Checking GPU..."

nvidia-smi

echo ""
echo "[2/9] Restoring repository..."

if [ -d "$PROJECT_DIR/.git" ]; then
    cd "$PROJECT_DIR"
    git fetch origin
    git reset --hard origin/main
else
    git clone "$REPO_URL" "$PROJECT_DIR"
    cd "$PROJECT_DIR"
fi

echo ""
echo "[3/9] Setting up Git LFS..."

if ! command -v git-lfs >/dev/null 2>&1; then
    conda install -y -c conda-forge git-lfs
fi

git lfs install
git lfs pull

if [ ! -f "$PROJECT_DIR/mughalz/mughalz.safetensors" ]; then
    echo "ERROR: MughalZ LoRA missing."
    exit 1
fi

echo "MughalZ restored:"
ls -lh "$PROJECT_DIR/mughalz/mughalz.safetensors"

echo ""
echo "[4/9] Setting up Conda environment..."

source "$(conda info --base)/etc/profile.d/conda.sh"

if conda env list | awk '{print $1}' | grep -qx "$ENV_NAME"; then
    echo "Environment '$ENV_NAME' already exists."
else
    conda create -y -n "$ENV_NAME" python=3.11
fi

conda activate "$ENV_NAME"

python --version

echo ""
echo "[5/9] Checking PyTorch..."

if python -c "import torch" >/dev/null 2>&1; then
    echo "PyTorch already installed."
    python -c "import torch; print('Torch:', torch.__version__)"
else
    pip install \
        torch==2.6.0 \
        torchvision==0.21.0 \
        torchaudio==2.6.0 \
        --index-url https://download.pytorch.org/whl/cu124
fi

echo ""
echo "[6/9] Installing AI dependencies..."

pip install \
    transformers \
    diffusers \
    accelerate \
    peft \
    safetensors \
    sentencepiece \
    bitsandbytes \
    huggingface_hub \
    fastapi \
    uvicorn \
    streamlit

echo ""
echo "[7/9] Restoring Qwen + FLUX..."

if [ ! -f "$PROJECT_DIR/download_models.py" ]; then
    echo "ERROR: download_models.py is missing."
    exit 1
fi

python download_models.py

echo ""
echo "[8/9] Verifying GPU + AI environment..."

python - <<'PY'
import torch

print("=" * 60)
print("EMPIRE & INK ENVIRONMENT CHECK")
print("=" * 60)

print("Torch:", torch.__version__)
print("CUDA:", torch.version.cuda)
print("CUDA available:", torch.cuda.is_available())

if not torch.cuda.is_available():
    raise RuntimeError("CUDA is not available.")

gpu = torch.cuda.get_device_name(0)
print("GPU:", gpu)

vram = torch.cuda.get_device_properties(0).total_memory / 1024**3
print("VRAM:", round(vram, 1), "GB")

if "H200" not in gpu:
    print("WARNING: Expected NVIDIA H200.")

print("GPU verification: OK")
PY

echo ""
echo "[9/9] Setup complete."

echo ""
echo "============================================================"
echo "        EMPIRE & INK READY"
echo "============================================================"

echo ""
echo "Project:"
echo "$PROJECT_DIR"

echo ""
echo "Environment:"
echo "conda activate $ENV_NAME"

echo ""
echo "Streamlit:"
echo "streamlit run streamlit_app.py --server.address 0.0.0.0 --server.port 8501"

echo ""
echo "============================================================"

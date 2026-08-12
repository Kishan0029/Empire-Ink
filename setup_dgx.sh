#!/usr/bin/env bash

set -e

# ============================================================
# EMPIRE & INK — DGX ONE-CLICK SETUP
# ============================================================

REPO_URL="https://github.com/Kishan0029/Empire-Ink.git"
PROJECT_DIR="$HOME/empire-and-ink"
ENV_NAME="empire"

echo "============================================================"
echo "        EMPIRE & INK — DGX SETUP"
echo "============================================================"

# ------------------------------------------------------------
# 1. GPU
# ------------------------------------------------------------

echo ""
echo "[1/8] Checking GPU..."

nvidia-smi

# ------------------------------------------------------------
# 2. Repository
# ------------------------------------------------------------

echo ""
echo "[2/8] Restoring repository..."

if [ -d "$PROJECT_DIR/.git" ]; then

    cd "$PROJECT_DIR"

    echo "Repository exists. Updating..."

    git fetch origin
    git reset --hard origin/main

else

    echo "Repository not found. Cloning..."

    git clone "$REPO_URL" "$PROJECT_DIR"
    cd "$PROJECT_DIR"

fi

# ------------------------------------------------------------
# 3. Git LFS
# ------------------------------------------------------------

echo ""
echo "[3/8] Setting up Git LFS..."

if ! command -v git-lfs >/dev/null 2>&1; then

    echo "Git LFS not found. Installing..."

    conda install -y -c conda-forge git-lfs

fi

git lfs install
git lfs pull

# ------------------------------------------------------------
# 4. Conda environment
# ------------------------------------------------------------

echo ""
echo "[4/8] Setting up Conda environment..."

source "$(conda info --base)/etc/profile.d/conda.sh"

if conda env list | awk '{print $1}' | grep -qx "$ENV_NAME"; then

    echo "Environment '$ENV_NAME' already exists."

else

    echo "Creating Python 3.11 environment..."

    conda create -y -n "$ENV_NAME" python=3.11

fi

conda activate "$ENV_NAME"

# ------------------------------------------------------------
# 5. PyTorch
# ------------------------------------------------------------

echo ""
echo "[5/8] Installing PyTorch..."

pip install \
    torch==2.6.0 \
    torchvision==0.21.0 \
    torchaudio==2.6.0 \
    --index-url https://download.pytorch.org/whl/cu124

# ------------------------------------------------------------
# 6. AI dependencies
# ------------------------------------------------------------

echo ""
echo "[6/8] Installing AI dependencies..."

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

# ------------------------------------------------------------
# 7. Verify MughalZ + CUDA
# ------------------------------------------------------------

echo ""
echo "[7/8] Verifying installation..."

if [ ! -f "$PROJECT_DIR/mughalz/mughalz.safetensors" ]; then

    echo ""
    echo "ERROR: MughalZ LoRA was not downloaded."
    echo ""
    echo "Run:"
    echo "    git lfs pull"
    echo ""
    exit 1

fi

echo "MughalZ:"
ls -lh "$PROJECT_DIR/mughalz/mughalz.safetensors"

echo ""
echo "Checking Python + CUDA..."

python - <<'PY'

import torch

print("Python environment OK")
print("Torch:", torch.__version__)
print("CUDA:", torch.version.cuda)
print("CUDA available:", torch.cuda.is_available())

if not torch.cuda.is_available():
    raise RuntimeError("CUDA is not available.")

gpu = torch.cuda.get_device_name(0)

print("GPU:", gpu)

vram = (
    torch.cuda.get_device_properties(0).total_memory
    / 1024**3
)

print("VRAM:", round(vram, 1), "GB")

if "H200" not in gpu:
    print("WARNING: Expected H200 GPU.")

PY

# ------------------------------------------------------------
# 8. Finish
# ------------------------------------------------------------

echo ""
echo "============================================================"
echo "        EMPIRE & INK SETUP COMPLETE"
echo "============================================================"

echo ""
echo "Project:"
echo "$PROJECT_DIR"

echo ""
echo "Activate environment:"
echo "conda activate $ENV_NAME"

echo ""
echo "Run Streamlit:"
echo "streamlit run streamlit_app.py --server.address 0.0.0.0 --server.port 8501"

echo ""
echo "============================================================"

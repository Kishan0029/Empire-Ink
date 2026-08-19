
import os
from pathlib import Path

content = '''from pathlib import Path
from huggingface_hub import snapshot_download, hf_hub_download
import os

MODELS = {
    "Qwen2.5-7B-Instruct": "Qwen/Qwen2.5-7B-Instruct",
    "FLUX.1-dev": "black-forest-labs/FLUX.1-dev",
}

def model_exists(repo_id: str) -> bool:
    cache_dir = Path.home() / ".cache" / "huggingface" / "hub"
    repo_folder = "models--" + repo_id.replace("/", "--")
    model_path = cache_dir / repo_folder
    return model_path.exists() and any(model_path.iterdir())

def download_model(name: str, repo_id: str):
    print("=" * 60)
    print(f"MODEL: {name}")
    print(f"REPO:  {repo_id}")
    print("=" * 60)

    if model_exists(repo_id):
        print("✓ Already exists in Hugging Face cache.")
        print("  Skipping download.")
        return

    print("Model not found locally.")
    print("Downloading from Hugging Face...")
    snapshot_download(repo_id=repo_id)
    print("✓ Download complete.")

def download_lora():
    print("=" * 60)
    print("MODEL: MughalZ LoRA")
    print("REPO:  mughalz/mughalz.safetensors")
    print("=" * 60)
    
    lora_dir = Path("/home/jovyan/empire-and-ink/mughalz")
    lora_dir.mkdir(parents=True, exist_ok=True)
    lora_path = lora_dir / "mughalz.safetensors"
    
    if lora_path.exists():
        print("✓ Already exists locally.")
        return
        
    print("Downloading LoRA from Hugging Face...")
    try:
        hf_hub_download(
            repo_id="mughalz/mughalz.safetensors",
            filename="mughalz.safetensors",
            local_dir=str(lora_dir),
            local_dir_use_symlinks=False
        )
        print("✓ Download complete.")
    except Exception as e:
        print(f"Error downloading LoRA: {e}")

def main():
    print()
    print("=" * 60)
    print("EMPIRE & INK — MODEL CHECK")
    print("=" * 60)
    print()

    for name, repo_id in MODELS.items():
        download_model(name, repo_id)
        print()
        
    download_lora()
    print()

    print("=" * 60)
    print("ALL HUGGING FACE MODELS READY")
    print("=" * 60)

if __name__ == "__main__":
    main()
'''

with open('/home/jovyan/empire-and-ink/download_models.py', 'w') as f:
    f.write(content)

print("Updated download_models.py")

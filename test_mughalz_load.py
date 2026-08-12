import torch
from diffusers import FluxPipeline
from safetensors.torch import load_file

FLUX_MODEL = "black-forest-labs/FLUX.1-dev"
LORA_PATH = "mughalz/mughalz.safetensors"

print("=" * 60)
print("EMPIRE & INK — MUGHALZ LOAD TEST")
print("=" * 60)

print("\n[1] Loading FLUX...")

pipe = FluxPipeline.from_pretrained(
    FLUX_MODEL,
    torch_dtype=torch.bfloat16,
)

pipe = pipe.to("cuda")

print("FLUX loaded.")
print("GPU:", torch.cuda.get_device_name(0))

print("\n[2] Reading MughalZ...")

raw = load_file(
    LORA_PATH,
    device="cpu",
)

print("Original tensors:", len(raw))

converted = {}

for key, value in raw.items():

    # Only use FLUX/UNet portion.
    if not key.startswith("lora_unet_"):
        continue

    key = key.replace(
        "lora_unet_",
        "transformer.",
        1,
    )

    key = key.replace(
        ".lora_down.weight",
        ".lora_A.weight",
    )

    key = key.replace(
        ".lora_up.weight",
        ".lora_B.weight",
    )

    # Alpha tensors are not adapter weights.
    if key.endswith(".alpha"):
        continue

    converted[key] = value

print("Converted transformer tensors:", len(converted))

print("\nFirst 20 converted keys:")

for key in list(converted.keys())[:20]:
    print(key)

print("\n[3] Loading adapter...")

pipe.transformer.load_lora_adapter(
    converted,
    adapter_name="mughalz",
)

print("Adapter loaded.")

pipe.set_adapters(
    ["mughalz"],
    adapter_weights=[0.7],
)

print("Adapter activated.")
print("LoRA strength: 0.7")

print("\nSUCCESS — MughalZ is loaded into FLUX.")

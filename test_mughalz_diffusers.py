import torch
from diffusers import FluxPipeline

FLUX_MODEL = "black-forest-labs/FLUX.1-dev"
LORA_PATH = "mughalz/mughalz.safetensors"

print("=" * 60)
print("EMPIRE & INK — MUGHALZ DIFFUSERS TEST")
print("=" * 60)

print("\n[1] Loading FLUX...")

pipe = FluxPipeline.from_pretrained(
    FLUX_MODEL,
    torch_dtype=torch.bfloat16,
)

pipe = pipe.to("cuda")

print("FLUX loaded.")
print("GPU:", torch.cuda.get_device_name(0))


print("\n[2] Converting MughalZ using Diffusers...")

result = pipe.lora_state_dict(
    LORA_PATH,
    return_alphas=True,
)

state_dict, network_alphas = result

print("Converted LoRA tensors:", len(state_dict))

if network_alphas is not None:
    print("Network alphas:", len(network_alphas))
else:
    print("Network alphas: None")


print("\n[3] Inspecting converted keys...")

transformer_keys = {
    k: v
    for k, v in state_dict.items()
    if k.startswith("transformer.")
}

print("Transformer LoRA tensors:", len(transformer_keys))

print("\nFirst 20 transformer keys:")

for key in list(transformer_keys.keys())[:20]:
    print(key)


print("\n[4] Loading transformer LoRA only...")

pipe.load_lora_into_transformer(
    transformer_keys,
    network_alphas,
    pipe.transformer,
    adapter_name="mughalz",
)

print("MughalZ transformer loaded successfully.")


print("\n[5] Activating LoRA...")

pipe.set_adapters(
    ["mughalz"],
    adapter_weights=[0.7],
)

print("LoRA strength: 0.7")

print("\nSUCCESS — MughalZ loaded through Diffusers.")

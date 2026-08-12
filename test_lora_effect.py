import torch
from diffusers import FluxPipeline

MODEL = "black-forest-labs/FLUX.1-dev"
LORA = "mughalz/mughalz.safetensors"

PROMPT = """
Emperor Akbar seated inside a grand Mughal palace,
Mughal miniature painting, intricate hand-drawn linework,
ornate palace architecture, decorative floral borders,
rich saffron, emerald, azure and gold colors,
traditional Indian miniature painting, flattened perspective
"""

SEED = 42
STEPS = 28
GUIDANCE = 3.5

print("=" * 70)
print("MUGHALZ EFFECT TEST")
print("=" * 70)

print("\nLoading FLUX...")

pipe = FluxPipeline.from_pretrained(
    MODEL,
    torch_dtype=torch.bfloat16,
).to("cuda")

print("FLUX loaded.")

# ------------------------------------------------------------
# LOAD TRANSFORMER-ONLY MUGHALZ
# ------------------------------------------------------------

print("\nLoading MughalZ...")

state_dict, network_alphas = pipe.lora_state_dict(
    LORA,
    return_alphas=True,
)

transformer_keys = {
    k: v
    for k, v in state_dict.items()
    if k.startswith("transformer.")
}

print("Transformer tensors:", len(transformer_keys))

pipe.load_lora_into_transformer(
    transformer_keys,
    network_alphas,
    pipe.transformer,
    adapter_name="mughalz",
)

print("MughalZ loaded.")

# ------------------------------------------------------------
# TEST 1 — WEIGHT 0.0
# ------------------------------------------------------------

print("\n[A] MUGHALZ WEIGHT = 0.0")

pipe.set_adapters(
    ["mughalz"],
    adapter_weights=[0.0],
)

generator = torch.Generator("cuda").manual_seed(SEED)

image_a = pipe(
    prompt=PROMPT,
    height=1024,
    width=1024,
    num_inference_steps=STEPS,
    guidance_scale=GUIDANCE,
    generator=generator,
).images[0]

image_a.save("mughalz_0.png")

print("Saved: mughalz_0.png")

# ------------------------------------------------------------
# TEST 2 — WEIGHT 1.0
# ------------------------------------------------------------

print("\n[B] MUGHALZ WEIGHT = 1.0")

pipe.set_adapters(
    ["mughalz"],
    adapter_weights=[1.0],
)

generator = torch.Generator("cuda").manual_seed(SEED)

image_b = pipe(
    prompt=PROMPT,
    height=1024,
    width=1024,
    num_inference_steps=STEPS,
    guidance_scale=GUIDANCE,
    generator=generator,
).images[0]

image_b.save("mughalz_1.png")

print("Saved: mughalz_1.png")

# ------------------------------------------------------------
# PIXEL DIFFERENCE
# ------------------------------------------------------------

import numpy as np

a = np.asarray(image_a).astype(np.float32)
b = np.asarray(image_b).astype(np.float32)

difference = np.abs(a - b)

print("\n" + "=" * 70)
print("RESULT")
print("=" * 70)

print("Mean pixel difference:", difference.mean())
print("Maximum pixel difference:", difference.max())
print("Changed pixels:", np.count_nonzero(difference))

if difference.mean() < 0.001:
    print("\n❌ LoRA appears to have NO EFFECT.")
else:
    print("\n✅ LoRA IS AFFECTING THE OUTPUT.")

print("\nFiles:")
print("mughalz_0.png")
print("mughalz_1.png")

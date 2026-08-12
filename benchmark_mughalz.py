import torch
from diffusers import FluxPipeline

FLUX_MODEL = "black-forest-labs/FLUX.1-dev"
LORA_PATH = "mughalz/mughalz.safetensors"

PROMPT = """
Emperor Akbar seated regally inside an ornate Mughal palace,
traditional Mughal miniature painting, intricate architectural details,
delicate hand-drawn linework, rich saffron blue emerald and gold colors,
ornate decorative borders, floral motifs, historical Indian royal court,
flat two-dimensional miniature painting aesthetic
"""

SEED = 42
STEPS = 28
GUIDANCE = 3.5
LORA_STRENGTH = 0.7


print("=" * 70)
print("EMPIRE & INK — FLUX vs MUGHALZ")
print("=" * 70)

print("\nLoading FLUX...")

pipe = FluxPipeline.from_pretrained(
    FLUX_MODEL,
    torch_dtype=torch.bfloat16,
).to("cuda")

print("FLUX loaded.")


# ============================================================
# LOAD MUGHALZ
# ============================================================

print("\nLoading MughalZ...")

result = pipe.lora_state_dict(
    LORA_PATH,
    return_alphas=True,
)

state_dict, network_alphas = result

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


# ============================================================
# A — FLUX ONLY
# ============================================================

print("\n[A] FLUX ONLY")

pipe.disable_lora()

generator = torch.Generator("cuda").manual_seed(SEED)

image_a = pipe(
    prompt=PROMPT,
    height=1024,
    width=1024,
    num_inference_steps=STEPS,
    guidance_scale=GUIDANCE,
    generator=generator,
).images[0]

image_a.save("flux_only.png")

print("Saved: flux_only.png")


# ============================================================
# B — FLUX + MUGHALZ
# ============================================================

print("\n[B] FLUX + MUGHALZ")

pipe.set_adapters(
    ["mughalz"],
    adapter_weights=[LORA_STRENGTH],
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

image_b.save("flux_mughalz.png")

print("Saved: flux_mughalz.png")


print("\n" + "=" * 70)
print("BENCHMARK COMPLETE")
print("=" * 70)
print("FLUX ONLY:       flux_only.png")
print("FLUX + MUGHALZ:  flux_mughalz.png")

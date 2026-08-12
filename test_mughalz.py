import torch
from diffusers import FluxPipeline
from safetensors.torch import load_file


FLUX_MODEL = "black-forest-labs/FLUX.1-dev"
LORA_PATH = "mughalz/mughalz.safetensors"
OUTPUT = "mughalz_test.png"

print("=" * 60)
print("EMPIRE & INK — MUGHALZ TEST")
print("=" * 60)

print("\n[1/3] Loading FLUX.1 Dev...")

pipe = FluxPipeline.from_pretrained(
    FLUX_MODEL,
    dtype=torch.bfloat16,
)

pipe = pipe.to("cuda")

print("FLUX loaded successfully.")
print("GPU:", torch.cuda.get_device_name(0))


print("\n[2/3] Loading MughalZ...")

state_dict = load_file(
    LORA_PATH,
    device="cpu",
)

print("Original LoRA tensors:", len(state_dict))


# Convert Kohya/Flux LoRA keys to Diffusers format
converted = {}

for key, value in state_dict.items():

    if not key.startswith("lora_unet_"):
        continue

    new_key = key.replace(
        "lora_unet_",
        "transformer.",
        1,
    )

    new_key = new_key.replace(
        ".lora_down.weight",
        ".lora_A.weight",
    )

    new_key = new_key.replace(
        ".lora_up.weight",
        ".lora_B.weight",
    )

    if new_key.endswith(".alpha"):
        continue

    converted[new_key] = value


print("Transformer LoRA tensors:", len(converted))


print("\n[3/3] Loading MughalZ into transformer...")

pipe.transformer.load_lora_adapter(
    converted,
    adapter_name="mughalz",
)

pipe.set_adapters(
    ["mughalz"],
    adapter_weights=[0.7],
)

print("MughalZ loaded successfully.")
print("LoRA strength: 0.7")


prompt = """
A Mughal emperor seated regally inside an ornate royal palace,
traditional Mughal miniature painting, intricate architecture,
delicate hand-drawn linework, rich saffron blue emerald and gold colors,
ornate decorative borders, floral motifs, historical Indian court scene,
flat two-dimensional miniature painting aesthetic
"""


print("\nGenerating image...")

generator = torch.Generator("cuda").manual_seed(42)

image = pipe(
    prompt=prompt,
    height=1024,
    width=1024,
    num_inference_steps=28,
    guidance_scale=3.5,
    generator=generator,
).images[0]


image.save(OUTPUT)

print("\n" + "=" * 60)
print("SUCCESS")
print("=" * 60)
print("Saved:", OUTPUT)

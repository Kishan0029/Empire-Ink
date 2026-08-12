import torch
from diffusers import FluxPipeline

MODEL = "black-forest-labs/FLUX.1-dev"

print("=" * 60)
print("FLUX CLEAN TEST")
print("=" * 60)

print("\nLoading FLUX.1 Dev...")

pipe = FluxPipeline.from_pretrained(
    MODEL,
    torch_dtype=torch.bfloat16,
)

print("Pipeline loaded.")

pipe = pipe.to("cuda")

print("FLUX moved to GPU.")
print("GPU:", torch.cuda.get_device_name(0))

prompt = """
A Mughal emperor seated inside an ornate royal palace,
traditional Mughal miniature painting aesthetic,
intricate architecture, delicate linework,
rich traditional colors, historical Indian court scene
"""

print("\nGenerating...")

image = pipe(
    prompt=prompt,
    height=1024,
    width=1024,
    num_inference_steps=28,
    guidance_scale=3.5,
    generator=torch.Generator("cuda").manual_seed(42),
).images[0]

image.save("flux_clean_test.png")

print("\nSUCCESS")
print("Saved: flux_clean_test.png")

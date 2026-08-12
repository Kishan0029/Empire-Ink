import os
import gc
import time
import torch

from transformers import AutoTokenizer, AutoModelForCausalLM
from diffusers import FluxPipeline

QWEN_MODEL = "Qwen/Qwen2.5-7B-Instruct"
FLUX_MODEL = "black-forest-labs/FLUX.1-dev"
LORA_PATH = os.path.abspath("mughalz/mughalz.safetensors")

def ram_gb():
    import psutil
    return psutil.Process(os.getpid()).memory_info().rss / 1024**3

def gpu_gb():
    return torch.cuda.memory_allocated() / 1024**3

print("=" * 60)
print("EMPIRE & INK — SEQUENTIAL MEMORY TEST")
print("=" * 60)

# ------------------------------------------------------------
# PHASE 1 — QWEN
# ------------------------------------------------------------

print("\n[1/4] Loading Qwen...")

tokenizer = AutoTokenizer.from_pretrained(QWEN_MODEL)

qwen = AutoModelForCausalLM.from_pretrained(
    QWEN_MODEL,
    dtype=torch.bfloat16,
).to("cuda")

print("Qwen loaded.")
print("RAM:", round(ram_gb(), 2), "GB")
print("GPU:", round(gpu_gb(), 2), "GB")

messages = [
    {
        "role": "system",
        "content": (
            "Enhance the user's image request for FLUX. "
            "Return only the final prompt. "
            "Use Mughal miniature painting aesthetics."
        ),
    },
    {
        "role": "user",
        "content": "Emperor Akbar seated in a grand Mughal palace",
    },
]

text = tokenizer.apply_chat_template(
    messages,
    tokenize=False,
    add_generation_prompt=True,
)

inputs = tokenizer(text, return_tensors="pt").to("cuda")

with torch.inference_mode():
    outputs = qwen.generate(
        **inputs,
        max_new_tokens=80,
        do_sample=False,
    )

enhanced_prompt = tokenizer.decode(
    outputs[0][inputs["input_ids"].shape[-1]:],
    skip_special_tokens=True,
).strip()

print("\nEnhanced prompt:")
print(enhanced_prompt)

# ------------------------------------------------------------
# PHASE 2 — UNLOAD QWEN
# ------------------------------------------------------------

print("\n[2/4] Unloading Qwen...")

del outputs
del inputs
del qwen
del tokenizer

gc.collect()
torch.cuda.empty_cache()
torch.cuda.ipc_collect()

print("Qwen unloaded.")
print("RAM:", round(ram_gb(), 2), "GB")
print("GPU:", round(gpu_gb(), 2), "GB")

# ------------------------------------------------------------
# PHASE 3 — FLUX + MUGHALZ
# ------------------------------------------------------------

print("\n[3/4] Loading FLUX...")

pipe = FluxPipeline.from_pretrained(
    FLUX_MODEL,
    torch_dtype=torch.bfloat16,
)

pipe.enable_model_cpu_offload()

print("FLUX loaded.")

print("\nLoading MughalZ...")

state_dict, network_alphas = pipe.lora_state_dict(
    LORA_PATH,
    return_alphas=True,
)

transformer_keys = {
    k: v
    for k, v in state_dict.items()
    if k.startswith("transformer.")
}

pipe.load_lora_into_transformer(
    transformer_keys,
    network_alphas,
    pipe.transformer,
    adapter_name="mughalz",
)

pipe.set_adapters(
    ["mughalz"],
    adapter_weights=[0.7],
)

print("MughalZ loaded.")

print("RAM:", round(ram_gb(), 2), "GB")
print("GPU:", round(gpu_gb(), 2), "GB")

# ------------------------------------------------------------
# PHASE 4 — GENERATION
# ------------------------------------------------------------

print("\n[4/4] Generating...")

start = time.time()

generator = torch.Generator(
    device="cpu"
).manual_seed(42)

image = pipe(
    prompt=enhanced_prompt,
    height=1024,
    width=1024,
    num_inference_steps=28,
    guidance_scale=3.5,
    generator=generator,
).images[0]

output_path = "backend/outputs/sequential_test.png"
image.save(output_path)

elapsed = time.time() - start

print("\n" + "=" * 60)
print("SUCCESS")
print("=" * 60)
print("Output:", output_path)
print("Generation time:", round(elapsed, 2), "seconds")
print("RAM:", round(ram_gb(), 2), "GB")
print("GPU:", round(gpu_gb(), 2), "GB")
print("=" * 60)

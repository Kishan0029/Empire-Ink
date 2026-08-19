from diffusers.models.attention_dispatch import AttentionBackendName

import os
import time
from pathlib import Path
import torch

from transformers import AutoTokenizer, AutoModelForCausalLM
from diffusers import FluxPipeline


# ============================================================
# CONFIG
# ============================================================

FLUX_MODEL = "black-forest-labs/FLUX.1-dev"
QWEN_MODEL = "Qwen/Qwen2.5-7B-Instruct"

PROJECT_ROOT = Path(__file__).resolve().parents[2]

LORA_PATH = PROJECT_ROOT / "mughalz" / "mughalz.safetensors"

LORA_STRENGTH = 0.7

OUTPUT_DIR = PROJECT_ROOT / "backend" / "outputs"

os.makedirs(OUTPUT_DIR, exist_ok=True)


SYSTEM_PROMPT = """
You are the prompt enhancement engine for Empire & Ink.

Transform the user's simple image request into a concise visual
prompt optimized for FLUX.1 Dev and Mughal miniature painting.

Focus on:
- subject
- composition
- Mughal miniature painting aesthetic
- intricate linework
- traditional Indian architecture
- decorative details
- rich traditional colors
- flattened perspective

Do not add unnecessary story.
Do not explain your answer.
Return ONLY the final image prompt.

Keep the result under 45 words.
"""


class EmpireInkGenerator:

    def __init__(self):

        print("=" * 60)
        print("EMPIRE & INK — INITIALIZING")
        print("=" * 60)

        if not torch.cuda.is_available():
            raise RuntimeError("CUDA GPU not available")

        print("\nGPU:", torch.cuda.get_device_name(0))

        self._load_qwen()
        self._load_flux()
        self._load_mughalz()

        print("\n" + "=" * 60)
        print("EMPIRE & INK GENERATOR READY")
        print("=" * 60)

    # ========================================================
    # QWEN
    # ========================================================

    def _load_qwen(self):

        print("\n[1/3] Loading Qwen2.5-7B-Instruct...")

        self.tokenizer = AutoTokenizer.from_pretrained(
            QWEN_MODEL
        )

        self.qwen = AutoModelForCausalLM.from_pretrained(
            QWEN_MODEL,
            torch_dtype=torch.bfloat16,
            device_map="cuda",
        )

        print("Qwen loaded successfully.")
        print("Qwen device:", self.qwen.device)

    # ========================================================
    # FLUX
    # ========================================================

    def _load_flux(self):

        print("\n[2/3] Loading FLUX.1 Dev...")

        self.pipe = FluxPipeline.from_pretrained(
            FLUX_MODEL,
            torch_dtype=torch.bfloat16,
            device_map="cuda",
        )

        self.pipe.transformer.set_attention_backend(
            AttentionBackendName._NATIVE_EFFICIENT
        )

        print("FLUX loaded successfully.")
        print("Attention backend: NATIVE_EFFICIENT")

    # ========================================================
    # MUGHALZ
    # ========================================================

    def _load_mughalz(self):

        print("\n[3/3] Loading MughalZ LoRA...")

        print("Reading LoRA...")

        state_dict, network_alphas = self.pipe.lora_state_dict(
            LORA_PATH,
            return_alphas=True,
        )

        transformer_keys = {
            k: v
            for k, v in state_dict.items()
            if k.startswith("transformer.")
        }

        print(
            "Transformer LoRA tensors:",
            len(transformer_keys)
        )

        self.pipe.load_lora_into_transformer(
            transformer_keys,
            network_alphas,
            self.pipe.transformer,
            adapter_name="mughalz",
        )

        self.pipe.set_adapters(
            ["mughalz"],
            adapter_weights=[LORA_STRENGTH],
        )

        print(
            f"MughalZ loaded successfully "
            f"(strength={LORA_STRENGTH})."
        )

    # ========================================================
    # PROMPT ENHANCEMENT
    # ========================================================

    def enhance_prompt(self, user_prompt):

        messages = [
            {
                "role": "system",
                "content": SYSTEM_PROMPT.strip(),
            },
            {
                "role": "user",
                "content": user_prompt,
            },
        ]

        text = self.tokenizer.apply_chat_template(
            messages,
            tokenize=False,
            add_generation_prompt=True,
        )

        inputs = self.tokenizer(
            text,
            return_tensors="pt",
        )

        inputs = {
            key: value.to(self.qwen.device)
            for key, value in inputs.items()
        }

        with torch.inference_mode():

            outputs = self.qwen.generate(
                **inputs,
                max_new_tokens=48,
                do_sample=False,
            )

        generated = outputs[0][
            inputs["input_ids"].shape[-1]:
        ]

        enhanced_prompt = self.tokenizer.decode(
            generated,
            skip_special_tokens=True,
        ).strip()

        words = enhanced_prompt.split()

        if len(words) > 45:
            enhanced_prompt = " ".join(words[:45])

        return enhanced_prompt

    # ========================================================
    # IMAGE GENERATION
    # ========================================================

    def generate(
        self,
        user_prompt,
        seed=42,
        steps=4,
        guidance=3.5,
        lora_strength=0.7,
        ):

        total_start = time.time()

        # Qwen prompt enhancement
        qwen_start = time.time()
        enhanced_prompt = self.enhance_prompt(user_prompt)
        qwen_time = time.time() - qwen_start

        self.pipe.set_adapters(
        ["mughalz"],
        adapter_weights=[lora_strength],
        )

        flux_start = time.time()

        generator = torch.Generator(
        device="cuda"
        ).manual_seed(seed)

        print("\nStarting FLUX generation...")
        print("Prompt:", enhanced_prompt)
        print("Steps:", steps)
        print("LoRA strength:", lora_strength)

        image = self.pipe(
        prompt=enhanced_prompt,
        height=1024,
        width=1024,
        num_inference_steps=steps,
        guidance_scale=guidance,
        generator=generator,
        ).images[0]

        flux_time = time.time() - flux_start

        filename = (
        f"empire_ink_"
        f"{int(time.time() * 1000)}.png"
        )

        output_path = os.path.join(
        OUTPUT_DIR,
        filename,
        )

        image.save(output_path)

        total_time = time.time() - total_start

        print("\n==============================")
        print("GENERATION COMPLETE")
        print("==============================")
        print("Image:", output_path)
        print("FLUX time:", round(flux_time, 2), "seconds")
        print("Total time:", round(total_time, 2), "seconds")

        return {
            "success": True,
            "user_prompt": user_prompt,
            "enhanced_prompt": enhanced_prompt,
            "image_path": output_path,
            "filename": filename,
            "seed": seed,
            "qwen_time": 0,
            "flux_time": round(flux_time, 2),
            "total_time": round(total_time, 2),
        }

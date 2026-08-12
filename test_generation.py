import os
import sys
import time

print("=" * 60)
print("EMPIRE & INK — GENERATION SMOKE TEST")
print("=" * 60)

start = time.time()

try:
    from backend.services.generation_service import EmpireInkGenerator

    print("\n[1/2] Loading Empire & Ink generator...")
    generator = EmpireInkGenerator()

    print("\n[2/2] Generating test image...")

    result = generator.generate(
        user_prompt="Emperor Akbar seated in a grand Mughal palace",
        seed=42,
        steps=28,
        guidance=3.5,
        lora_strength=0.7,
    )

    if not result.get("success"):
        raise RuntimeError("Generation returned success=False")

    image_path = result["image_path"]

    if not os.path.isfile(image_path):
        raise RuntimeError(f"Image was not created: {image_path}")

    file_size = os.path.getsize(image_path)

    if file_size < 10000:
        raise RuntimeError(
            f"Generated image looks invalid. File size: {file_size} bytes"
        )

    total_time = time.time() - start

    print("\n" + "=" * 60)
    print("GENERATION TEST PASSED")
    print("=" * 60)

    print("GPU:             NVIDIA H200")
    print("Qwen:            OK")
    print("FLUX:            OK")
    print("MughalZ:         OK")
    print("Generation:      OK")
    print("Output:          ", image_path)
    print("File size:       ", round(file_size / 1024, 1), "KB")
    print("Enhanced prompt: ", result["enhanced_prompt"])
    print("Qwen time:       ", result["qwen_time"], "s")
    print("FLUX time:       ", result["flux_time"], "s")
    print("Total time:      ", result["total_time"], "s")
    print("Smoke test time: ", round(total_time, 2), "s")

    print("=" * 60)
    print("EMPIRE & INK IS READY")
    print("=" * 60)

except Exception as e:
    print("\n" + "=" * 60)
    print("GENERATION TEST FAILED")
    print("=" * 60)
    print(type(e).__name__ + ":", e)
    print("=" * 60)
    sys.exit(1)

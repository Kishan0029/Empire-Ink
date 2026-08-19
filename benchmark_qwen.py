
import sys, time, gc
sys.stdout.reconfigure(encoding='utf-8')
import torch
from backend.services.generation_service import EmpireInkGenerator

with open('/home/jovyan/empire-and-ink/benchmark_results.txt', 'w') as f:
    torch.cuda.reset_peak_memory_stats()
    f.write(f"VRAM BEFORE INIT: {torch.cuda.memory_allocated() / 1e9:.2f} GB\n")

    init_start = time.time()
    generator = EmpireInkGenerator()
    init_time = time.time() - init_start
    f.write(f"INIT TIME: {init_time:.2f}s\n")

    f.write(f"VRAM AFTER INIT: {torch.cuda.memory_allocated() / 1e9:.2f} GB\n")
    f.write(f"PEAK VRAM DURING INIT: {torch.cuda.max_memory_allocated() / 1e9:.2f} GB\n")

    prompt = "A Mughal emperor standing in a grand palace courtyard"

    run1_start = time.time()
    enhanced1 = generator.enhance_prompt(prompt)
    run1_time = time.time() - run1_start
    f.write(f"RUN 1 TIME: {run1_time:.2f}s\n")
    f.write(f"RUN 1 OUTPUT: {enhanced1}\n")

    run2_start = time.time()
    enhanced2 = generator.enhance_prompt(prompt)
    run2_time = time.time() - run2_start
    f.write(f"RUN 2 TIME: {run2_time:.2f}s\n")
    f.write(f"RUN 2 OUTPUT: {enhanced2}\n")

    f.write(f"AVG INFERENCE TIME: {(run1_time + run2_time) / 2:.2f}s\n")

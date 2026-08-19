import sys
sys.stdout.reconfigure(encoding='utf-8')
from backend.services.generation_service import EmpireInkGenerator
try:
    generator = EmpireInkGenerator()
    print('Testing final FLUX generation...')
    result = generator.generate('A Mughal emperor seated in an ornate palace courtyard, surrounded by attendants, fountains, marble arches and intricate Persian-inspired decorations', seed=42, steps=20, guidance=3.5, lora_strength=0.7)
    print('RESULT:', result)
except Exception as e:
    import traceback
    traceback.print_exc()

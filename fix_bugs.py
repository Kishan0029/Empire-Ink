
import sys

with open('/home/jovyan/empire-and-ink/src/app/features/studio/components/StudioControls.tsx', 'r') as f:
    content = f.read()

# Fix RATIOS
content = content.replace(
'''import {
  MOCK_RATIOS as RATIOS,
} from "../../../api/mock/mockData";''',
'''const RATIOS = [
  { name: "1:1", desc: "Square" },
  { name: "4:3", desc: "Classic" },
  { name: "3:4", desc: "Portrait" },
  { name: "16:9", desc: "Widescreen" },
  { name: "9:16", desc: "Mobile" }
];'''
)

with open('/home/jovyan/empire-and-ink/src/app/features/studio/components/StudioControls.tsx', 'w') as f:
    f.write(content)

with open('/home/jovyan/empire-and-ink/src/app/hooks/useArtworkGeneration.ts', 'r') as f:
    hook_content = f.read()

# Clear generated artwork on start
hook_content = hook_content.replace(
    'setGenState("submitting");',
    'setGenState("submitting");\n    setGeneratedArtwork(null);'
)

with open('/home/jovyan/empire-and-ink/src/app/hooks/useArtworkGeneration.ts', 'w') as f:
    f.write(hook_content)

print("Fixed RATIOS and generatedArtwork clearing")

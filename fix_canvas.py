
import sys

with open('/home/jovyan/empire-and-ink/src/app/features/studio/components/StudioCanvas.tsx', 'r') as f:
    content = f.read()

# Remove the fallback entirely
content = content.replace(
    'const displayAsset = artworkAsset || MOCK_ARTWORKS[1].asset;',
    'const displayAsset = artworkAsset;'
)

with open('/home/jovyan/empire-and-ink/src/app/features/studio/components/StudioCanvas.tsx', 'w') as f:
    f.write(content)

print("Removed fallback from StudioCanvas")


import re

with open('/home/jovyan/empire-and-ink/src/app/features/studio/components/StudioControls.tsx', 'r') as f:
    content = f.read()

# Remove Era
content = re.sub(r'<div className="mb-5">\s*<label.*?Historical Era.*?</label>.*?</div>\s*</div>', '', content, flags=re.DOTALL)

# Remove Style
content = re.sub(r'<div className="mb-5">\s*<label.*?Artistic Style.*?</label>.*?</div>\s*</div>', '', content, flags=re.DOTALL)

# Remove Studio Rendering / PRO ENGINE header
content = re.sub(r'<div className="flex items-center justify-between mb-4">\s*<label.*?Studio Rendering.*?</label>\s*<span.*?PRO ENGINE\s*</span>\s*</div>', '', content, flags=re.DOTALL)

# Remove Resolution Quality
content = re.sub(r'<div>\s*<div className="flex justify-between items-center text-\[11px\] mb-2">\s*<span className="text-\[#6F6F6F\] font-medium">Resolution Quality.*?</div>\s*<input.*?value=\{quality\}.*?/>\s*</div>', '', content, flags=re.DOTALL)

# Remove Court Lighting Preset
content = re.sub(r'<div>\s*<label.*?Court Lighting Preset.*?</label>.*?</div>\s*</div>', '', content, flags=re.DOTALL)

# Remove Gilding
content = re.sub(r'<div className="pt-1">\s*<button.*?Royal Shell Gold Gilding.*?</button>\s*</div>', '', content, flags=re.DOTALL)

# The hook parameters (era, setEra, style, setStyle, quality, setQuality) are still passed to StudioControls, we can leave them in the interface or remove them.
# The user just wants them removed from the UI.

with open('/home/jovyan/empire-and-ink/src/app/features/studio/components/StudioControls.tsx', 'w') as f:
    f.write(content)
print("Removed placeholders from UI")

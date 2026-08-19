
import sys
import re

with open('/home/jovyan/empire-and-ink/src/app/features/studio/components/StudioCanvas.tsx', 'r') as f:
    content = f.read()

# Replace the group-hover buttons with just a functional Download button
buttons_regex = re.compile(r'<div className="absolute inset-0 bg-black/0 group-hover:bg-black/38.*?</div>', re.DOTALL)
replacement = '''<div className="absolute inset-0 bg-black/0 group-hover:bg-black/38 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
              <a
                href={displayAsset}
                download="empire_and_ink_generation.png"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/18 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/28 transition-all"
                title="Download"
              >
                <Download size={15} />
              </a>
            </div>'''

content = buttons_regex.sub(replacement, content)

with open('/home/jovyan/empire-and-ink/src/app/features/studio/components/StudioCanvas.tsx', 'w') as f:
    f.write(content)

print("StudioCanvas buttons fixed.")

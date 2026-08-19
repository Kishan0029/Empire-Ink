
import sys
import re

# 1. Update Navbar.tsx
with open('/home/jovyan/empire-and-ink/src/app/components/layout/Navbar.tsx', 'r') as f:
    navbar = f.read()

# Replace navItems completely
nav_regex = re.compile(r'const navItems: \[string, Page\]\[\] = isLoggedIn.*?\];', re.DOTALL)
navbar = nav_regex.sub(
    'const navItems: [string, Page][] = [["Home", "landing"], ["Studio", "studio"]];',
    navbar
)

with open('/home/jovyan/empire-and-ink/src/app/components/layout/Navbar.tsx', 'w') as f:
    f.write(navbar)

# 2. Update Sidebar.tsx
with open('/home/jovyan/empire-and-ink/src/app/components/layout/Sidebar.tsx', 'r') as f:
    sidebar = f.read()

nav_arr_regex = re.compile(r'const nav = \[.*?\];', re.DOTALL)
sidebar = nav_arr_regex.sub(
    'const nav = [{ id: "studio", label: "Studio", Icon: Wand2 }];',
    sidebar
)

bottom_arr_regex = re.compile(r'const bottom = \[.*?\];', re.DOTALL)
sidebar = bottom_arr_regex.sub('const bottom: any[] = [];', sidebar)

# Remove PRO plan and bottom items mapping if needed, or we just let it map over empty array.
# But let's remove the PRO plan HTML.
pro_plan_regex = re.compile(r'<div className="mb-3 px-3 py-3 rounded-xl bg-gradient-to-br.*?</div>.*?</div>.*?</div>', re.DOTALL)
sidebar = pro_plan_regex.sub('', sidebar)

with open('/home/jovyan/empire-and-ink/src/app/components/layout/Sidebar.tsx', 'w') as f:
    f.write(sidebar)

# 3. Update LandingPage.tsx
with open('/home/jovyan/empire-and-ink/src/app/features/landing/LandingPage.tsx', 'r') as f:
    landing = f.read()

# Remove ShowcaseSection and TestimonialsSection
landing = landing.replace('<ShowcaseSection\n        artworks={artworks}\n        setPage={setPage}\n        onSelectArt={onSelectArt}\n      />', '')
landing = landing.replace('<TestimonialsSection testimonials={testimonials} />', '')

with open('/home/jovyan/empire-and-ink/src/app/features/landing/LandingPage.tsx', 'w') as f:
    f.write(landing)

print("Placeholder UI removed successfully.")

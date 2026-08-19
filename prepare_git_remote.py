
import os
import subprocess

def run_cmd(cmd):
    print(f"Running: {cmd}")
    try:
        res = subprocess.run(cmd, shell=True, check=True, cwd='/home/jovyan/empire-and-ink', capture_output=True, text=True)
        print(res.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Error: {e.stderr}")

# Check if git is installed
run_cmd("git --version")

# Initialize git if not already
run_cmd("git config --global user.name 'Antigravity IDE'")
run_cmd("git config --global user.email 'ai@antigravity.dev'")
run_cmd("git config --global init.defaultBranch main")

# Force init
run_cmd("git init")

# Ensure remote is added
run_cmd("git remote remove origin || true")
run_cmd("git remote add origin https://github.com/Kishan0029/Empire-Ink.git")

# Add files
run_cmd("git add .")

# Commit
run_cmd("git commit -m 'Initial robust backup and 1-tap restore script'")

print("Git repository prepared locally.")

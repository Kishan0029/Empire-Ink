import streamlit as st
from backend.services.generation_service import EmpireInkGenerator


st.set_page_config(
    page_title="Empire & Ink",
    page_icon="🎨",
    layout="wide",
)


@st.cache_resource
def load_generator():
    return EmpireInkGenerator()


st.title("Empire & Ink")
st.caption("AI-powered Mughal miniature painting generator")

st.divider()

prompt = st.text_area(
    "Describe your scene",
    placeholder="Example: Emperor Akbar meeting ambassadors in his palace",
    height=120,
)

col1, col2, col3 = st.columns(3)

with col1:
    seed = st.number_input(
        "Seed",
        min_value=0,
        value=42,
        step=1,
    )

with col2:
    steps = st.slider(
        "Steps",
        min_value=20,
        max_value=40,
        value=28,
    )

with col3:
    lora_strength = st.slider(
        "MughalZ Strength",
        min_value=0.0,
        max_value=1.5,
        value=0.7,
        step=0.1,
    )

generate = st.button(
    "Generate Artwork",
    type="primary",
    use_container_width=True,
)


if generate:

    if not prompt.strip():
        st.warning("Please enter a prompt.")
        st.stop()

    with st.spinner("Creating your Mughal miniature..."):

        generator = load_generator()

        result = generator.generate(
            prompt,
            seed=seed,
            steps=steps,
            guidance=3.5,
            lora_strength=lora_strength,
        )

    if result["success"]:

        st.success(
            f"Generated in {result['total_time']} seconds"
        )

        st.image(
            result["image_path"],
            caption="Empire & Ink",
            use_container_width=True,
        )

        st.subheader("Enhanced Prompt")

        st.write(result["enhanced_prompt"])

        with st.expander("Generation Details"):

            st.write(
                f"Qwen: {result['qwen_time']} sec"
            )

            st.write(
                f"FLUX: {result['flux_time']} sec"
            )

            st.write(
                f"Total: {result['total_time']} sec"
            )

            st.write(
                f"Seed: {result['seed']}"
            )

    else:
        st.error("Generation failed.")

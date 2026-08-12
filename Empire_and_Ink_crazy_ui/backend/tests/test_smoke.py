import pytest
import time
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

@pytest.mark.skip(reason="Smoke test invokes the real AI pipeline. Run explicitly.")
def test_real_generation_smoke():
    """
    E2E Smoke test that verifies:
    4. Real generation service can be invoked.
    5. Generated PNG exists.
    6. Database record is created.
    7. Status becomes completed after successful generation.
    8. Image endpoint returns the PNG.
    """
    response = client.post("/api/v1/generations", json={
        "prompt": "Test smoke generation of a Mughal landscape",
        "enhance_prompt": False,
        "steps": 4, # Low steps for fast smoke test
        "seed": 42
    })
    
    assert response.status_code == 202
    data = response.json()
    gen_id = data["id"]
    
    # Poll until complete
    max_retries = 30
    for _ in range(max_retries):
        status_resp = client.get(f"/api/v1/generations/{gen_id}")
        status_data = status_resp.json()
        
        if status_data["status"] == "completed":
            break
        elif status_data["status"] == "failed":
            pytest.fail(f"Generation failed: {status_data.get('error')}")
            
        time.sleep(5)
    else:
        pytest.fail("Generation timed out.")
        
    # Verify image endpoint returns the PNG
    img_resp = client.get(f"/api/v1/generations/{gen_id}/image")
    assert img_resp.status_code == 200
    assert img_resp.headers["content-type"] == "image/png"

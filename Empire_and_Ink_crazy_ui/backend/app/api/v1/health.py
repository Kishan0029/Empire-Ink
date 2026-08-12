from fastapi import APIRouter
import sys

router = APIRouter()

@router.get("/")
def health_check():
    health_status = {
        "api_status": "online",
        "gpu": {
            "name": "Unknown",
            "cuda_available": False
        },
        "models": {
            "qwen": "not_loaded",
            "flux": "not_loaded",
            "mughalz": "not_loaded"
        },
        "generation_service": "unavailable"
    }

    # Attempt to check CUDA via torch if available
    try:
        import torch
        health_status["gpu"]["cuda_available"] = torch.cuda.is_available()
        if torch.cuda.is_available():
            health_status["gpu"]["name"] = torch.cuda.get_device_name(0)
    except ImportError:
        pass

    # Check generation service integration
    try:
        from app.services.orchestrator import generator_instance
        if generator_instance:
            health_status["generation_service"] = "available"
            # Note: Checking actual loaded models depends on the interface of EmpireInkGenerator
            # Assuming generator_instance has properties indicating if models are currently loaded in VRAM
            health_status["models"]["qwen"] = getattr(generator_instance, 'is_qwen_loaded', 'available')
            health_status["models"]["flux"] = getattr(generator_instance, 'is_flux_loaded', 'available')
            health_status["models"]["mughalz"] = getattr(generator_instance, 'is_mughalz_loaded', 'available')
    except ImportError:
        pass

    return health_status

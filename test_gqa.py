import torch
print('Torch:', torch.__version__)
print('CUDA:', torch.version.cuda)
print('CUDA available:', torch.cuda.is_available())
print('GPU:', torch.cuda.get_device_name(0))
q = torch.randn(1, 8, 16, 64, device='cuda')
k = torch.randn(1, 8, 16, 64, device='cuda')
v = torch.randn(1, 8, 16, 64, device='cuda')
try:
    out = torch.nn.functional.scaled_dot_product_attention(q, k, v, enable_gqa=True)
    print('GQA: OK', out.shape)
except Exception as e:
    print('GQA: FAILED', repr(e))

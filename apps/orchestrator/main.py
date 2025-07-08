from fastapi import FastAPI
import httpx
from .src.api import router as api_router

app = FastAPI()
app.include_router(api_router)

@app.get('/healthz')
async def healthz():
    return {'status': 'ok'}


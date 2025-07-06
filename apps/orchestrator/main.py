from fastapi import FastAPI
import httpx

app = FastAPI()

@app.get('/healthz')
async def healthz():
    return {'status': 'ok'}


# OpenDataHackathon2025 SCD-Hub

This repository contains a minimal prototype for the Shibuya MVP. It provides several small Flask/FastAPI services plus a data ingestor. Services are orchestrated using Docker Compose.

## Quick start

```bash
git clone <repo>
cd OpenDataHackathon2025_SCD-Hub
docker compose up -d
```

After the containers start you can verify the orchestrator is running:

```bash
curl http://localhost:8000/healthz
```

Which should return:

```json
{"status": "ok"}
```

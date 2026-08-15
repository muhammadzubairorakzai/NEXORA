# NEXORA Documentatire,from fastapi import FastAPI

app = FastAPI(
    title="NEXORA API",
    description="AI-Powered Forex Intelligence & Automation Ecosystem",
    version="0.1.0",
)


@app.get("/")
def root():
    return {
        "name": "NEXORA",
        "status": "online",
        "version": "0.1.0",
        "message": "NEXORA AI Trading Ecosystem"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    } setup guides, and proj

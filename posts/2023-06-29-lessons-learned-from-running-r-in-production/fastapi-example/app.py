from fastapi import FastAPI

app = FastAPI()

@app.get("/types")
async def types(n: int) -> int:
  return n * 2

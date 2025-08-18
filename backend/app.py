from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from backend.utils.db import engine, Base, get_db
from backend.routes import (
    auth,
    students,
    teachers,
    attendance,
    classes,
    notifications,
    subjects
)

app = FastAPI(
    title="Smart Attendance System API",
    description="API for Smart Attendance System with Face Recognition",
    version="1.0.0"
)

@app.get("/")
def read_root():
    return {"message": "🚀 Smart Attendance System API is running"}

# ✅ Test DB connection
@app.get("/test/ping")
def test_db_connection(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
        return {"message": "✅ Database connection successful"}
    except Exception as e:
        return {"error": str(e)}

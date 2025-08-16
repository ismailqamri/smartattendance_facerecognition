# backend/app.py

from fastapi import FastAPI
from backend.utils.db import engine, Base
from backend.routes import (
    auth,
    students,
    teachers,
    attendance,
    classes,
    notifications,
    subjects
)

# Initialize FastAPI app
app = FastAPI(
    title="Smart Attendance System",
    description="A face-recognition-based attendance system with student and teacher features",
    version="1.0.0"
)

# ⚠️ Skip table creation since tables already exist in MySQL
# Base.metadata.create_all(bind=engine)

# Register routers from routes/ folder
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(students.router, prefix="/students", tags=["Students"])
app.include_router(teachers.router, prefix="/teachers", tags=["Teachers"])
app.include_router(attendance.router, prefix="/attendance", tags=["Attendance"])
app.include_router(classes.router, prefix="/classes", tags=["Classes"])
app.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])
app.include_router(subjects.router, prefix="/subjects", tags=["Subjects"])

# Root route (health check)
@app.get("/")
def read_root():
    return {"message": "🚀 Smart Attendance System API is running"}

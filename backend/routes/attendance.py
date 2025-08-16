from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_attendance():
    return {"message": "Attendance endpoint working"}

from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_students():
    return {"message": "Students endpoint working"}

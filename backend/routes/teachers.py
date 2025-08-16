from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_teachers():
    return {"message": "Teachers endpoint working"}

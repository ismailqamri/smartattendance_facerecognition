from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_classes():
    return {"message": "Classes endpoint working"}

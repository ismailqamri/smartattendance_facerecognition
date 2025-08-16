from fastapi import APIRouter

router = APIRouter()

@router.get("/login")
def login():
    return {"message": "Login endpoint working"}

@router.get("/signup")
def signup():
    return {"message": "Signup endpoint working"}

from fastapi import APIRouter, Depends
from sqlalchemy import text
from backend.utils.db import get_db

router = APIRouter()

@router.get("/ping", tags=["Health"])
def ping(db=Depends(get_db)):
    """Simple DB health check"""
    result = db.execute(text("SELECT 1")).scalar()
    return {"db_connection": bool(result)}

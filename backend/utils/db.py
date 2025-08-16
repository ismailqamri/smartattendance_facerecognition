# backend/utils/db.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# -------------------------
# ⚡ Database Configuration
# -------------------------
# Change these values to match your MySQL setup
DB_USERNAME = "root"          # Your MySQL username
DB_PASSWORD = ""              # Your MySQL password ("" if none)
DB_HOST = "localhost"         # or "127.0.0.1"
DB_PORT = "3306"              # default MySQL port
DB_NAME = "smart_attendance"  # Your database name

DATABASE_URL = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# -------------------------
# ⚡ Engine & Base
# -------------------------
# echo=True prints all SQL queries in terminal (useful for debugging)
engine = create_engine(DATABASE_URL, echo=True)

# Base class for all models
Base = declarative_base()

# -------------------------
# ⚡ Session Local
# -------------------------
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# -------------------------
# ⚡ Dependency (used in routes)
# -------------------------
def get_db():
    """
    Provides a SQLAlchemy DB session for each request.
    Usage in routes:
        db = Depends(get_db)
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

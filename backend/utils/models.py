# backend/utils/models.py

from sqlalchemy import (
    Column, Integer, String, ForeignKey, Enum,
    DateTime, Text, DECIMAL, TIMESTAMP, BLOB
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

# -------------------- USERS --------------------
class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True)
    department = Column(String(50))
    role = Column(Enum("student", "teacher", "admin", name="role_enum"), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())

    # Relationships
    student_subjects = relationship("UserSubject", back_populates="student")
    class_sessions = relationship("ClassSession", back_populates="teacher")   # for teacher_id
    attendance = relationship("Attendance", back_populates="student")
    face_data = relationship("FaceData", back_populates="user")
    logs = relationship("Log", back_populates="user")
    notifications = relationship("Notification", back_populates="student")
    summaries = relationship("AttendanceSummary", back_populates="student")


# -------------------- SUBJECTS --------------------
class Subject(Base):
    __tablename__ = "subjects"

    subject_id = Column(Integer, primary_key=True, autoincrement=True)
    subject_name = Column(String(100), nullable=False)
    department = Column(String(50))
    created_at = Column(TIMESTAMP, server_default=func.now())

    students = relationship("UserSubject", back_populates="subject")
    class_sessions = relationship("ClassSession", back_populates="subject")
    notifications = relationship("Notification", back_populates="subject")
    summaries = relationship("AttendanceSummary", back_populates="subject")


# -------------------- STUDENT-SUBJECT MAPPING --------------------
class UserSubject(Base):
    __tablename__ = "user_subjects"

    user_subject_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    subject_id = Column(Integer, ForeignKey("subjects.subject_id", ondelete="CASCADE"), nullable=False)
    role = Column(Enum("student", name="user_subject_role_enum"), nullable=False)  # only students now

    student = relationship("User", back_populates="student_subjects")
    subject = relationship("Subject", back_populates="students")


# -------------------- CLASS SESSIONS --------------------
class ClassSession(Base):
    __tablename__ = "class_sessions"

    session_id = Column(Integer, primary_key=True, autoincrement=True)
    subject_id = Column(Integer, ForeignKey("subjects.subject_id", ondelete="CASCADE"), nullable=False)
    teacher_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime)
    status = Column(Enum("ongoing", "completed", name="session_status_enum"), server_default="ongoing")

    subject = relationship("Subject", back_populates="class_sessions")
    teacher = relationship("User", back_populates="class_sessions")
    attendance = relationship("Attendance", back_populates="session")


# -------------------- ATTENDANCE --------------------
class Attendance(Base):
    __tablename__ = "attendance"

    attendance_id = Column(Integer, primary_key=True, autoincrement=True)
    session_id = Column(Integer, ForeignKey("class_sessions.session_id", ondelete="CASCADE"), nullable=False)
    student_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    status = Column(Enum("present", "absent", "late", name="attendance_status_enum"), server_default="absent")
    marked_by = Column(Integer, ForeignKey("users.user_id", ondelete="SET NULL"))
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    session = relationship("ClassSession", back_populates="attendance")
    student = relationship("User", back_populates="attendance")


# -------------------- FACE DATA --------------------
class FaceData(Base):
    __tablename__ = "face_data"

    face_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    embedding = Column(BLOB)    # face embedding vector
    image_path = Column(String(255))
    created_at = Column(TIMESTAMP, server_default=func.now())

    user = relationship("User", back_populates="face_data")


# -------------------- LOGS --------------------
class Log(Base):
    __tablename__ = "logs"

    log_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="SET NULL"))
    action = Column(String(255))
    timestamp = Column(TIMESTAMP, server_default=func.now())
    status = Column(String(50))

    user = relationship("User", back_populates="logs")


# -------------------- ATTENDANCE SUMMARY --------------------
class AttendanceSummary(Base):
    __tablename__ = "attendance_summary"

    summary_id = Column(Integer, primary_key=True, autoincrement=True)
    student_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    subject_id = Column(Integer, ForeignKey("subjects.subject_id", ondelete="CASCADE"), nullable=False)
    total_classes = Column(Integer, default=0)
    attended_classes = Column(Integer, default=0)
    attendance_percent = Column(DECIMAL(5, 2), default=0.00)
    last_updated = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    student = relationship("User", back_populates="summaries")
    subject = relationship("Subject", back_populates="summaries")


# -------------------- NOTIFICATIONS --------------------
class Notification(Base):
    __tablename__ = "notifications"

    notification_id = Column(Integer, primary_key=True, autoincrement=True)
    student_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    subject_id = Column(Integer, ForeignKey("subjects.subject_id", ondelete="CASCADE"), nullable=False)
    message = Column(String(255))
    status = Column(Enum("unread", "read", name="notification_status_enum"), server_default="unread")
    created_at = Column(TIMESTAMP, server_default=func.now())

    student = relationship("User", back_populates="notifications")
    subject = relationship("Subject", back_populates="notifications")

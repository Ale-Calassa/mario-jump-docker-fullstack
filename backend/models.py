from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database import Base

class Score(Base):
    __tablename__ = "scores"
    id = Column(Integer, primary_key=True, index=True)
    player = Column(String(100), nullable=False)
    points = Column(Integer, nullable=False)
    played_at = Column(DateTime, default=datetime.utcnow)

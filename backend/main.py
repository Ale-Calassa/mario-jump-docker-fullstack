from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import models
import schemas
import database

app = FastAPI()
models.Base.metadata.create_all(bind=database.engine)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/api/score")
def save_score(score: schemas.ScoreInput, db: Session = Depends(get_db)):
    new_score = models.Score(player=score.player, points=score.points)
    db.add(new_score)
    db.commit()
    db.refresh(new_score)
    return {"success": True, "id": new_score.id}

@app.get("/api/score")
def get_scores(db: Session = Depends(get_db)):
    scores = db.query(models.Score).order_by(models.Score.points.desc()).limit(10).all()
    return scores

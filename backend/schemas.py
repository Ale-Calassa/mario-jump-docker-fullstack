from pydantic import BaseModel

class ScoreInput(BaseModel):
    player: str
    points: int

package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type Route struct {
	ID          primitive.ObjectID `json:"id" bson:"_id"`
	Name        string             `json:"name" bson:"name" validate:"required,min=2,max=100"`
	Coordinates [][]float32        `json:"coordinates" bson:"coordinates" validate:"required"`
	CreatedAt   time.Time          `json:"created_at" bson:"created_at"`
	UserID      primitive.ObjectID `json:"user_id" bson:"user_id"`
}

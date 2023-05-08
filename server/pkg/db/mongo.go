package db

import (
	"context"
	"fmt"
	"github.com/antonpodkur/Router/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"time"
)

func MongoClient(cfg *config.Config) *mongo.Client {
	client, err := mongo.NewClient(options.Client().ApplyURI(cfg.Mongo.MongoURI))
	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to database")
	return client
}

func OpenCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	collection := client.Database("router").Collection(collectionName)
	return collection
}

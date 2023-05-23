package usecase

import (
	"context"
	"errors"
	"github.com/antonpodkur/Router/config"
	"github.com/antonpodkur/Router/internal/models"
	"github.com/antonpodkur/Router/internal/route"
	"github.com/antonpodkur/Router/pkg/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type routeUsecase struct {
	cfg         *config.Config
	mongoClient *mongo.Client
	ctx         context.Context
}

func NewRouteUsecase(cfg *config.Config, mongoClient *mongo.Client, ctx context.Context) route.Usecase {
	return &routeUsecase{
		cfg:         cfg,
		mongoClient: mongoClient,
		ctx:         ctx,
	}
}

func (u *routeUsecase) GetAll(userId string) (*[]models.Route, error) {
	routesCollection := db.OpenCollection(u.mongoClient, "routes")
	oid, _ := primitive.ObjectIDFromHex(userId)

	var routes []models.Route

	query := bson.M{"user_id": oid}
	cursor, err := routesCollection.Find(u.ctx, query)
	if err != nil {
		return nil, err
	}

	defer cursor.Close(u.ctx)

	for cursor.Next(u.ctx) {
		var route models.Route
		if err := cursor.Decode(&route); err != nil {
			return nil, err
		}
		routes = append(routes, route)
	}
	return &routes, nil
}

func (u *routeUsecase) GetById(id string) (*models.Route, error) {
	routesCollection := db.OpenCollection(u.mongoClient, "routes")
	oid, _ := primitive.ObjectIDFromHex(id)

	var route models.Route
	query := bson.M{"_id": oid}

	err := routesCollection.FindOne(u.ctx, query).Decode(&route)
	if err != nil {
		return nil, err
	}

	return &route, nil
}

func (u *routeUsecase) GetByName(name string) (*models.Route, error) {
	routesCollection := db.OpenCollection(u.mongoClient, "routes")

	var route models.Route
	query := bson.M{"_id": name}

	err := routesCollection.FindOne(u.ctx, query).Decode(&route)
	if err != nil {
		return nil, err
	}

	return &route, nil
}

func (u *routeUsecase) Save(route *models.Route) (*models.Route, error) {
	routesCollection := db.OpenCollection(u.mongoClient, "routes")
	route.ID = primitive.NewObjectID()
	res, err := routesCollection.InsertOne(u.ctx, route)
	if err != nil {
		if er, ok := err.(mongo.WriteException); ok && er.WriteErrors[0].Code == 11000 {
			return nil, errors.New("route with that name already exist")
		}
		return nil, err
	}

	opt := options.Index()
	opt.SetUnique(true)
	index := mongo.IndexModel{Keys: bson.M{"name": 1}, Options: opt}

	if _, err := routesCollection.Indexes().CreateOne(u.ctx, index); err != nil {
		return nil, errors.New("could not create index for name")
	}

	var newRoute models.Route
	query := bson.M{"_id": res.InsertedID}

	err = routesCollection.FindOne(u.ctx, query).Decode(&newRoute)
	if err != nil {
		return nil, err
	}

	return &newRoute, nil
}

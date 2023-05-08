package server

import (
	"fmt"
	"github.com/antonpodkur/Router/config"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
)

type Server struct {
	cfg    *config.Config
	db     *mongo.Client
	engine *gin.Engine
}

func NewServer(cfg *config.Config, db *mongo.Client, engine *gin.Engine) *Server {
	return &Server{
		cfg:    cfg,
		db:     db,
		engine: engine,
	}
}

func (s *Server) Run() {
	err := s.MapHandlers(s.engine)
	if err != nil {
		log.Panic(err)
	}

	if err := s.engine.Run(":4000"); err != nil {
		log.Panic(err)
	}

	fmt.Println("Server started on port 4000")
}

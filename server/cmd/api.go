package main

import (
	"github.com/antonpodkur/Router/config"
	"github.com/antonpodkur/Router/internal/server"
	"github.com/antonpodkur/Router/pkg/db"
	"github.com/antonpodkur/Router/pkg/utils"
	"github.com/gin-gonic/gin"
	"log"
)

func main() {
	log.Println("Starting api server")

	configPath := utils.GetConfigPath("local")

	cfgFile, err := config.LoadConfig(configPath)
	if err != nil {
		log.Fatal("LoadConfig: %v", err.Error())
	}

	cfg, err := config.ParseConfig(cfgFile)
	if err != nil {
		log.Fatal("PaeseConfig: %v", err.Error())
	}

	mongoClient := db.MongoClient(cfg)

	router := gin.Default()
	s := server.NewServer(cfg, mongoClient, router)
	s.Run()
}

package server

import (
	"context"
	authDelivery "github.com/antonpodkur/Router/internal/auth/delivery"
	authUC "github.com/antonpodkur/Router/internal/auth/usecase"
	"github.com/antonpodkur/Router/internal/middleware"
	"github.com/gin-gonic/gin"
)

func (s *Server) MapHandlers(engine *gin.Engine) error {
	ctx := context.TODO()

	// init usecases
	authUsecase := authUC.NewAuthUsecase(s.cfg, s.db, ctx)

	// init handlers
	authHandlers := authDelivery.NewAuthHandlers(s.cfg, authUsecase)

	mw := middleware.NewMiddlewareManager(s.cfg, authUsecase)

	v1 := engine.Group("/api/v1")

	authGroup := v1.Group("/auth")

	authDelivery.MapAuthRoutes(authGroup, authHandlers, mw)

	return nil
}

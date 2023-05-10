package server

import (
	"context"
	authDelivery "github.com/antonpodkur/Router/internal/auth/delivery"
	authUC "github.com/antonpodkur/Router/internal/auth/usecase"
	"github.com/antonpodkur/Router/internal/middleware"
	routeDelivery "github.com/antonpodkur/Router/internal/route/delivery"
	routeUC "github.com/antonpodkur/Router/internal/route/usecase"
	"github.com/gin-gonic/gin"
)

func (s *Server) MapHandlers(engine *gin.Engine) error {
	ctx := context.TODO()

	// init usecases
	authUsecase := authUC.NewAuthUsecase(s.cfg, s.db, ctx)
	routeUsecase := routeUC.NewRouteUsecase(s.cfg, s.db, ctx)

	// init handlers
	authHandlers := authDelivery.NewAuthHandlers(s.cfg, authUsecase)
	routeHandlers := routeDelivery.NewRouteHandlers(s.cfg, routeUsecase)

	mw := middleware.NewMiddlewareManager(s.cfg, authUsecase)

	v1 := engine.Group("/api/v1")

	authGroup := v1.Group("/auth")
	routeGroup := v1.Group("/route")

	authDelivery.MapAuthRoutes(authGroup, authHandlers, mw)
	routeDelivery.MapRouteRoutes(routeGroup, routeHandlers, mw)

	return nil
}

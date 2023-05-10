package delivery

import (
	"github.com/antonpodkur/Router/internal/middleware"
	"github.com/antonpodkur/Router/internal/route"
	"github.com/gin-gonic/gin"
)

func MapRouteRoutes(routeGroup *gin.RouterGroup, h route.Handlers, mw *middleware.MiddlewareManager) {
	routeGroup.Use(mw.AuthJwtMiddleware())
	routeGroup.GET("/user/:userId", h.GetAll())
	routeGroup.GET("/:id", h.GetById())
	routeGroup.GET("/search/:name", h.GetByName())
	routeGroup.POST("/", h.Save())
}

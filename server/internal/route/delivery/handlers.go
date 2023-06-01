package delivery

import (
	"github.com/antonpodkur/Router/config"
	"github.com/antonpodkur/Router/internal/models"
	"github.com/antonpodkur/Router/internal/route"
	"github.com/gin-gonic/gin"
	"net/http"
)

type routeHandlers struct {
	cfg          *config.Config
	routeUsecase route.Usecase
}

func NewRouteHandlers(cfg *config.Config, routeUsecase route.Usecase) route.Handlers {
	return &routeHandlers{
		cfg:          cfg,
		routeUsecase: routeUsecase,
	}
}

func (h *routeHandlers) GetAll() gin.HandlerFunc {
	return func(c *gin.Context) {
		userId := c.Param("userId")
		routes, err := h.routeUsecase.GetAll(userId)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"status": "success", "data": routes})
	}
}

func (h *routeHandlers) GetById() gin.HandlerFunc {
	return func(c *gin.Context) {
		routeId := c.Param("routeId")
		route, err := h.routeUsecase.GetById(routeId)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"status": "success", "data": route})
	}
}

func (h *routeHandlers) GetByName() gin.HandlerFunc {
	return func(c *gin.Context) {
		routeName := c.Param("name")
		route, err := h.routeUsecase.GetByName(routeName)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"status": "success", "data": route})
	}
}

func (h *routeHandlers) Save() gin.HandlerFunc {
	return func(c *gin.Context) {
		var route *models.Route

		if err := c.ShouldBindJSON(&route); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
			return
		}

		newRoute, err := h.routeUsecase.Save(route)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"status": "success", "data": newRoute})
	}
}

func (h *routeHandlers) Delete() gin.HandlerFunc {
	return func(c *gin.Context) {
		routeId := c.Param("routeId")
		err := h.routeUsecase.Delete(routeId)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": err.Error()})
		}
		c.JSON(http.StatusOK, gin.H{"status": "success"})
	}
}

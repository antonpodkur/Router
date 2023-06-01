package route

import "github.com/gin-gonic/gin"

type Handlers interface {
	GetAll() gin.HandlerFunc
	GetById() gin.HandlerFunc
	GetByName() gin.HandlerFunc
	Save() gin.HandlerFunc
	Delete() gin.HandlerFunc
}

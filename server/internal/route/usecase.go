package route

import (
	"github.com/antonpodkur/Router/internal/models"
)

type Usecase interface {
	GetAll(string) (*[]models.Route, error)
	GetById(string) (*models.Route, error)
	GetByName(string) (*models.Route, error)
	Save(*models.Route) (*models.Route, error)
	Delete(string) error
}

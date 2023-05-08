package auth

import (
	"github.com/antonpodkur/Router/internal/models"
)

type Usecase interface {
	SignUp(*models.SignUpInput) (*models.DBResponse, error)
	SignIn(input *models.SignInInput) (*models.DBResponse, error)
	GetUserById(string) (*models.DBResponse, error)
	GetUserByEmail(string) (*models.DBResponse, error)
}

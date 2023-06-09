package middleware

import (
	"github.com/antonpodkur/Router/config"
	"github.com/antonpodkur/Router/internal/auth"
)

type MiddlewareManager struct {
	cfg         *config.Config
	authUsecase auth.Usecase
}

func NewMiddlewareManager(cfg *config.Config, authUsecase auth.Usecase) *MiddlewareManager {
	return &MiddlewareManager{
		cfg:         cfg,
		authUsecase: authUsecase,
	}
}

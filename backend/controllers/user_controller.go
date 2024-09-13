package controllers

import (
	"chat-app/models"
	"chat-app/repositories"
	"net/http"

	"github.com/labstack/echo/v4"
)

// Create a new user
func PostUser(c echo.Context) error {
	var user models.User
	if err := c.Bind(&user); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	result, err := repositories.InsertUser(&user)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, result)
}

// Get all users
func GetAllUsers(c echo.Context) error {
	users, err := repositories.FindAllUsers()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, users)
}

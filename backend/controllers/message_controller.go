package controllers

import (
	"chat-app/assets"
	"chat-app/models"
	"chat-app/repositories"
	"encoding/json"
	"net/http"

	"github.com/labstack/echo/v4"
)

// Create a new user
func PostMessage(c echo.Context) error {
	var message models.Message
	if err := c.Bind(&message); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	result, err := repositories.InsertMessage(&message)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	payload, err := message.ToPayload()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	// Marshal Payload to JSON bytes
	bytes, err := json.Marshal(payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	// Broadcast the message
	assets.GlobalConnectionManager.BroadcastMessage(bytes)

	return c.JSON(http.StatusCreated, result)
}

// Get all users
func GetMessagesOfChat(c echo.Context) error {
	users, err := repositories.FindAllUsers()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, users)
}

func SocketPostMessage(c echo.Context, message *models.Message) error {
	_, err := repositories.InsertMessage(message)
	if err != nil {
		return err
	}

	return nil
}

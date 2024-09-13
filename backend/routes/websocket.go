package routes

import (
	"chat-app/controllers"

	"github.com/labstack/echo/v4"
)

func RegisterWebSocketRoutes(e *echo.Echo) {
	e.GET("/ws", controllers.HandleConnection)
}

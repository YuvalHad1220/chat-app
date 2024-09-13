package routes

import (
	"chat-app/controllers"

	"github.com/labstack/echo/v4"
)

func RegisterHTTPRoutes(e *echo.Echo) {
	e.POST("/user", controllers.PostUser)
	e.GET("/user", controllers.GetAllUsers)
}

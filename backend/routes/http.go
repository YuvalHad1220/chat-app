package routes

import (
	"chat-app/controllers"

	"github.com/labstack/echo/v4"
)

func RegisterHTTPRoutes(e *echo.Echo) {
	e.GET("/hello", controllers.HelloHandler)
}

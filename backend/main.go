package main

import (
	"chat-app/routes"
	"fmt"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	// Register routes
	routes.RegisterWebSocketRoutes(e)
	routes.RegisterHTTPRoutes(e)

	// Start the server on port 8080
	fmt.Println("Server started at http://localhost:8080")
	if err := e.Start(":8080"); err != nil {
		fmt.Println("Error starting server:", err)
	}
}

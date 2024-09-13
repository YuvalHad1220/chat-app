package main

import (
	"chat-app/routes"
	"chat-app/services"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	// Initialize the MongoDB connection
	err = services.InitMongoDB(os.Getenv("DB_URL"), "chatApp")
	if err != nil {
		log.Fatalf("Error initializing MongoDB: %v", err)
	}

	// Ensure the MongoDB connection is closed when the program exits
	defer services.CloseMongoDB()
	e := echo.New()
	e.HideBanner = true
	e.Use(middleware.CORS())

	// Register routes
	routes.RegisterWebSocketRoutes(e)
	routes.RegisterHTTPRoutes(e)

	// Start the server on port 8080
	if err := e.Start(":8080"); err != nil {
		fmt.Println("Error starting server:", err)
	}
}

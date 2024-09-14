// controllers/chat_controller.go
package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"chat-app/assets" // Import the models package where the Message struct is defined
	"chat-app/models"

	// Import the models package where the Message struct is defined
	// Import the websocket package for Payload

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func HandleConnection(c echo.Context) error {
	// Upgrade the connection to a WebSocket connection
	conn, err := upgrader.Upgrade(c.Response().Writer, c.Request(), nil)
	if err != nil {
		fmt.Println("Error while upgrading connection:", err)
		return err
	}
	defer conn.Close()
	assets.GlobalConnectionManager.AddConnection(conn)
	defer assets.GlobalConnectionManager.RemoveConnection(conn)
	// Log the IP and port of the incoming connection
	addr := c.Request().RemoteAddr
	fmt.Println("Client connected from:", addr)

	for {
		// Read message from the client
		_, msg, err := conn.ReadMessage()
		if err != nil {
			if websocket.IsCloseError(err, websocket.CloseNormalClosure, websocket.CloseGoingAway) {
				fmt.Println("Connection closed:", addr)
			} else {
				fmt.Println("Error while reading message:", err)
			}
			break
		}

		// Unmarshal the message into the Message struct
		var payload assets.Payload
		if err := json.Unmarshal(msg, &payload); err != nil {
			fmt.Println("Error while unmarshaling payload:", err)
			continue
		}

		switch payload.PayloadType {
		case assets.MessageType:
			{
				fmt.Println("Message")
			}
		case assets.UserType:
			{
				fmt.Println("User")
			}
		}
		var message models.Message
		err = message.FromPayload(&payload)
		if err != nil {
			fmt.Println(err)
			continue
		}

		// Log the received message
		fmt.Printf("Received message from %s to %s: %s at %s\n", message.SenderId, message.ReceiverId, message.Content, message.TimeSent)

		assets.GlobalConnectionManager.BroadcastMessage(msg)

	}

	return nil
}

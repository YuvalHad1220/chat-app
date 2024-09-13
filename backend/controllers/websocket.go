// controllers/chat_controller.go
package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"chat-app/_websocket" // Import the models package where the Message struct is defined
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
		var payload _websocket.Payload
		if err := json.Unmarshal(msg, &payload); err != nil {
			fmt.Println("Error while unmarshaling payload:", err)
			continue
		}

		message, err := payload.ToMessage()
		if err != nil {
			fmt.Println(err)
			continue
		}

		// Log the received message
		fmt.Printf("Received message from %s to %s: %s at %s\n", message.SenderId, message.ReceiverId, message.Content, message.TimeSent)

		// Process the message or perform actions based on its content here

		// // Prepare a response payload if needed
		// responsePayload := _websocket.Payload{
		// 	PayloadType:    _websocket.MessageType,
		// 	PayloadContent: msg, // Send raw payload back or modify as needed
		// }

		// // Marshal the response payload
		// responseMsg, err := json.Marshal(responsePayload)
		// if err != nil {
		// 	fmt.Println("Error while marshaling response:", err)
		// 	break
		// }

		// Echo the message back to the client
		st := make([]byte, 23)
		err = conn.WriteMessage(websocket.TextMessage, st)
		if err != nil {
			fmt.Println("Error while writing message:", err)
			break
		}
	}

	return nil
}

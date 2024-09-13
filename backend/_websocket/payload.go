// websocket/payload.go
package _websocket

import (
	"chat-app/models" // Import the models package where the Message struct is defined
	"encoding/json"
)

type PayloadType string

const (
	MessageType PayloadType = "MSG"
	// Add other types as needed
)

type Payload struct {
	PayloadType    PayloadType     `json:"payloadType"`
	PayloadContent json.RawMessage `json:"payloadContent"` // RawMessage for flexible content handling
}

// Convert Payload to Message
func (p *Payload) ToMessage() (*models.Message, error) {
	if p.PayloadType != MessageType {
		return nil, nil // Or return an error if the type is not message
	}

	var msg models.Message
	err := json.Unmarshal(p.PayloadContent, &msg)
	if err != nil {
		return nil, err
	}

	return &msg, nil
}

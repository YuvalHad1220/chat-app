// models/message.go
package models

import (
	"chat-app/assets"
	"encoding/json"
)

type Message struct {
	SenderId   string `json:"senderId"`
	ReceiverId string `json:"receiverId"`
	Content    string `json:"content"`
	TimeSent   string `json:"timeSent"`
}

func (m *Message) ToPayload() (*assets.Payload, error) {
	msgBytes, err := json.Marshal(m)
	if err != nil {
		return nil, err
	}
	return &assets.Payload{
		PayloadType:    assets.MessageType,
		PayloadContent: msgBytes,
	}, nil
}

func (m *Message) FromPayload(p *assets.Payload) error {
	if p.PayloadType != assets.MessageType {
		return nil // Or return an appropriate error
	}
	return json.Unmarshal(p.PayloadContent, m)
}

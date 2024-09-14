package models

import (
	"chat-app/assets"
	"encoding/json"
)

type User struct {
	ChatId   string `json:"chatId" bson:"chatId"`
	Username string `json:"username" bson:"username"`
}

func (u *User) ToPayload() (*assets.Payload, error) {
	userBytes, err := json.Marshal(u)
	if err != nil {
		return nil, err
	}
	return &assets.Payload{
		PayloadType:    assets.UserType,
		PayloadContent: userBytes,
	}, nil
}

func (u *User) FromPayload(p *assets.Payload) error {
	if p.PayloadType != assets.UserType {
		return nil // Or return an appropriate error
	}
	return json.Unmarshal(p.PayloadContent, u)
}

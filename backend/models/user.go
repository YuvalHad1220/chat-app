package models

type User struct {
	ChatId   string `json:"chatId" bson:"chatId"`
	Username string `json:"username" bson:"username"`
}

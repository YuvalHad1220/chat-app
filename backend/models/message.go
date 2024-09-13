// models/message.go
package models

type Message struct {
	SenderId   string `json:"senderId"`
	ReceiverId string `json:"receiverId"`
	Content    string `json:"content"`
	TimeSent   string `json:"timeSent"`
}

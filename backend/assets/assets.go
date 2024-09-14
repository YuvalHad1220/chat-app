package assets

import "encoding/json"

// PayloadConverter defines methods for converting to and from Payloads.
type PayloadConverter interface {
	ToPayload() (*Payload, error)
	FromPayload(payload *Payload) error
}

// PayloadType defines the type of payload
type PayloadType string

const (
	MessageType PayloadType = "MSG"
	UserType    PayloadType = "USER"
	// Add other types as needed
)

type Payload struct {
	PayloadType    PayloadType     `json:"payloadType"`
	PayloadContent json.RawMessage `json:"payloadContent"` // RawMessage for flexible content handling
}

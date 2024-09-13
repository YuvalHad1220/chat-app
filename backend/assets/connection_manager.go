package assets

import (
	"sync"
	"github.com/gorilla/websocket"
)

// ConnectionManager manages active WebSocket connections
type ConnectionManager struct {
	connections map[*websocket.Conn]bool
	mu          sync.Mutex
}

// NewConnectionManager creates a new instance of ConnectionManager
func NewConnectionManager() *ConnectionManager {
	return &ConnectionManager{
		connections: make(map[*websocket.Conn]bool),
	}
}

// Global instance of ConnectionManager
var GlobalConnectionManager = NewConnectionManager()

// AddConnection adds a new WebSocket connection to the manager
func (m *ConnectionManager) AddConnection(conn *websocket.Conn) {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.connections[conn] = true
}

// RemoveConnection removes a WebSocket connection from the manager
func (m *ConnectionManager) RemoveConnection(conn *websocket.Conn) {
	m.mu.Lock()
	defer m.mu.Unlock()
	delete(m.connections, conn)
}

// BroadcastMessage sends a message to all active connections
func (m *ConnectionManager) BroadcastMessage(message []byte) {
	m.mu.Lock()
	defer m.mu.Unlock()
	for conn := range m.connections {
		if err := conn.WriteMessage(websocket.TextMessage, message); err != nil {
			conn.Close()
			delete(m.connections, conn)
		}
	}
}

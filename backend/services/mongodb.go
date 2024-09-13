package services

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var MongoClient *mongo.Client
var UserCollection *mongo.Collection

// InitMongoDB initializes the MongoDB connection and stores the collection references
func InitMongoDB(uri string, dbName string) error {
	// Set timeout for the context
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	clientOptions := options.Client().ApplyURI(uri)

	// Create the client
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		return err
	}

	// Ping MongoDB to verify the connection
	err = client.Ping(ctx, nil)
	if err != nil {
		return err
	}

	fmt.Println("Connected to MongoDB!")

	// Store the references globally
	MongoClient = client
	UserCollection = client.Database(dbName).Collection("users")

	return nil
}

// CloseMongoDB closes the MongoDB connection
func CloseMongoDB() {
	if MongoClient != nil {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		err := MongoClient.Disconnect(ctx)
		if err != nil {
			log.Fatalf("Error disconnecting from MongoDB: %v", err)
		}
		fmt.Println("Disconnected from MongoDB.")
	}
}

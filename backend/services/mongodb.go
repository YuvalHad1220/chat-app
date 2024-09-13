package services

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var MongoClient *mongo.Client
var UserCollection *mongo.Collection

func ensureUniqueChatIdIndex(collection *mongo.Collection) error {
	// Create a context
	ctx := context.TODO()

	// Define the index model
	indexModel := mongo.IndexModel{
		Keys:    bson.M{"chatId": 1},             // Index on the chatId field
		Options: options.Index().SetUnique(true), // Make the index unique
	}

	// Create the index
	_, err := collection.Indexes().CreateOne(ctx, indexModel)
	return err
}

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
	ensureUniqueChatIdIndex(UserCollection)

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

package repositories

import (
	"chat-app/models"
	"chat-app/services"
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func InsertMessage(message *models.Message) (*mongo.InsertOneResult, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := services.MessageCollection.InsertOne(ctx, message)
	if err != nil {
		log.Printf("Error inserting message: %v\n", err)
		return nil, err
	}

	return result, nil
}

func FindMessagesOfChatId(chatIdA string, chatIdB string) ([]models.Message, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	meesages := make([]models.Message, 0)
	filter := bson.M{
		"$or": []bson.M{
			{"SenderId": chatIdA, "ReceiverId": chatIdB},
			{"SenderId": chatIdB, "ReceiverId": chatIdA},
		},
	}
	// Perform the query
	cursor, err := services.UserCollection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	// Decode the results into the slice
	if err := cursor.All(ctx, &meesages); err != nil {
		return nil, err
	}

	return meesages, nil
}

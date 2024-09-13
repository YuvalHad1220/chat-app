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

func InsertUser(user *models.User) (*mongo.InsertOneResult, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := services.UserCollection.InsertOne(ctx, user)
	if err != nil {
		log.Printf("Error inserting user: %v\n", err)
		return nil, err
	}

	return result, nil
}

func FindUserByChatId(chatId string) (*models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var user models.User
	filter := bson.M{"chatId": chatId}

	err := services.UserCollection.FindOne(ctx, filter).Decode(&user)
	if err != nil {
		log.Printf("Error finding user: %v\n", err)
		return nil, err
	}

	return &user, nil
}

func FindAllUsers() ([]models.User, error) {
	// Create a context with a timeout
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var users []models.User

	// Perform the query
	cursor, err := services.UserCollection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	// Decode the results into the slice
	if err := cursor.All(ctx, &users); err != nil {
		return nil, err
	}

	return users, nil
}

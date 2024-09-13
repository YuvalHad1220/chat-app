import axios from "axios";

// Function to fetch all users using axios
export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get('http://localhost:8080/user');
  return response.data; // axios automatically parses the response data
};

// Function to post a new user using axios
export const postUser = async (newUser: User) => {
  const response = await axios.post('http://localhost:8080/user', newUser);
  return response.data;
};
// pages/api/users.js
import User from "../../models/User"; // Import the User model
import sequelize from "../../config/database"; // Import the Sequelize connection

export default async function handler(req, res) {
  // Authenticate the database connection
  try {
    await sequelize.authenticate(); // This makes sure the DB connection is established

    if (req.method === "GET") {
      try {
        const users = await User.findAll(); // Fetch all users from the DB
        res.status(200).json(users); // Return users as a JSON response
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching users" });
      }
    } else if (req.method === "POST") {
      try {
        const { name, email } = req.body; // Get data from the request body
        const newUser = await User.create({ name, email }); // Create a new user
        res.status(201).json(newUser); // Return the created user
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to connect to the database" });
  }
}

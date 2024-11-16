import sequelize from "../config/database.js";
import { User, Group, Expense } from "../models/index.js";

async function init() {
  try {
    await sequelize.authenticate(); // Check DB connection
    await sequelize.sync(); // Sync models with DB
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
}
console.log(User.associations);
console.log(Group.associations);

init();

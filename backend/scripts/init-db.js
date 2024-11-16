import sequelize from "./config/database.js";
import { User, Group, Expense } from "./models/index.js";

async function init() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true });
      console.log("Database synced successfully");
    }
  } catch (error) {
    console.error("Error syncing database:", error);
    process.exit(1); // Exit the process on error
  }
}

init();

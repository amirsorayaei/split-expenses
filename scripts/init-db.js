import sequelize from "../config/database.js";
import User from "../models/User.js";
import Expense from "../models/Expense.js";
import Group from "../models/Group.js";

async function init() {
  try {
    await sequelize.sync(); // Sync all models with the DB
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
}

User.hasMany(Group, { foreignKey: "userId", onDelete: "CASCADE" });
Group.belongsTo(User, { foreignKey: "userId" });

Group.hasMany(Expense, { foreignKey: "groupId", onDelete: "CASCADE" });
Expense.belongsTo(Group, { foreignKey: "groupId" });

init();

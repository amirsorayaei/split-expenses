import { User } from "./User.js";
import { Group } from "./Group.js";
import { Expense } from "./Expense.js";

User.hasMany(Group, { foreignKey: "userId", onDelete: "CASCADE" });
Group.belongsTo(User, { foreignKey: "userId" });

Group.hasMany(Expense, { foreignKey: "groupId", onDelete: "CASCADE" });
Expense.belongsTo(Group, { foreignKey: "groupId" });

export { User, Group, Expense };

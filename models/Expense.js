import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Expense = sequelize.define("expense", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  payorUser: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  usersShare: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

export default Expense;

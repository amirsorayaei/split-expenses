import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const Group = sequelize.define("group", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "USD",
  },
  users: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

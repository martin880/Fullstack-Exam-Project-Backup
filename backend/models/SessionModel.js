import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Sessions = db.define(
  "Session",
  {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    expires: {
      type: DataTypes.DATE,
    },
    data: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Users, // Reference to the Users model
        key: "uuid",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Users.hasMany(Sessions, { foreignKey: "userId" }); // Relasi one-to-many
Sessions.belongsTo(Users, { foreignKey: "userId" }); // The opposite relationship

export default Sessions;

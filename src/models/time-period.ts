import { DataTypes } from "sequelize";
import database from "../database/connection";

const TimePeriod = database.define("time_period", {
  id_time_period: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  time_period: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});

export default TimePeriod;

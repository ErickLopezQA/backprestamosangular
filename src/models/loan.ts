// models/Loan.ts
import { DataTypes, Model } from "sequelize";
import database from "../database/connection";
import Client from "./client";
import Amount from "./amount";
import TimePeriod from "./time-period";

class Loan extends Model {
  public id_loan!: number;
  public id_client!: number;
  public id_amount!: number;
  public id_time_period!: number;
  public date!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Loan.init(
  {
    id_loan: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_client: {
      type: DataTypes.INTEGER,
      references: {
        model: Client,
        key: "id_client",
      },
    },
    id_amount: {
      type: DataTypes.INTEGER,
      references: {
        model: Amount,
        key: "id_amount",
      },
    },
    id_time_period: {
      type: DataTypes.INTEGER,
      references: {
        model: TimePeriod,
        key: "id_time_period",
      },
    },
  },
  {
    sequelize: database,
    modelName: "Loan",
  }
);

// Asociaciones
Loan.belongsTo(Client, { foreignKey: "id_client" });
Loan.belongsTo(Amount, { foreignKey: "id_amount" });
Loan.belongsTo(TimePeriod, { foreignKey: "id_time_period" });

export default Loan;
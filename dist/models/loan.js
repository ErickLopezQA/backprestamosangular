"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Loan.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const client_1 = __importDefault(require("./client"));
const amount_1 = __importDefault(require("./amount"));
const time_period_1 = __importDefault(require("./time-period"));
class Loan extends sequelize_1.Model {
}
Loan.init({
    id_loan: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_client: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: client_1.default,
            key: "id_client",
        },
    },
    id_amount: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: amount_1.default,
            key: "id_amount",
        },
    },
    id_time_period: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: time_period_1.default,
            key: "id_time_period",
        },
    },
}, {
    sequelize: connection_1.default,
    modelName: "Loan",
});
// Asociaciones
Loan.belongsTo(client_1.default, { foreignKey: "id_client" });
Loan.belongsTo(amount_1.default, { foreignKey: "id_amount" });
Loan.belongsTo(time_period_1.default, { foreignKey: "id_time_period" });
exports.default = Loan;

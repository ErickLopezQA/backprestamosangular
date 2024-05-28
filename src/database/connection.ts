import { Sequelize } from "sequelize";

const sequelize  = new Sequelize('Prestamos_Database', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
}); 


export default sequelize;
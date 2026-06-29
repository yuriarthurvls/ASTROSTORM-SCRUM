const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'sistema_ocorrencias',
    'root',
    'Renata*1512',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = sequelize;
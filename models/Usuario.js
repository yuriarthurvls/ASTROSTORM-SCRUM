const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Usuario = db.define('Usuario', {

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    cargo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

module.exports = Usuario;
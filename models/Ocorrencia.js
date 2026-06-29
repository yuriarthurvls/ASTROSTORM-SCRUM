const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Ocorrencia = db.define('Ocorrencia', {
    
    aluno: {
        type: DataTypes.STRING,
        allowNull: false
    },

    turma: {
        type: DataTypes.STRING,
        allowNull: false
    },

    professor: {
        type: DataTypes.STRING,
        allowNull: false
    },

    gravidade: {
        type: DataTypes.STRING,
        allowNull: false
    },

    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false
    },

    observacoes: {
        type: DataTypes.TEXT,
        allowNull: true
    }

});

module.exports = Ocorrencia;
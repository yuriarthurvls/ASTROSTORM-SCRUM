const express = require('express');
const { engine } = require('express-handlebars');
const { Op } = require('sequelize');
const conn = require('./db/conn');
const Ocorrencia = require('./models/Ocorrencia');
const Usuario = require('./models/Usuario');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.get('/', (req, res) => {
    res.render('home');
	});

app.get('/usuarios/novo', (req, res) => {

    res.render('cadastroUsuario');
});

app.post('/usuarios/add', async (req, res) => {

    const {
        nome,
        email,
        cargo,
        telefone
    } = req.body;

    await Usuario.create({

        nome,
        email,
        cargo,
        telefone

    });

    res.redirect('/usuarios');

});

app.get('/usuarios', async (req, res) => {

    const pesquisa = req.query.pesquisa || "";
    let where = {};
    if (pesquisa) {
        where.nome = {
            [Op.like]: `%${pesquisa}%`
        };
    }

    const usuarios = await Usuario.findAll({
        where,
        raw: true
    });

    res.render('usuarios', {
        usuarios,
        pesquisa
    });

});

app.get('/usuarios/ver/:id', async (req, res) => {

    const id = req.params.id;
    const usuario = await Usuario.findOne({
        where: {
            id: id
        },
        raw: true
    });

    res.render('verUsuario', {
        usuario
    });

});

app.get('/usuarios/edit/:id', async (req, res) => {

    const id = req.params.id;

    const usuario = await Usuario.findOne({
        where: {
            id: id
        },
        raw: true
    });

    res.render('editarUsuario', {
        usuario
    });

});

app.post('/usuarios/update', async (req, res) => {

    const id = req.body.id;

    const dados = {

        nome: req.body.nome,
        email: req.body.email,
        cargo: req.body.cargo,
        telefone: req.body.telefone

    };

    await Usuario.update(dados, {
        where: {
            id: id
        }
    });

    res.redirect('/usuarios');

});

app.post('/usuarios/delete', async (req, res) => {

    const id = req.body.id;

    await Usuario.destroy({
        where: {
            id: id
        }
    });

    res.redirect('/usuarios');

});

app.get('/dashboard', async (req, res) => {

    const total = await Ocorrencia.count();

    const graves = await Ocorrencia.count({
        where: {
            gravidade: 'Grave'
        }
    });

    const medias = await Ocorrencia.count({
        where: {
            gravidade: 'Média'
        }
    });

    const leves = await Ocorrencia.count({
        where: {
            gravidade: 'Leve'
        }
    });

    res.render('dashboard', {
        total,
        graves,
        medias,
        leves
    });

});

app.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

app.post('/cadastro', async (req, res) => {

    const {
        aluno,
        turma,
        professor,
        tipo,
        gravidade,
        status,
        descricao,
        observacoes
    } = req.body;

    await Ocorrencia.create({
        aluno,
        turma,
        professor,
        tipo,
        gravidade,
        status,
        descricao,
        observacoes
    });

    res.redirect('/ocorrencias');

});



app.get('/ocorrencias', async (req, res) => {

    const pesquisa = req.query.pesquisa || "";
    const gravidade = req.query.gravidade || "";

    let where = {};

    if (pesquisa) {
        where.aluno = {
            [Op.like]: `%${pesquisa}%`
        };
    }

    if (gravidade) {
        where.gravidade = gravidade;
    }

    const ocorrencias = await Ocorrencia.findAll({
        where,
        raw: true
    });

    res.render('ocorrencias', {
        ocorrencias,
        pesquisa,
        gravidade
    });

});

 
app.get('/ocorrencias/ver/:id', async (req, res) => {

    const id = req.params.id;

    const ocorrencia = await Ocorrencia.findOne({
        where: {
            id: id
        },
        raw: true
    });

    res.render('ver', {
        ocorrencia
    });

});


app.get('/ocorrencias/edit/:id', async (req, res) => {

    const id = req.params.id;

    const ocorrencia = await Ocorrencia.findOne({
        where: {
            id: id
        },
        raw: true
    });

    res.render('editar', {
        ocorrencia
    });

});

app.post('/ocorrencias/update', async (req, res) => {

    const id = req.body.id;

    const dados = {
        aluno: req.body.aluno,
        turma: req.body.turma,
        professor: req.body.professor,
        tipo: req.body.tipo,
        gravidade: req.body.gravidade,
        status: req.body.status,
        descricao: req.body.descricao,
        observacoes: req.body.observacoes
    };

    await Ocorrencia.update(dados, {
        where: {
            id: id
        }
    });

    res.redirect('/ocorrencias');

});


app.post('/ocorrencias/delete', async (req, res) => {

    const id = req.body.id;

    await Ocorrencia.destroy({
        where: {
            id: id
        }
    });

    res.redirect('/ocorrencias');

});


app.get('/perfil', (req, res) => {
    res.render('perfil');
});


conn.authenticate()
    .then(() => {
        console.log('Conectado ao MySQL!');
        return conn.sync({ alter: true });
    })
    .then(() => {
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    })
    .catch((err) => {
        console.log(err);
    });
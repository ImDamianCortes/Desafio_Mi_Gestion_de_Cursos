const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const momment = require('moment');

require('dotenv').config();

// Import
const { getCursos, createCurso, updateCurso, deleteCurso } = require('./db/CursosDB');

// Inicialization
const app = express();

// Configguration
const PORT = process.env.PORT || 3000;

// Middlewares
app.use("/public", express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());

//Endpoints
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

//rutas del curso
app.post('/curso', async(req, res) => {
    //console.log(req.body.nombre);
    /*
    const fechaInicio = new Date(req.body.fechaInicio);
    console.log(chalk.blue(fechaInicio.toISOString().split('T')[0]));
    */
    const dataConsulta = [
        req.body.nombre,
        req.body.nivelTecnico,
        req.body.fechaInicio,
        req.body.duracion
    ];
    const result = await createCurso(dataConsulta);
    res.send(result);
})

app.get('/cursos', async(req, res) => {
    const cursos = await getCursos();
    const data = JSON.stringify(cursos)

    //console.log(chalk.red(data));

    res.json(cursos);
})

app.put('/curso', async(req, res) => {
    console.log(req.body);
    const consulta = [
        req.body.nombre,
        req.body.nivelTecnico,
        req.body.fechaInicio,
        req.body.duracion,
    ]
    const result = await updateCurso(req.body.id, consulta);
    res.send(result);
})

app.delete('/curso/:id', async (req, res) => {
    //console.log(req.params.nombre);
    const {id} = req.params;
    const response = await deleteCurso(id);
    res.send()
})


// Starting the server
app.listen(PORT, () => {
    console.log(chalk.yellow(`\nServer is running on port ${PORT}\nhttp://localhost:${PORT}\n`));
});
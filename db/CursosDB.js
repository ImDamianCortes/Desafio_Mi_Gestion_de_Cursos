const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cursos',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// Get all cursos
const getCursos = async () => {
    const obtenerCursos = {
        text: 'SELECT * FROM cursos'
    }
    try {
        const res = await pool.query(obtenerCursos);
        //console.log(res.rows);
        return res.rows;
    } catch (e) {
        console.log(e);
    }
}

// Get a curso by id

// Create a curso

const createCurso = async (dataConsulta) => {
    const agregarCurso = {
        text: 'INSERT INTO cursos (id, nombre, nivel, fecha, duracion) VALUES (DEFAULT, $1, $2, $3, $4)',
        values: dataConsulta
    }
    try {
        const res = await pool.query(agregarCurso);
        return res.rows;
    } catch (e) {
        console.log(e);
        return e
    }
}

// Update a curso

const updateCurso = async (id, newData) => {
    const actualizarCurso = {
        text: `UPDATE cursos SET nombre = $1, nivel = $2, fecha = $3, duracion = $4 WHERE id = ${id} RETURNING *`,
        values: newData
    }
    try {
        const res = await pool.query(actualizarCurso);
        return res.rows;
    } catch (error) {
        console.log(error);
    }
}

// Delete a curso

const deleteCurso = async (id) => {
    try {
        const result = await pool.query(`DELETE FROM cursos WHERE id = '${id}'`);
        return result.rowCount;
    } catch (e) {
        return e;
    }

}

module.exports = { getCursos, createCurso, updateCurso, deleteCurso };
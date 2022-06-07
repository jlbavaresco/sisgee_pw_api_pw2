const { pool } = require('../config');
const { request, response } = require("express");

const getPredios = (request, response) => {
    pool.query('SELECT * from predios order by codigo', 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao consultar o prédio: ' + error
            });
        }
        response.status(200).json(results.rows);
    })
}

const addPredio = (request, response) => {
    const {nome, descricao, sigla } = request.body;
    pool.query(`insert into predios (nome, descricao, sigla) 
    values ($1, $2, $3) returning codigo, nome, descricao, sigla`, 
    [nome, descricao, sigla] , 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao inserir o prédio!'
            });
        }
        response.status(200).json({
            status : 'success' , message : "Prédio criado!",
            objeto : results.rows[0]
        });
    })
}

const updatePredio = (request, response) => {
    const {codigo, nome, descricao, sigla } = request.body;
    pool.query(`UPDATE predios SET  nome=$1, descricao=$2, sigla=$3
	            WHERE codigo=$4 returning codigo, nome, descricao, sigla`, 
                [nome, descricao, sigla, codigo] , 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao alterar o prédio!'
            });
        }
        response.status(200).json({
            status : 'success' , message : "Prédio alterado!",
            objeto : results.rows[0]
        });
    })
}

const deletePredio = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM predios WHERE codigo=$1`, 
                [codigo] , 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao remover o prédio! ' + (error ? error : '')
            });
        }
        response.status(200).json({
            status : 'success' , message : "Prédio removido!"
        });
    })
}

const getPredioPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM predios WHERE codigo=$1`, 
                [codigo] , 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao recuperar o prédio!'
            });
        }
        response.status(200).json(results.rows[0]);
    })
}

module.exports = {
    getPredios, addPredio, updatePredio, deletePredio, getPredioPorCodigo
}
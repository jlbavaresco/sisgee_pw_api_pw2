const {pool} = require('../config');
const {request, response} = require('express');
require('dotenv-safe');
const jwt = require('jsonwebtoken');

const login = (request, response, next) => {
    const { email, senha } = request.body;
    pool.query('SELECT * FROM usuarios where email = $1 and senha = $2', 
    [email, senha], 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(401).json({auth:false, 
                message: "Usuário ou senha inválidos"});
        }
        const email_usuario = results.rows[0].email;
        const nome_usuario = results.rows[0].nome;
        const tipo_usuario = results.rows[0].tipo;
        const token = jwt.sign({email_usuario, nome_usuario, tipo_usuario}, 
            process.env.SECRET, { expiresIn:300});// 5 minutos para expirar
        return response.json({auth:true, token:token});    
    })
}

function verificaJWT(request, response, next){
    const token = request.headers['x-access-token'];
    if (!token) return response.status(401).json({auth:false, 
        message:"Nenhum token recebido"});
    jwt.verify(token, process.env.SECRET, function(err, decoded){
        if (err) response.status(500).json({auth:false, 
        message:"Erro ao autenticar o token"});
        request.nome_usuario = decoded.nome_usuario;
        request.email_usuario = decoded.email_usuario;
        request.tipo_usuario = decoded.tipo_usuario;
        next();
    })
}

module.exports = {
    login, verificaJWT
}
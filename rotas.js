const { Router }  = require('express');

const controlePredios = require("./controladores/predios");
const controleSalas = require("./controladores/salas");
const controleSeguranca = require("./controladores/seguranca")

const rotas = new Router();

rotas.route('/predios')
   .get(controleSeguranca.verificaJWT, controlePredios.getPredios)
   .post(controleSeguranca.verificaJWT, controlePredios.addPredio)
   .put(controleSeguranca.verificaJWT, controlePredios.updatePredio)

rotas.route('/predios/:codigo')
   .get(controleSeguranca.verificaJWT, controlePredios.getPredioPorCodigo)
   .delete(controleSeguranca.verificaJWT, controlePredios.deletePredio)

rotas.route('/salas')
   .get(controleSeguranca.verificaJWT, controleSalas.getSalas)
   .post(controleSeguranca.verificaJWT, controleSalas.addSala)
   .put(controleSeguranca.verificaJWT, controleSalas.updateSala)

rotas.route('/salas/:codigo')
   .get(controleSeguranca.verificaJWT, controleSalas.getSalaPorCodigo)
   .delete(controleSeguranca.verificaJWT, controleSalas.deleteSala)

rotas.route("/login").post(controleSeguranca.login)

module.exports = rotas;
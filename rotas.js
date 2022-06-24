const { Router }  = require('express');

const controlePredios = require("./controladores/predios");
const controleSalas = require("./controladores/salas");

const rotas = new Router();

rotas.route('/predios')
   .get(controlePredios.getPredios)
   .post(controlePredios.addPredio)
   .put(controlePredios.updatePredio)

rotas.route('/predios/:codigo')
   .get(controlePredios.getPredioPorCodigo)
   .delete(controlePredios.deletePredio)

rotas.route('/salas')
   .get(controleSalas.getSalas)
   .post(controleSalas.addSala)
   .put(controleSalas.updateSala)

rotas.route('/salas/:codigo')
   .get(controleSalas.getSalaPorCodigo)
   .delete(controleSalas.deleteSala)

module.exports = rotas;
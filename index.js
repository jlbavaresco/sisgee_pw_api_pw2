const express = require('express')
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

const controlePredios = require("./controladores/predios");
const controleSalas = require("./controladores/salas");

app.route('/predios')
   .get(controlePredios.getPredios)
   .post(controlePredios.addPredio)
   .put(controlePredios.updatePredio)

app.route('/predios/:codigo')
   .get(controlePredios.getPredioPorCodigo)
   .delete(controlePredios.deletePredio)

app.route('/salas')
   .get(controleSalas.getSalas)
   .post(controleSalas.addSala)
   .put(controleSalas.updateSala)

app.route('/salas/:codigo')
   .get(controleSalas.getSalaPorCodigo)
   .delete(controleSalas.deleteSala)   

app.listen(process.env.port || 3002, () => {
    console.log('Servidor da API rodando...')
})
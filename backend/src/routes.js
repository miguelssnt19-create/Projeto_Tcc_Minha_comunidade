import { Router } from 'express';
import problemasController from './controller/problemasController.js';
import sugestoesController from './controller/sugestoesController.js';
import eventosController from './controller/eventosController.js';
import mapaController from './controller/mapaController.js';
import usuariosController from './controller/usuariosController.js';

const endpoints = Router();
endpoints.use('/problemas', problemasController);
endpoints.use('/sugestoes', sugestoesController);
endpoints.use('/eventos', eventosController);
endpoints.use('/', mapaController);
endpoints.use('/auth', usuariosController);

export default endpoints;

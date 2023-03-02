const express = require('express');
const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser'); no es necesario , ya que en las ultimas versiones de express ya vienen incluidos los middlewares
const morgan = require('morgan');
const routes = require('./routes/index');
const cors = require("cors");
const errorHandler = require('./utils/middlewares/errorHandler.js');
const setHeaders = require('./utils/middlewares/setHeaders.js');

require('./db.js');

const app = express();

app.name = 'API';

//LOS HEADERS
app.use(cors());
app.use(express.urlencoded({extended: true, limit:'50mb'}));
app.use(express.json({limit:'50mb'}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(setHeaders);


//MIDDLEWARES
app.use(errorHandler);
//RUTAS
app.use('/api', routes)



module.exports = app;

require(`dotenv`).config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./modules/user/route/index');
const productsRouter = require('./modules/products/route/index');
const purchaseItemRouter = require('./modules/purchaseItem/route/index');
const purchasesRouter = require('./modules/purchases/route/index');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/purchaseItem', purchaseItemRouter);
app.use('/purchases', purchasesRouter);

module.exports = app;
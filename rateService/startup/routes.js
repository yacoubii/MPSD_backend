const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const winston = require('winston');
const rate = require('../routes/rate');

module.exports = function(app){

	app.use(morgan('tiny'));
    winston.info("Morgan enabled...");
    
	app.use(express.json()); //middleware to dump the body to req.body to json
	app.use(express.urlencoded({extended: true})); //key=value&key=value
	app.use(helmet());
	app.use('/rate', rate);

	
}
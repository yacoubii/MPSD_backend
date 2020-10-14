const _ = require('lodash');
const {Rate, validate}=require('../models/rate');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const axios = require('axios');

router.post('/:token',async (req,res)=>{
	axios.get('http://localhost:3000/auth/isAuthenticated', {
		headers: {
			'x-auth-token': req.params.token
		}})
  		.then(async function (response) {	
			// User is authenticated
			const {error} = validate(req.body);
			if (error) return res.status(400).send(error.details[0].message);

			let post = await Rate.findOneAndRemove({postId:req.body.postId});

			rate = new Rate (_.pick(req.body,['postId','rate']));
			await rate.save();
			res.send( _.pick(rate, ['id','postId','rate']));
		})
  		.catch(function (error) {
			// User is not authenticated
			res.status(401).send('Error occurred !');
  	})
});

//returns the rating of a specific post
router.get('/:postId/:token',async (req,res)=>{
	axios.get('http://localhost:3000/auth/isAuthenticated', {
		headers: {
			'x-auth-token': req.params.token
		}})
  		.then(async function (response) {	
			// User is authenticated
			let rate = await Rate.findOne({postId:req.params.postId});
			if (!rate) return res.status(404).send('Post not found !');
			else res.send(_.pick(rate, ['rate']));
		})
  		.catch(function (error) {
			// User is not authenticated
			res.status(401).send('Error occurred !');
  	})
});

module.exports = router; 
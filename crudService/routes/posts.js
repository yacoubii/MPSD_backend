const express = require("express");
const router = express.Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
var utils = require("utils");
const jwt_decode = require("jwt-decode");
const Post = require("../models/post");

//Getting all the posts
router.get("/:token", async (req, res) => {
  axios.get("http://localhost:3000/auth/isAuthenticated", {
      headers: {
        "x-auth-token": req.params.token}})
    .then(async function (response) {
      // User is authenticated
      const posts = await Post.find();
      res.json(posts);})
    .catch(function (error) {
      // User is not authenticated
      res.status(401).send("Error occurred !");});
});

//Submitting a post
router.post("/:token", async (req, res) => {
  axios.get("http://localhost:3000/auth/isAuthenticated",{
      headers: {
        "x-auth-token": req.params.token}})
    .then(async function (response) {
      // User is authenticated
      var decoded = jwt_decode(req.params.token);
      const post = new Post({
        title: req.body.title,
        content: req.body.content,
        rate: 0,
        author: decoded.username});
      await post.save();
      res.json(post);
    })
    .catch(function (error) {
      // User is not authenticated
      res.status(401).send("Error occurred !");
    });
});

//Getting the posts of the current user
router.get("/myposts/:token",async (req,res)=>{
	axios.get('http://localhost:3000/auth/isAuthenticated', {
		headers: {
			'x-auth-token': req.params.token}})
  .then(async function (response) {
		// User is authenticated
    var decoded = jwt_decode(req.params.token);
    const post = await Post.find({ author: decoded.username }).exec();
    //const post = await Post.findById(req.params.id)
    res.json(post)})     
  .catch(function (error) {
    // User is not authenticated
    res.status(401).send('Error occurred !');})
})
 
//Update the post passed in request's body post
router.patch('/:token',async (req,res)=>{
	axios.get('http://localhost:3000/auth/isAuthenticated', {
		headers: {
			'x-auth-token': req.params.token
		}})
  	.then(async function (response) {
			// User is authenticated
      const post = await Post.findById(req.body.id);
      post.title = req.body.title;
      post.content = req.body.content;
      post.rate = req.body.rate;
      const a1 = await post.save();

      let rate = {postId:req.body.id, rate:req.body.rate};
      axios.post('http://localhost:3001/rate/'+req.params.token,rate);
      res.json(a1)})
    .catch(function (error) {
      // User is not authenticated
      res.status(401).send('Error occurred !');})
})

//Deleting a post
router.delete('/:id/:token',async (req,res)=>{
	axios.get('http://localhost:3000/auth/isAuthenticated', {
		headers: {
			'x-auth-token': req.params.token}})
  .then(async function (response) {
		// User is authenticated
    const id = req.params.id;
    Post.findByIdAndRemove(id)
    .then(data => {
      if (!data){
        res.status(404).send({message: `Cannot delete Post with id=${id}. Maybe Post was not found!`});} 
      else{
        res.send({message: "Post was deleted successfully!"});}})
    .catch(err => {
      res.status(500).send({message: "Could not delete Post with id=" + id});});})
  .catch(function (error) {
    // User is not authenticated
    res.status(401).send('Error occurred !');})
})

module.exports = router
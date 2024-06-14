//Create web server
const express = require('express');
const app = express();
const path = require('path');

//Database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments', {useNewUrlParser: true, useUnifiedTopology: true});

//Models
const Comment = require('./models/comment');

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/comments', async (req, res) => {
    const comments = await Comment.find({});
    res.json(comments);
});

app.post('/comments', async (req, res) => {
    const {username, text} = req.body;
    const comment = new Comment({username, text});
    await comment.save();
    res.json(comment);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
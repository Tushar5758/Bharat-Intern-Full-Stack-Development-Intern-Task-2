const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./models/post');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/kahaniKornerDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    const posts = await Post.find().sort({ date: -1 });
    res.render('index', { posts });
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.get('/read', async (req, res) => {
    const posts = await Post.find().sort({ date: -1 });
    res.render('read', { posts });
});

app.post('/submit', async (req, res) => {
    const { title, content } = req.body;
    const post = new Post({ title, content });
    await post.save();
    res.redirect('/read');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

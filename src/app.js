/* { ----------- EXPRESS ----------- } */
const express = require('express');
const app = express();

/* { ----------- MODELS & ROUTERS ----------- } */
require("../db/mongoose");
const Blog = require('../models/blog');
const blogRouter = require('../routers/blog');

/* { ----------- PORT ----------- } */
const port = process.env.PORT || 3000

/* { ----------- APP LISTEN ----------- } */
app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
});

/* { ----------- EJS VIEW ENGINE ----------- } */
app.set('view engine', 'ejs');

/* { ----------- MIDDLEWARE ----------- } */
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});

/* { ----------- RUTAS WEB ----------- } */
app.get('/', async (req, res) => {
    await Blog.find({}).then((data) => {
        res.render('blog', { entradas: data })
    });
});
app.get('/form-entrada', (req, res) => {
    res.render('form', {  })
});
app.get('/blog/:id', async (req, res) => {
    await Blog.findById(req.params.id).then((data)=>{
        res.render('blogbody', { entrada: data })
    });
});

/* { ----------- API ROUTING ----------- } */
// EXAMPLE: app.use('/api', modelRouter)
app.use('/api', blogRouter);

/* { ----------- EXPRESS ----------- } */
app.use((req, res) => {
    res.status(404).render('404', {});
});

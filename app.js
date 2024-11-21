const express = require('express');
const todosRoutes = require('./routes/tododb.js');
const app = express();
require('dotenv').config();
const port = process.env.PORT;

const db = require('./database/db');
const expressLayouts = require('express-ejs-layouts')

//pertemuan 7 session dan bycrpt
const session = require('express-session')
const authRoutes = require('./routes/authRoutes.js');
const { isAuthenticated } = require('./middlewares/middleware.js');

app.use(expressLayouts);

app.use(express.json());

app.use('/todos', todosRoutes);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

// Konfigurasi express-session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set ke true jika menggunakan HTTPS
}));

app.use('/', authRoutes);

app.get('/', isAuthenticated,(req, res) => {
    res.render('index', 
        {layout : 'layouts/main-layout.ejs'}
    );
});

app.get('/contact', isAuthenticated, (req, res)=>{
    res.render('contact', {
        layout : 'layouts/main-layout.ejs'
    });
})

app.listen(port,()=> {
    console.log(`server berjalan di http://localhost:${port}`);
});


app.get('/todo-view',isAuthenticated, (req, res) => {
    db.query('SELECT * FROM binatang', (err, todos) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.render('todo', {
            layout: 'layouts/main-layout.ejs',
            todos: todos
        });
    });
});
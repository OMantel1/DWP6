const express = require('express');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');
const path = require('path');

const saucesRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');


mongoose.connect('mongodb+srv://OMuser1:pwdatabgk8@cluster0-9uleb.mongodb.net/Spbd1?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à mongoDb ok !'))
    .catch(() => console.log('Connexion à mongoDb echouée !!'));


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
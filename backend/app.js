const express = require('express');
const app = express();

app.use((req, res) => {
res.json({ message: 'Votre requete à bien été recue !!!'})
})

module.exports = app;
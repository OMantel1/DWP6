const Sauce = require('../models/Sauce');

exports.getAllSauces = (req, res, next) =>{
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) =>{
    Sauce.findOne({
        _id = req.params.id
    })
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

exports.createSauce = (req, res, next) =>{
    delete req.body._id;
    const sauce = new Sauce({
        ...req.body
    })
    // const image = req.body.image;
    Sauce.save()
    .then(sauces => res.status(201).json({ message: 'sauce bien enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllSauces = (req, res, next) =>{
    Sauce.updateOne({
        _id = req.params.id
    }), {
        ...req.body,
        _id: req.params.id
    }
    .then(sauces => res.status(200).json({ message: 'sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllSauces = (req, res, next) =>{
    Sauce.deleteOne({
        _id = req.params.id
    })
    .then(sauces => res.status(200).json({ message: 'sauce supprimée !'}))
    .catch(error => res.status(400).json({ error }));
};


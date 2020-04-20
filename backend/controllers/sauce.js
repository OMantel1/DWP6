const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.getAllSauces = (req, res, next) =>{
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) =>{
    Sauce.findOne({
        _id : req.params.id
    })
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

exports.createSauce = (req, res, next) =>{
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    // const image = req.body.image;
    sauce.save()
    .then(() => res.status(201).json({ message: 'sauce bien enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) =>{

    const sauceObject = req.file ?
    {
        ...JSON.parase(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };

    Sauce.updateOne({
        _id : req.params.id
    }, {
        ...sauceObject,
        _id: req.params.id
    })
    .then(() => res.status(200).json({ message: 'sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) =>{
    Sauce.findOne({ _id: req.params.id})
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}` , () => {
            Sauce.deleteOne({
                _id : req.params.id
            })
            .then(() => res.status(200).json({ message: 'sauce supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
    })
    .catch(error => res.status(500).json({ error }));
};


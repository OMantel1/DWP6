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
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []

    });
    // const image = req.body.image;
    sauce.save()
    .then(() => res.status(201).json({ message: 'sauce bien enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) =>{

    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.sauce),
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

exports.updateLikes = (req, res, next) => {

    // console.log(req.params);
    // console.log(req.body);

    Sauce.find({_id: req.params.id})
        .then(data => {
            console.log(data[0].usersDisliked);
            const userHasDisliked = data[0].usersDisliked.includes(req.body.userId);
            const userHasLiked = data[0].usersLiked.includes(req.body.userId);

            if(req.body.like === 1 ){
                if (!userHasLiked){
                    likeSauce(req, res);
                }
                console.log('+1');
        
            } else if (req.body.like === -1){
                if(!userHasDisliked){
                    dislikeSauce(req, res);
                }
                console.log('-1');

        
            } else if(req.body.like === 0) {
                if (userHasLiked){
                    unlikeSauce(req, res);
                }
                if (userHasDisliked){
                    undislikeSauce(req, res);
                }
                console.log("0");
            }    
        })
        .catch(error => res.status(400).json({ error }));
}
function likeSauce(req, res){
    Sauce.updateOne({_id: req.params.id}, {$push: {usersLiked: req.body.userId},  $inc: { likes: 1 }})
    .then(() => res.status(200).json({ message: 'Like modifié !'}))
    .catch(error => res.status(400).json({ error }));
}

function unlikeSauce(req, res){
    Sauce.updateOne({_id: req.params.id}, {$pull: {usersLiked: req.body.userId}, $inc: {likes: -1}})
    .then(() => res.status(200).json({ message: 'Like modifié !'}))
    .catch(error => res.status(400).json({ error }));
}

function dislikeSauce(req, res){
    Sauce.updateOne({_id: req.params.id}, {$push: {usersDisliked: req.body.userId}, $inc: {dislikes: 1}})
    .then(() => res.status(200).json({ message: 'Like modifié !'}))
    .catch(error => res.status(400).json({ error }));
}

function undislikeSauce(req, res){
    Sauce.updateOne({_id: req.params.id}, {$pull: {usersDisliked: req.body.userId}, $inc: {dislikes: -1 }})
    .then(() => res.status(200).json({ message: 'Like modifié !'}))
    .catch(error => res.status(400).json({ error }));
}


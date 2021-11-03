// CONTROLER - logique métier
const Thing = require('../models/thing');
const fs = require('fs');                 // file system -> .unlink to remove file


exports.postThing = (req,res,next) => {
  /* console.log('***** POST ******')
  console.log('reqBody:', req.body, '\nreqBodyThing:', req.body.thing, '\nreqFile:', req.file); */
  const thingObj = JSON.parse(req.body.thing);
  delete thingObj._id;
  const thing = new Thing({
    ...thingObj,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  thing.save()
    .then(() => res.status(201).json({message: 'Object registered!'}))
    .catch(error => res.status(400).json({error}));
};

exports.getOne =(req,res,next) => {
  Thing.findOne({_id: req.params.id})
    .then(thing => {
      res.status(200).json(thing);
    })
    .catch(error => {
      console.log('Mon erreur: ', error);
      res.status(400).json({error})
    });
};

exports.putThing = (req,res,next) => {
  /* console.log('***** PUT *****');
  console.log('reqBody:', req.body, '\nreqBodyThing:', req.body.thing, '\nreqFile:', req.file); */
  const thingObj = req.file ?
  {...JSON.parse(req.body.thing),
  imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} // new image
  :
  {...req.body};                                                                // no new image

  if (req.file) {                                 // new image -> delete old one then update thing
    Thing.findOne({_id: req.params.id})
      .then(thing => {
        const filename = thing.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Thing.updateOne({_id: req.params.id}, {...thingObj, _id:req.params.id})
            .then(() => res.status(200).json({message: 'Object modified'}))
            .catch(error => res.status(400).json({error}));
        })
      })
      .catch(err => res.status(500).json({err}));
  } else {                                        // no new image -> update thing
    Thing.updateOne({_id: req.params.id}, {...thingObj, _id:req.params.id})
      .then(() => res.status(200).json({message: 'Object modified'}))
      .catch(error => res.status(400).json({error}));
  }
};

exports.getThings = (req, res, next) => {
  Thing.find()
    .then(things => {
      res.status(200).json(things)
    })
    .catch(error => {
      console.log('Mon erreur: ', error);
      res.status(400).json({error})
    });
};

exports.deleteOne = (req,res,next) => {
  /* console.log('***** DELETE *****');
  console.log('reqBody:', req.body, '\nreqBodyThing:', req.body.thing, '\nreqFile:', req.file); */
  Thing.findOne({_id: req.params.id})
    .then(thing => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Thing.deleteOne({_id: req.params.id})
          .then(() => res.status(200).json({message: 'Object deleted'}))
          .catch(error => res.status(400).json({error}));
      })
    })
    .catch(err => res.status(500).json({err}))
};
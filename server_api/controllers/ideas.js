var express = require('express');
var router = express.Router();
var models = require("../models");

/* GET ideas listing. */
router.get('/', function(req, res) {
  models.Idea.findAll({
    limit: 300,
    order: 'position DESC',
    where: "description IS NOT NULL AND sub_instance_id = 36 AND status != 'deleted'",
    include: [ models.Point, models.Category, models.IdeaRevision, models.Endorsement ]
  }).then(function(ideas) {
    res.send(ideas);
  });
});

router.get('/:id/endorsements', function(req, res) {
  console.log("ID Endorsements");
  models.Endorsement.findAll({
    where: {idea_id: req.params.id, status: 'active'},
    order: "created_at DESC",
    include: [
      { model: models.User,
        attributes: ["id", "login", "facebook_uid", "buddy_icon_file_name"]
      }
    ]
  }).then(function(endorsements) {
    res.send(endorsements);
  });
});

router.get('/:search/:term', function(req, res) {
  Idea.search(req.params.term)
      .then(function(ideas) {
        res.send(ideas);
      });
});

router.get('/:id', function(req, res) {
  console.log("ID");
  models.Idea.find({
    where: {id: req.params.id},
    include: [
      { model: models.Point,
        order: 'Point.position DESC',
        include: [
          { model: models.PointRevision ,
            include: [
              { model: models.User, attributes: ["id", "login", "facebook_uid", "buddy_icon_file_name"] }
            ]
          },
          { model: models.PointQuality ,
            include: [
              { model: models.User, attributes: ["id", "login", "facebook_uid", "buddy_icon_file_name"] }
            ]
          },
        ]
      },
      models.Category,
      models.Group,
      models.User,
      models.IdeaRevision
    ]
  }).then(function(idea) {
    res.send(idea);
  });
});

module.exports = router;

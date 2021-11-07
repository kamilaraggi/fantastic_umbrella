const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  }).then(tags => {
    res.json(tags);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {id: req.params.id},
    attributes: ['id', 'tag_name'],
    indclude: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  }).then(tags => {
      res.json(tags);
    })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.Create({
    tag_name: req.body.tag_name
  }).then(tags =>{
    res.json(tags);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.body.id
    }
  }).then(tags => {
    res.json(tags);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
    id: req.params.id
    }
  }).then(tags => {
    res.json(tags);
  });
});

module.exports = router;

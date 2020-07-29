const {Router} = require('express');
const Link = require('../models/Link');
const router = Router();
const config = require('config');
const shortid = require('shortid')

const auth = require('../middleware/auth.middleware');

router.post('/generate', auth, async(req, res) => {
  try {
    const baseUrl = config.get('baseUrl');
    const {from} = req.body;

    const existing = await Link.findOne({from});

    console.log('userId ', req.user.userId);

    if (existing) {
      console.log('existing!')
      return res.json({ link: existing});
    }

    const code = shortid.generate();

    const to = baseUrl + '/t/' + code;

    const link = new Link({
      code, from, to, owner: req.user.userId
    });

    console.log('New Link!: code', code, 'from', from, 'to', to, 'userId', req.user.userId);

    await link.save();

    res.status(201).json({link});
  } catch (e) {
    console.log('/generate error: ', e);
    res.status(500).json({message: e});
  };
})

router.get('/', auth, async(req, res) => {
  try {
    const links = await Link.find({owner: req.user.userId});
    res.json(links);
  } catch (e) {
    console.log('/ error: ', e);
    res.status(500).json({message: e});
  };
})

router.get('/:id', auth, async(req, res) => {
  try {
    const links = await Link.findById(req.params.id);
    res.json(links);
  } catch (e) {
    console.log('/ error: ', e);
    res.status(500).json({message: e});
  };
})

module.exports = router;
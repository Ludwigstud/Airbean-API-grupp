import menuDB from '../models/Menu.js';

export const getMenu = (req, res) => {
  menuDB.find({}).exec((err, docs) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch menu' });
    }
    res.json(docs);
  });
};

export const getMenuByCategory = (req, res) => {
  const category = req.params.category;

  menuDB.find({ category }).exec((err, docs) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch category' });
    }
    res.json(docs);
  });
};

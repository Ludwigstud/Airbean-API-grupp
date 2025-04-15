import userModel from '../models/User.js';
import menuDB from '../models/Menu.js';
export const validateUser = (req, res, next) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'id saknas' });
    }

    userModel.findUserById(userId, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Fel vid hämtning av id' });
        }

        if (!user) {
            return res.status(400).json({ error: 'id hittades inte' });
        }

        next();
    });
};

export const validateMenuItems = (req, res, next) => {
    const { items } = req.body;
  
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Ordern måste innehålla minst en produkt' });
    }
  
    let errors = [];
  
    const checks = items.map(item => {
      return new Promise((resolve) => {
        menuDB.findOne({ _id: item._id }, (err, menuItem) => {
          if (err || !menuItem) {
            errors.push(`Item med _id ${item._id} finns inte i menyn`);
            return resolve();
          }
  
       
          if (
            item.title !== menuItem.title ||
            item.price !== menuItem.price ||
            item.category !== menuItem.category
          ) {
            errors.push(`Item med _id ${item._id} matchar inte menyn korrekt`);
          }
          resolve();
        });
      });
    });
  
    Promise.all(checks).then(() => {
      if (errors.length > 0) {
        return res.status(400).json({ error: 'Felaktiga produkter i ordern', details: errors });
      }
      next();
    });
  };
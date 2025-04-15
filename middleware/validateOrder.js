import userModel from '../models/User.js';

export const validateUser = (req, res, next) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'id saknas' });
    };

    userModel.findUserById(id, (err, user) => {
    if (err) {
        return res.status(500).json({ error: 'Fel vid hämtning av id' });
    };

    if (!user) {
        return res.status(400).json({ error: 'id hittades inte' });
    };

    next();
    });
};
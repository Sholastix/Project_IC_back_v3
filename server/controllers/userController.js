const User = require('../models/User');

// GET profile of specific user (by user ID).
const userGet = async (req, res) => {
    try {
        const { _id } = req.user;
        // const user = await User.findById(_id);
        const user = await User.findOne({ _id: _id });
        if (!user) {
            throw new Error('Problem with authorization.');
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    }
};

// DELETE existed user's profile (by user ID).
const userDelete = async (req, res) => {
    try {
        const { _id } = req.user;
        // const user = await User.findByIdAndDelete(_id);
        const user = await User.deleteOne({ _id: _id });
        res.json(user);
    } catch {
        console.error(err);
        res.json({ message: err.message });
    }
};

module.exports = {
    userGet,
    userDelete,
};
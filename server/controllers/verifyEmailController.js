const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

// E-mail verification.
const verifyEmail = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;
        const user = await User.findOne({ email });

        const jwtLifespan = '1h';

        const jwtPayload = {
            sub: user._id,
            iat: Date.now(),
        };

        if (verificationCode !== user.verificationCode) {
            return res.status(400).json({ message: 'Incorrect verification code.' });
        } else {
            await user.updateOne({ active: true });
            const token = jwt.sign(jwtPayload, process.env.ACCESS_SECRET_KEY, { expiresIn: jwtLifespan, algorithm: 'HS256' });
            res.json({ message: 'Verification successfully done!', signedToken: 'Bearer ' + token, expiresIn: jwtLifespan });
        };
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    };
};

module.exports = { verifyEmail };
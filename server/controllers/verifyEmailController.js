const jwt = require('jsonwebtoken');
const User = require('../models/User');

// E-mail verification.
const verifyEmail = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;
        const user = await User.findOne({ email });

        const _id = user._id;

        // Set JWT lifespan. 
        const expiresIn = '1h';
    
        const jwtPayload = {
            sub: _id,
            iat: Date.now(),
        };

        if (verificationCode !== user.verificationCode) {
            return res.status(400).json({ message: 'Incorrect verification code.' });
        } else {
            await user.updateOne({ active: true });
            const token = jwt.sign(jwtPayload, process.env.ACCESS_SECRET_KEY, { expiresIn: expiresIn, algorithm: 'HS256' });
            res.json({ message: 'Verification successfully done!', token, expires: expiresIn });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = { verifyEmail };
// 'Passport-JWT' authentication.
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const User = require('../models/User');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_SECRET_KEY,
    algorithms: ['HS256'],
};

// VARIANT 1
module.exports = passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
    try {
        const user = await User.findOne({ _id: jwtPayload.sub });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        console.error(err);
    };
}));

/////////////////////////////////////////////////////////////////////////////////////

// // VARIANT 2
// const strategy = new JwtStrategy(options, async (jwtPayload, done) => {
//     try {
//         const user = User.findOne({ _id: jwtPayload.sub });
//         if (user) {
//             return done(null, user);
//         } else {
//             return done(null, false);
//         }
//     } catch (err) {
//         console.error(err);
//     };
// });

// module.exports = () => {
//     passport.use(strategy);
// };

/////////////////////////////////////////////////////////////////////////////////////


// // 'Custom JWT' authentication.
// const jwt = require('jsonwebtoken');

// module.exports.authMdw = async (req, res, next) => {
//     const authHeader = req.get('Authorization');
//     if (!authHeader) {
//         res.status(401).json({ message: 'Token not provided!' });
//         return;
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//         jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
//             req.user = { userID: user };
//             if (err) {
//                 console.error(err);
//             }
//         });
//     } catch (err) {
//         if (err instanceof jwt.JsonWebTokenError) {
//             console.error(err);
//             res.status(401).json({ message: 'Invalid Token!' });
//             return;
//         } else {
//             throw err;
//         }
//     };
//     next();
// };
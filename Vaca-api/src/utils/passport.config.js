import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import Service from '../services/users.service.js';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    passReqToCallback: true,
};

passport.use(
    new Strategy(options, async function (req, jwtPayload, done) {
        try {
            const user = await Service(req.dbClient).getByEmail(jwtPayload.email);

            if (user) {
                req.user = user;
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    }),
);

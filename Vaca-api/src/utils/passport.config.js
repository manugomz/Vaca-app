import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from '../repositories/users.repository.js';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    passReqToCallback: true,
};

passport.use(
    new Strategy(options, async function (jwt_payload, done, req) {
        try {
            const repository = Repository(req.dbClient);
            const user = await repository.getById(jwt_payload.id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (e) {
            return done(e);
        }
    }),
);

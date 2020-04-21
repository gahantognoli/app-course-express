const passport = require('passport'),
    jwt = require('jsonwebtoken'),
    passportJWT = require('passport-jwt'),
    mongoose = require('mongoose');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: 'caneta-azul'
};

module.exports = {
    get auth(){
        const user = mongoose.models.Usuario;
        const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
            user.findById(jwt_payload.id).exec()
                .then(user => {
                    if(user)
                        next(null, user);
                    else
                        next(null, false);
                });
        });
        passport.use(strategy);
        return {
            initialize()
            { 
                return passport.initialize() 
            },
            get authenticate(){
                return passport.authenticate('jwt', {session: false});
            }
        }
    },
    login(name, password, callback){
        const user = mongoose.models.Usuario;
        user.findOne({name, password}).exec()
            .then(user => {
                if(user){
                    const payload = {id: user._id};
                    const token = jwt.sign(payload, jwtOptions.secretOrKey);
                    callback({message: 'ok', token});
                }
                else {
                    callback(false);
                }
            });
    }
}
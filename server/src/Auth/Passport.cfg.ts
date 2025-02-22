import passport from "passport";
import {Strategy, ExtractJwt, StrategyOptions} from "passport-jwt"
import userModel from "../DB/models/user.model";
const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "21950524"
}

passport.use(new Strategy(options, async (payload, done)  => {
    try {
        const user = await userModel.findById(payload._id)
        if(user) done(null, user)
        else done(null, false)
    } catch (error) {
        done(null, error)
    }
}))

export default passport
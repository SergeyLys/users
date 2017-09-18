import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../config/config';

export const signup = async (req, res, next) => {
    const credentials = req.body;

    try {
        var user = await User.create(credentials);
    } catch ({message}) {
        return next({
            status: 400,
            message
        });
    }

    res.json(user);
};

export const signin = async (req, res, next) => {
    const {login, password} = req.body;
    const user = await User.findOne({login});

    if (!user) {
        return next({
            status: 401,
            message: 'User not found'
        });
    }

    try {
        const result = await user.comparePasswords(password);
        
        if (result === false) {
            return next({
                status: 400,
                message: 'Bad credentials'
            });
        }
    } catch ({message}) {
        return next({
            status: 400,
            message
        });
    }

    const token = jwt.sign({_id: user._id}, config.secret);

    res.json(token);
};
import User from '../models/User';
import fs from 'fs';
import {getUserByToken} from '../utils/getUserByToken';


export async function getCurrentUser(req, res, next) {
    const { token } = req;
    
    
    try {
        var user = await getUserByToken(token);
    } catch ({message}) {
        return next({
            status: 500,
            message
        });
    }
    
    return res.json(user);
}

export async function getAllUsers(req, res, next) {
    try {
        var users = await User.find({});
    } catch ({message}) {
        return next({
            status: 500,
            message
        });
    }
    
    res.json(users);
}

export async function banUser(req, res, next) {
    
    try {
        var user = await User.findOne({_id: req.body._id});
        user.banned = !user.banned;
        user.save();
    }  catch ({message}) {
        return next({
            status: 400,
            message
        });
    }
    
    res.json(user);
}

export async function changeUserInfo(req, res, next) {
    
    try {
        var user = await User.findOne({_id: req.token._id});
        user.age = req.body.age || user.age;
        user.name = req.body.name || user.name;
        user.photo = req.body.photo || user.photo;
        user.save();
    } catch ({message}) {
        return next({
            status: 400,
            message
        });
    }
    
    res.json(user);
}

export async function uploadImage(req, res, next) {
    
    try {
        var user = await User.findOne({_id: req.token._id});
        user.photo.data = fs.readFileSync(req.file.path);
        user.photo.contentType = 'image/png';
        user.save();
    } catch ({message}) {
        return next({
            status: 400,
            message
        });
    }
    
    res.send(user);
}
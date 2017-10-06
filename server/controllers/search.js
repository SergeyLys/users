import User from '../models/User';

export async function getUser(req, res, next) {
    const nickName = req.url.split('/').pop();
    let user;

    try {
        user = await User.findOne({nickName: nickName});

        if (!user) {
            return next({
                status: 404,
                message: 'User not found'
            });
        }
    } catch ({message}) {
        return next({
            status: 404,
            message
        });
    }

    const resUser = {
        nickName: user.nickName,
        age: user.age ? user.age : '',
        name: user.name ? user.name : '',
        surname: user.surname ? user.surname : '',
        country: user.country ? user.country : '',
        city: user.city ? user.city : ''
    };

    res.json(resUser);
}
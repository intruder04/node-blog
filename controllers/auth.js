import User from '../models/user';

export const signup = async (req, res, next) => {
    const credentials = req.body;
    let user;
    console.log(credentials);
    try {
        user = await User.create(credentials);
        console.log(user);
    } catch ({ message }) {
        return next({
            status: 400,
            message
        });
    }

    res.json(user);

}

export const signin = async (req, res, next) => {
    const { login, password } = req.body;
    console.log('hi');
    const user = await User.findOne({ login });
    console.log(user);

    if (!user) {
        return next({
            status: 400,
            message: 'User not found'
        });
    }

    try {
        const result = await user.comparePasswords(password);
    } catch (error) {
        return next({
            status: 400,
            message: 'Bad Credentials'
        });
    }
    req.session.userId = user._id;

    res.json(user);
}


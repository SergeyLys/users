import Task from '../models/Task';

export async function create(req, res, next) {
    const taskData = req.body;
    const userId = req.user._id;
    taskData.userId = userId;

    console.log(req.body.url.slice('/').pop());

    // if (req.body.url.slice('/').pop())

    try {
        var task = await Task.create(taskData);
    } catch ({message}) {
        return next({
            status: 400,
            message
        });
    }

    res.json(task);
}

export async function getAll(req, res, next) {
    const { token } = req;
    let tasks;

    try {
        tasks = await Task.find({userId: token._id});
    } catch ({message}) {
        return next({
            status: 400,
            message
        });
    }

    res.json(tasks);
}
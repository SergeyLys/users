import Task from '../models/Task';

export async function create(req, res, next) {
    const taskData = req.body;
    const userId = req.user._id;
    taskData.userId = userId;

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
    const userId = req.user._id;

    try {
        var tasks = await Task.find({userId: userId});
    } catch ({message}) {
        return next({
            status: 400,
            message
        });
    }

    res.json(tasks);
}
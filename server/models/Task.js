import mongoose, {Schema} from 'mongoose';

const TaskSchema = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    createdAt: {type: Date, require: true, default: Date.now()},
    complete: {type: Boolean, require: true, default: false},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

export default mongoose.model('Task', TaskSchema);
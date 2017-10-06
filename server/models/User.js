import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
    login: {type: String, required: true, unique: true, lowercase: true, index: true},
    nickName: {type: String, required: true, unique: true, index: true},
    password: {type: String, required: true},
    name: String,
    surname: String,
    age: Number,
    country: String,
    city: String,
    photo: {data: Buffer, contentType: String},
    banned: {type: Boolean, default: false}
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const hashPassword = await bcrypt.hash(this.password, 10);

    this.password = hashPassword;

    next();
});

UserSchema.methods.comparePasswords = function (password) {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model('User', UserSchema);
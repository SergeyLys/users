import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import bluebird from 'bluebird';
import multer from 'multer';
import errorHandler from './utils/errorHandler';
import checkToken from './utils/checkToken';
import getUser from './utils/getUser';
import config from './config/config';

import authRouter from './routes/auth';
import userRouter from './routes/user';
import imagesRouter from './routes/images';

const storage = multer.diskStorage({
    
})
const upload = multer( {dest: path.join(__dirname, '../uploads')} )
const app = express();

mongoose.Promise = bluebird;
mongoose.connect(config.database, {useMongoClient: true}, err => {
    if (err) throw err;
    console.log('Mongo connected');
});

app.listen(config.port, err => {
    if (err) throw err;
    console.log(`Server is up and running on port ${config.port}`);
});

app.use(cors({origin: '*'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', authRouter);
app.use('/api', checkToken, getUser, userRouter);
app.use('/api', checkToken, getUser, upload.single('file'), imagesRouter);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.use(errorHandler);
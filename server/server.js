import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import bluebird from 'bluebird';

import errorHandler from './utils/errorHandler';
import config from './config/config';

import authRouter from './routes/auth';

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

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.use(errorHandler);
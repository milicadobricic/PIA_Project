import {getModelForClass} from '@typegoose/typegoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import {User} from './model/user';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/pia_project').then(() => console.log('mongoose connected'));

const router = express.Router();

router.route('/login').post(async (req, res) => {
    const username: string = req.body.username;
    const password: string = req.body.password;

    const userModel = getModelForClass(User);

    const user = await userModel.findOne({username, password});

    if (user) {
        user.password = undefined;
    }

    res.json({
        success: user !== null,
        message: user === null ? 'Invalid username or password' : null,
        user,
    });
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));

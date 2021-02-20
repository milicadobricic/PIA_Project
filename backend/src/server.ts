import {getModelForClass} from '@typegoose/typegoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import {Guid} from 'guid-typescript';
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

    let user = await userModel.findOne({username, password});

    if (user) {
        user.password = undefined;

        if (user.userType === 'student' && !user.studentInfo.approved) {
            user = null;
        }
    }

    res.json({
        success: user !== null,
        message: user === null ? 'Invalid username or password!' : null,
        user,
    });
});

router.route('/register').post(async (req, res) => {
    const firstName: string = req.body.firstName;
    const lastName: string = req.body.lastName;
    const studyLevel: string = req.body.studyLevel;

    const user: User = {
        id: Guid.create().toString(),
        username: '_',
        password: '_',
        firstName,
        lastName,
        status: 'active',
        userType: 'student',
        isValidPassword: false,
        studentInfo: {
            idNumber: '_',
            level: studyLevel,
            approved: false,
        },
    };

    const userModel = getModelForClass(User);

    try {
        await userModel.create(user);

        res.json({
            success: true,
            message: null,
        });
    } catch (e) {
        res.json({
            success: false,
            message: e.message,
        });
    }
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));

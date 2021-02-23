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

async function generateIdNumber(level: string) {
    const userModel = getModelForClass(User);
    const highest: User[] = await userModel
        .find({userType: 'student'})
        .find({'studentInfo.level': level})
        .sort({'studentInfo.idNumber': -1})
        .limit(1);

    let highestIdNumber: string = '0000/0000';
    if (highest.length > 0) {
        highestIdNumber = highest[0].studentInfo.idNumber;
    }

    const parts = highestIdNumber.split('/');
    const highestYear = parts[0];
    const highestNumber = parts[1];

    const year: string = new Date().getUTCFullYear().toString();
    let num: string;

    if (year === highestYear) {
        const currentNumber = parseInt(highestNumber, 10) + 1;
        num = ('0000' + currentNumber).slice(-4);
    } else {
        num = '0001';
    }

    return year + '/' + num;
}

async function generateStudentInfo(student: User) {
    student.password = Guid.create().toString();
    student.studentInfo.idNumber = await generateIdNumber(student.studentInfo.level);
    student.username =
        student.lastName[0].toLocaleLowerCase() +
        student.firstName[0].toLocaleLowerCase() +
        student.studentInfo.idNumber.split('/')[0].slice(-2) +
        student.studentInfo.idNumber.split('/')[1] +
        student.studentInfo.level;
}

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
            idNumber: '0000/0000',
            level: studyLevel,
            approved: false,
        },
    };

    const userModel = getModelForClass(User);

    try {
        await userModel.create(user);

        res.json({
            success: true,
            message: 'Applied successfully!',
        });
    } catch (e) {
        res.json({
            success: false,
            message: e.message,
        });
    }
});

router.route('/employees').get(async (req, res) => {
    const userModel = getModelForClass(User);
    const employees = await userModel.find({userType: 'employee'});
    res.json(employees);
});

router.route('/users').get(async (req, res) => {
    const username = req.query.username;
    const id = req.query.id;
    const userModel = getModelForClass(User);
    let user: User = null;
    if (username) {
        user = await userModel.findOne({username});
    } else if (id) {
        user = await userModel.findOne({id});
    }

    if (user) {
        user.password = undefined;
    }

    res.json(user);
});

router.route('/update-user').post(async (req, res) => {
    const username = req.body.username;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    const officeNumber = req.body.officeNumber;
    const biography = req.body.biography;

    const userModel = getModelForClass(User);
    const user = await userModel.findOne({username});

    user.employeeInfo.address = address;
    user.employeeInfo.phoneNumber = phoneNumber;
    user.employeeInfo.officeNumber = officeNumber;
    user.employeeInfo.biography = biography;

    const result = await userModel.updateOne({username}, {employeeInfo: user.employeeInfo});

    const updated = await userModel.findOne({username});
    if (result.ok) {
        res.json({
            success: true,
            message: 'Profile updated!',
            user: updated,
        });
    } else {
        res.json({
            success: false,
            message: 'An error occurred!',
            user: null,
        });
    }
});

router.route('/delete-student').post(async (req, res) => {
    const student: User = req.body.student;
    const id = student.id;

    const userModel = getModelForClass(User);

    const result = await userModel.deleteOne({id});
    if (result.ok) {
        res.json(true);
    } else {
        res.json(false);
    }
});

router.route('/approve-student').post(async (req, res) => {
    const student: User = req.body.student;
    const id = student.id;

    const userModel = getModelForClass(User);
    const user = await userModel.findOne({id});

    if (user) {
        await generateStudentInfo(user);
        user.studentInfo.approved = true;

        try {
            await userModel.updateOne({id: user.id}, user);
            res.json({
                success: true,
                message: `Approved student with username '${user.username}' and password '${user.password}'!`,
            });
        } catch (e) {
            res.json({
                success: false,
                message: 'Error while approving user!',
            });
        }
    }
});

router.route('/add-update-student').post(async (req, res) => {
    const student: User = req.body.student;
    const id = student.id;

    const userModel = getModelForClass(User);
    const user = await userModel.findOne({id});
    if (user === null) {
        await generateStudentInfo(student);

        try {
            await userModel.create(student);
            res.json({
                success: true,
                message: `Created student with username '${student.username}' and password '${student.password}'!`,
            });
        } catch (e) {
            res.json({
                success: false,
                message: 'Error while creating user!',
            });
        }
    } else {
        user.firstName = student.firstName;
        user.lastName = student.lastName;
        user.status = student.status;
        user.studentInfo.level = student.studentInfo.level;

        const parts = user.studentInfo.idNumber.split('/');
        const year = parts[0];
        const num = parts[1];

        user.username =
            user.lastName[0].toLocaleLowerCase() +
            user.firstName[0].toLocaleLowerCase() +
            year.slice(-2) +
            num +
            student.studentInfo.level;

        const result = await userModel.updateOne({id: user.id}, user);
        if (result.ok) {
            res.json({
                success: true,
                message: 'User updated!',
            });
        } else {
            res.json({
                success: false,
                message: 'An error occurred!',
            });
        }
    }
});

router.route('/students').get(async (req, res) => {
    const userModel = getModelForClass(User);
    const students = await userModel.find({userType: 'student'});
    res.json(students);
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));

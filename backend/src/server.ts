import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/pia_project').then(() => console.log('mongoose connected'));

const router = express.Router();

router.route('/login').post((req, res) => {
    const username: string = req.body.username;
    const password: string = req.body.password;

    if (username === 'user' && password === 'pass') {
        res.json('logged in');
    } else {
        res.json('not logged in');
    }
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));

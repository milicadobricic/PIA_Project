import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/pia_project').then(() => console.log('mongoose connected'));

const router = express.Router();

router.route('/login').get((req, res) => {
    res.json('Hello, World!');
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));

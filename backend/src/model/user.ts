import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
    id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        default: null,
    },
    lastName: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        default: null,
    },
    userType: {
        type: String,
        required: true,
    },
    isValidPassword: {
        type: Boolean,
        required: true,
    },
    employeeSpecific: {
        type : {
            address: String,
            phoneNumber: {
                type: String,
                default: null,
            },
            webSite: {
                type: String,
                default: null,
            },
            biography: {
                type: String,
                default: null,
            },
            title: String,
            office: String,
            profilePicture: {
                type: Buffer,
                default: null,
            },
        },
        default: null,
    },
    studentSpecific: {
        type : {
            idNumber: String,
            level: String,
        },
        default: null,
    },
});

export default mongoose.model('User', User, 'users');

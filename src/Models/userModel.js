import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    mobileNumber: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 0 // Ensure age is a non-negative number
    },
    country: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true // Automatically create createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

export default User;

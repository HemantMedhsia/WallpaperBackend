import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

adminSchema.pre('save', async function(next) {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(this.password, salt);
        // Replace the plain password with the hashed password
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

adminSchema.methods.isValidPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
}


const Admin = mongoose.model('Admin', adminSchema);

export default Admin;

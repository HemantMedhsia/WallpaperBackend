import mongoose from 'mongoose';

const deviceIdentificationSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
        unique: true
    },
    // Add more fields as per your requirements
});

export const DeviceIdentification = mongoose.model('DeviceIdentification', deviceIdentificationSchema);
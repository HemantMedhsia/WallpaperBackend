import { DeviceIdentification } from "../Models/deviceIdentificationModel.js";
import wrapAsync from "../Utils/wrapAsync.js";

export const setMobileId = wrapAsync(async (req, res) => {
    const {deviceId}  = req.body;
    if (!deviceId) {
        return res.status(400).json({ message: "Mobile ID is required" });
    }
    const result = await new DeviceIdentification(req.body).save().then(()=> {
        return res.status(200).json({ message: "Mobile ID stored successfully" });
    }).catch((err) => {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    });
   
});

export const getMobileId = wrapAsync(async (req, res) => {
    const mobileId = await DeviceIdentification.findById(req.params.id);
    if (!mobileId) {
        return res.status(404).json({ message: "Mobile ID not found" });
    }
    return res.status(200).json(mobileId);
});

export const getAllMobileIds = wrapAsync(async (req, res) => {
    const mobileIds = await DeviceIdentification.find();
    return res.status(200).json(mobileIds);
});

export const deleteMobileId = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const mobileId = await DeviceIdentification.findByIdAndDelete(id);
    if (!mobileId) {
        return res.status(404).json({ message: "Mobile ID not found" });
    }
    return res.status(200).json({ message: "Mobile ID deleted successfully" });
});
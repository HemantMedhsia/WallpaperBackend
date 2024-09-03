import { DeviceIdentification } from "../Models/deviceIdentificationModel.js";
import { errorHandler } from "../Utils/errorHandler.js";
import { ApiResponse } from "../Utils/responseHandler.js";
import wrapAsync from "../Utils/wrapAsync.js";

export const setMobileId = wrapAsync(async (req, res) => {
    const { deviceId } = req.body;
    if (!deviceId) {
        throw new errorHandler(400, "Mobile ID is required");
    }
    const result = await new DeviceIdentification(req.body)
        .save()
        .then(() => {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        result,
                        "Mobile ID stored successfully"
                    )
                );
        })
        .catch((err) => {
            console.log(err.message);
            throw new errorHandler(500, err.message);
        });
});

export const getMobileId = wrapAsync(async (req, res) => {
    const mobileId = await DeviceIdentification.findById(req.params.id);
    if (!mobileId) {
        throw new errorHandler(404, "Mobile ID not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, mobileId, "Mobile ID fetched successfully"));
});

export const getAllMobileIds = wrapAsync(async (req, res) => {
    const mobileIds = await DeviceIdentification.find();
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                mobileIds,
                "All Mobile IDs fetched successfully"
            )
        );
});

export const deleteMobileId = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const mobileId = await DeviceIdentification.findByIdAndDelete(id);
    if (!mobileId) {
        throw new errorHandler(404, "Mobile ID not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, mobileId, "Mobile ID deleted successfully"));
});

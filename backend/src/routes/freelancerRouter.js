import { Router } from "express";
import { apiResponse } from "../utils/apiResponse.js";
import { activeFreelancers, getFreelancerProfile, inactiveFreelancers, loginFreelancer, logoutFreelancer, registerFreelancer, toggleFreelancerStatus } from "../controllers/freelancer.controller.js";
import {upload} from "../utils/multer.js"

const freelancerRouter = Router()

freelancerRouter.get("/", async (req, res) => {
    const hostName = req.hostname
    res.status(200).json(new apiResponse(200, {
        hostName,
    }, `${req.baseUrl} WORKING COOL.`))
})


freelancerRouter.post("/register", upload.fields([
    {
        name: "proofOfRegistrationFee",
        maxCount: 1
    },
    {
        name: "avatar",
        maxCount: 1
    }
]), registerFreelancer)
freelancerRouter.post("/login", loginFreelancer)
freelancerRouter.post("/logout", logoutFreelancer)
freelancerRouter.post("/profile", getFreelancerProfile)
freelancerRouter.get("/inactive", inactiveFreelancers)
freelancerRouter.get("/active", activeFreelancers)
freelancerRouter.patch("/:id/toggle-status", toggleFreelancerStatus)



export default freelancerRouter
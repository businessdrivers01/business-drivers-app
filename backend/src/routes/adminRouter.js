import { Router } from "express";
import { apiResponse } from "../utils/apiResponse.js";
import { getAdminProfile, loginAdmin, logoutAdmin, registerAdmin } from "../controllers/admin.controller.js";

const adminRouter = Router()

adminRouter.get("/", async (req, res) => {
    const hostName = req.hostname
    res.status(200).json(new apiResponse(200, {
        hostName,
    }, `${req.baseUrl} WORKING COOL.`))
})



adminRouter.post("/register", registerAdmin)
adminRouter.post("/login", loginAdmin)
adminRouter.post("/logout", logoutAdmin)
adminRouter.post("/profile", getAdminProfile)
// adminRouter.post("/manage-users", getAdminProfile)



export default adminRouter
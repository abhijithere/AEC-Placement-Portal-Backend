import  express  from "express";

import { login,register,getallusers,getuserdetails ,logout,updateuser,deleteUser} from "../controllers/user.js";

import { isAuthenticated } from "../middleware/auth.js";

const router =express.Router();


router.post("/new",register)
router.get("/alluser",getallusers) 

router.post("/login",login)

router.get("/logout",logout)


router.get("/me",isAuthenticated,getuserdetails)

router.put("/update",isAuthenticated,updateuser)
router.route("/:id").delete(isAuthenticated,deleteUser);



export default router
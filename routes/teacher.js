import  express  from "express";

import { login,register,getallusers,getallstudent,getuserdetails ,logout,updateuser,deleteUser, getSingleUser, updateUserRole, deleteUserProfile, getSinglestudent,updatestudent,deletestudent} from "../controllers/teacher.js";

import { authorizeRoles, isAuthenticatedteacher } from "../middleware/auth.js";

const router =express.Router();


router.post("/new",register)
router.get("/alluser",isAuthenticatedteacher,authorizeRoles("Admin"),getallusers)
router.get("/allstudent",isAuthenticatedteacher,getallstudent)

router.post("/login",login)

router.get("/logout",logout)


router.get("/me",isAuthenticatedteacher,getuserdetails)

router.put("/update",isAuthenticatedteacher,updateuser)
router.route("/:id").delete(isAuthenticatedteacher,deleteUser);
router.route("/admin/teachers/:id").get(isAuthenticatedteacher,authorizeRoles("Admin"),getSingleUser).put(isAuthenticatedteacher,authorizeRoles("Admin"),updateUserRole).delete(isAuthenticatedteacher,authorizeRoles("Admin"),deleteUserProfile)
router.route("/admin/student/:id").get(isAuthenticatedteacher,authorizeRoles("Admin"),getSinglestudent).put(isAuthenticatedteacher,authorizeRoles("Admin"),updatestudent).delete(isAuthenticatedteacher,authorizeRoles("Admin"),deletestudent)



export default router
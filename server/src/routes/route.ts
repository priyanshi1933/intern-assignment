import express from "express";

import { registerUser,loginUser,getUsers } from "../controllers/user.controller";
import { verifyToken } from "../middleware/auth";
import { create, delBookmark, read, readById } from "../controllers/bookmark.controller";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", getUsers);

// router.post("/addBookmark",create);
router.post("/addBookmark",verifyToken,create);
router.get("/getBookmarkById/:id",readById);
router.get("/getBookmark",read);
router.delete("/delBookmark/:id",delBookmark);

export default router;

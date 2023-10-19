const { Signup, Login, getStudents, search, Edit, Delete } = require("../Controllers/AuthController");
const router = require("express").Router();
const { userVerification } = require("../Middlewares/AuthMiddleware")

router.post('/', userVerification)
router.post("/signup", Signup);
router.post('/login', Login);
router.get("/all", getStudents);
router.post("/search", search);
router.patch("/edit", Edit);
router.delete("/delete", Delete);

module.exports = router;


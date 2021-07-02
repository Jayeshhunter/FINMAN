const { Router } = require("express");
const optController = require("../controllers/optController.js");
const { checkUser } = require("../middleware/authMiddleware.js");
const router = Router();

router.get("/options/:id", checkUser, optController.option_get);

module.exports = router;

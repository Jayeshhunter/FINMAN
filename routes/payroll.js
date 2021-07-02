const { Router } = require("express");
const payrController = require("../controllers/payrController");
const { checkUser } = require("../middleware/authMiddleware.js");
const router = Router();

router.get("/payroll/:username", checkUser, payrController.payroll_get);
router.post("/payroll/:username/:name/:status", payrController.payroll_post);

router.get("/createPay/:username", checkUser, payrController.createPay_get);
router.post("/createPay/:username", payrController.createPay_post);

module.exports = router;

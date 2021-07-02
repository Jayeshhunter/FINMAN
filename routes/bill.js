const { Router } = require("express");
const bilController = require("../controllers/billController");
const { checkUser } = require("../middleware/authMiddleware.js");

const router = Router();

router.get("/bill/:username", checkUser, bilController.bill_get);
router.post("/bill/:username/:name/:status", bilController.bill_post);

router.get("/createBill/:username", checkUser, bilController.createBill_get);
router.post("/createBill/:username", bilController.createBill_post);

module.exports = router;

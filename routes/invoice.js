const { Router } = require("express");
const invoController = require("../controllers/invoController");
const { checkUser } = require("../middleware/authMiddleware.js");
const router = Router();

router.get("/invoice/:username", checkUser, invoController.invoice_get);
router.post("/invoice/:username/:name/:status", invoController.invoice_post);

router.get("/createInv/:username", checkUser, invoController.createInv_get);
router.post("/createInv/:username", invoController.createInv_post);

module.exports = router;

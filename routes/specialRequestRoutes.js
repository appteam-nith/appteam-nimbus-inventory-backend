const express = require("express");
const router = express.Router();
const specialRequestController = require("../controllers/specialRequestController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

router.post(
  "/",
  authenticate,
  authorize("club"),
  specialRequestController.createSpecialRequest
);

router.get(
  "/my-requests",
  authenticate,
  authorize("club"),
  specialRequestController.getMySpecialRequests
);
router.get(
  "/requests",
  authenticate,
  authorize("core"),
  specialRequestController.getAllSpecialRequests
);
router.get(
  "/requests/:id",
  authenticate,
  authorize("club"),
  specialRequestController.getSpecialRequestsByClub
);
router.put(
  "/requests/:id",
  authenticate,
  authorize("club"),
  specialRequestController.updateSpecialRequestStatus
);
router.delete(
  "/requests/:id",
  authenticate,
  authorize("club"),
  specialRequestController.cancelSpecialRequest
);

module.exports = router;

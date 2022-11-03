const router = require("express").Router();
const {
  updateAuth,
  deleteAuth,
  addBatch,
  BatchlistController,
  individualBatchListController,
} = require("../../controllers/admin/adminController");
const { verifyTokenAndAdmin } = require("../../helpers/Protected");
const multer = require("multer");
const storage = require("../../helpers/multer");

let upload = multer({ storage });

// URL /api/admin

// GET REQUEST

// POST REQUEST
// adding batch and students
router.post("/addbatch", verifyTokenAndAdmin, upload.any("file"), addBatch);

// PUT Request
// update hr,trainer,councellor,feetracker
router.put("/:id", verifyTokenAndAdmin, updateAuth);

// DELETE REQUEST
router.delete("/:id", verifyTokenAndAdmin, deleteAuth);

// get BatchList
router.get("/batchList", verifyTokenAndAdmin, BatchlistController);

// get individual batch list
router.get(
  "/batchList/:batchCode",
  verifyTokenAndAdmin,
  individualBatchListController
);

// search trainers batches others

module.exports = router;

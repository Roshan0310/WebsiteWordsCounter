const express = require("express");
const { getWordCount, getAllInsights, updateFavourite, deleteInsights } = require("../controllers/insightsController");
const router = express.Router();


router.route("/create").post(getWordCount);

router.route("/insights").get(getAllInsights);

router.route("/insight/:id").put(updateFavourite).delete(deleteInsights);

module.exports = router;
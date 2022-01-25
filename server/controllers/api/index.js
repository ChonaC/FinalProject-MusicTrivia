const router = require("express").Router();
const userRoutes = require("./user-routes");
const songRoutes = require("./song-routes");
const scoreRoutes = require("./score-routes");

router.use("/songs", songRoutes);
router.use("/users", userRoutes);
router.use("/scores", scoreRoutes);

module.exports = router;

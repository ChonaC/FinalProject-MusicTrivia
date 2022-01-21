const router = require("express").Router();
const { Score } = require("../../models");

router.get("/", async (req, res) => {
    try {
        const scoreData = await Score.findAll();
        res.status(200).json(scoreData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const scoreData = await Score.findByPk(req.params.id);
        if (!scoreData) {
            res.status(404).json({ message: "No score found with this id!" });
            return;
        }
        res.status(200).json(scoreData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const newScore = await Score.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newScore);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const scoreData = await Score.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!scoreData[0]) {
            res.status(404).json({ message: "No score found with this id!" });
            return;
        }
        res.status(200).json(scoreData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const scoreData = await Score.destroy({
            where: {
                id: req.params.id,
                // * Only the user can delete their own score
                user_id: req.session.user_id,
            },
        });
        if (!scoreData) {
            res.status(404).json({ message: "No score found with this id!" });
            return;
        }
        res.status(200).json(scoreData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

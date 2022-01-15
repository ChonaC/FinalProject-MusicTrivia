const router = require("express").Router();
const { Song } = require("../../models");

// The `/api/categories` endpoint

//miniproject and activity 23
router.get("/", async (req, res) => {
    // find all categories
    try {
        const songData = await Song.findAll({});
        res.status(200).json(songData);
    } catch (err) {
        res.status(500).json(err);
    }
    // be sure to include its associated Products
});

//miniproject and activity 23
router.get("/:id", async (req, res) => {
    // find one category by its `id` value
    try {
        const songData = await Song.findByPk(req.params.id, {});
        if (!songData) {
            res.status(404).json({ message: "No Song found with this id!" });
            return;
        }
        res.status(200).json(songData);
    } catch (err) {
        res.status(500).json(err);
    }
    // be sure to include its associated Products
});

//activity 5
router.post("/", async (req, res) => {
    // create a new category
    try {
        const newSong = await Song.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newSong);
    } catch (err) {
        res.status(400).json(err);
    }
});

//activity 7
router.delete("/:id", async (req, res) => {
    // delete a category by its `id` value
    Song.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((deletedSong) => {
            res.json(deletedSong);
        })
        .catch((err) => res.json(err));
});

module.exports = router;

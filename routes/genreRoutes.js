const express = require("express");
const authController = require("./../controllers/authController");
const genreController = require("./../controllers/genreController");

const router = express.Router();

router.route("/").get(genreController.getAllGenres);
router.route("/:id").get(genreController.getGenre);

router.use(authController.protect);
router.use(authController.restrictTo("admin"));

router.route("/").post(genreController.createGenre);

router
  .route("/:id")
  .patch(genreController.updateGenre)
  .delete(genreController.deleteGenre);

module.exports = router;

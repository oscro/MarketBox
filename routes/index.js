const router = require("express").Router();
const controller = require("../controllers/controllers");

// Matches with "/api/books"
router.route("/api/")
  .get(controller.findAll)
  .post(controller.create);

// Matches with "/api/books/:id"
router
  .route("/api/")
  .get(controller.findById)
  .put(controller.update)
  .delete(controller.remove);

module.exports = router;

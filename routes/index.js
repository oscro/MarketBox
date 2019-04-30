const router = require("express").Router();
const controller = require("../controllers/controllers");

router.route("/user")
  .get(controller.findOne)
  .post(controller.create);

// Matches with "/api/books/:id"
router
  .route("/books/:id")
  // .get(controller.findById)
  .put(controller.update)
  .delete(controller.remove);

module.exports = router;

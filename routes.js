let express = require("express");

let router = express.Router();

let controller = require("./controller");

// get all items
router.get("/customers", controller.listPeople);

// get item by id
router.get("/customers/:id", controller.listPerson);

//delete an item by id
router.delete("/customers/:id", controller.deletePerson);

//add an item
router.post("/customers", controller.updatePerson);

//update an item
router.put("/customers/:id", controller.deletePerson);

module.exports = router;

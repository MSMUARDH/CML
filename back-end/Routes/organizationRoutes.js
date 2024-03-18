var express = require("express");
const {
  addOrganization,
  updateOrganization,
  deleteOrganization,
  getAllOrganization,
} = require("../Controllers/OrganizationController");
var router = express.Router();

router.post("/add-organization", addOrganization);
router.put("/update-organization/:id", updateOrganization);
router.delete("/delete-organization/:id", deleteOrganization);
router.get("/get-all-organization", getAllOrganization);

module.exports = router;

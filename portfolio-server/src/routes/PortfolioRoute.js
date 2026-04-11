const router = require("express").Router();
const {
  getPortfolioData,
  updateIntro,
  updateAbout,
  updateExperience,
  addExperience,
  updateProject,
  deleteProject,
  addProject,
  updateContact,
  deleteExperience,
} = require("../controllers/PortfolioController");
const upload = require("../middlewares/upload");

// routes only 👇
router.get("/get-portfolio-data", getPortfolioData);

router.post("/update-intro", updateIntro);
router.post("/update-about", upload.single("file"), updateAbout);

router.post("/add-experience", addExperience);
router.put("/update-experience/:id", updateExperience);
router.delete("/delete-experience/:id", deleteExperience);

router.post("/add-project", addProject);
router.post("/update-project", updateProject);
router.delete("/delete-project", deleteProject);

router.post("/update-contact", updateContact);
module.exports = router;

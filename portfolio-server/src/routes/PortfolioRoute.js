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
} = require("../controllers/PortfolioController");
const upload = require("../middlewares/upload");

// routes only 👇
router.get("/get-portfolio-data", getPortfolioData);
router.post("/update-intro", updateIntro);
router.post("/update-about", upload.single("file"), updateAbout);
router.post("/update-experience", updateExperience);
router.post("/add-experience", addExperience);
router.post("/add-project", addProject);
router.post("/update-project", updateProject);
router.delete("/delete-project", deleteProject);
router.post("/update-contact", updateContact);

module.exports = router;

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
  adminloginUser,
} = require("../controllers/PortfolioController");
const upload = require("../middlewares/upload");
const auth = require("../middlewares/auth");

// routes only 👇
router.get("/get-portfolio-data", getPortfolioData);

router.post("/update-intro", auth, updateIntro);
router.post("/update-about", auth, upload.single("file"), updateAbout);

router.post("/add-experience", auth, addExperience);
router.put("/update-experience/:id", auth, updateExperience);
router.delete("/delete-experience/:id", auth, deleteExperience);

router.post("/add-project", auth, addProject);
router.post("/update-project", auth, updateProject);
router.delete("/delete-project/:id", auth, deleteProject);

router.post("/update-contact", auth, updateContact);

router.post("/login", adminloginUser);
module.exports = router;

const {
  Intro,
  About,
  Experience,
  Project,
  Contact,
} = require("../models/PortfolioModel");

// ✅ GET ALL DATA
exports.getPortfolioData = async (req, res) => {
  try {
    const intros = await Intro.find();
    const abouts = await About.find();
    const experiences = await Experience.find().sort({ createdAt: -1 });
    const projects = await Project.find().sort({ createdAt: -1 });
    const contacts = await Contact.find();

    res.status(200).send({
      intro: intros[0],
      about: abouts[0],
      experience: experiences,
      project: projects,
      contact: contacts[0],
      success: true,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// ✅ UPDATE INTRO
exports.updateIntro = async (req, res) => {
  try {
    const intro = await Intro.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true },
    );

    res.status(200).send({
      data: intro,
      success: true,
      message: "Intro Updated Successfully..!",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
// ✅ UPDATE About
exports.updateAbout = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // ✅ if file uploaded → store path
    if (req.file) {
      updateData.lottieURL = `/uploads/${req.file.filename}`;
    }

    const about = await About.findOneAndUpdate(
      { _id: req.body._id },
      updateData,
      { new: true },
    );

    res.status(200).send({
      data: about,
      success: true,
      message: "About Updated Successfully..!",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// ✅ UPDATE experience
exports.updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true },
    );

    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience Updated Successfully..!",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.addExperience = async (req, res) => {
  try {
    const newExperience = new Experience(req.body);
    await newExperience.save();

    res.status(200).send({
      success: true,
      message: "Experience Added Successfully!",
      data: newExperience,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.addProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();

    res.status(200).send({
      success: true,
      message: "Project Added Successfully!",
      data: newProject,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true },
    );

    res.status(200).send({
      success: true,
      message: "Project Updated Successfully!",
      data: project,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.body._id);

    res.status(200).send({
      success: true,
      message: "Project Deleted Successfully!",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true },
    );

    res.status(200).send({
      success: true,
      message: "Contact Updated Successfully!",
      data: contact,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

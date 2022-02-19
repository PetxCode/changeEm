const express = require("express");
const Model = require("./model");
const router = express.Router();

router.get("/", async (req, res) => {
  const userName = await Model.find();
  res.status(200).json({ message: "success", data: userName });
});

router.post("/", async (req, res) => {
  const userName = await Model.create(req.body);
  res.status(200).json({ message: "created", data: userName });
});

router.get("/:id", async (req, res) => {
  const userName = await Model.findById(req.params.id);
  res.status(200).json({ message: "success", data: userName });
});

router.patch("/:id", async (req, res) => {
  const userName = await Model.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    course: req.body.course
  });
  res.status(200).json({ message: "updated", data: userName });
});

router.delete("/:id", async (req, res) => {
  await Model.findByIdAndRemove(req.params.id, {
    name: req.body.name,
    course: req.body.course
  });
  res.status(200).json({ message: "deleted" });
});

module.exports = router;

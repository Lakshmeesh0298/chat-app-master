const { hashingPassword } = require("../../helpers/Password");
const AuthModel = require("../../Models/Auth/AuthModel");
const csv = require("csvtojson");
const BatchModel = require("../../Models/batch/BatchModel");
const StudentModel = require("../../Models/Auth/StudentModel");

// POST REQUEST ADD BATCH
const addBatch = async (req, res) => {
  try {
    // conversion of csv to json
    const addstudents = await csv().fromFile(req.files[0].path);

    // find the existing batch
    const findBatch = await BatchModel.findOne({
      batchCode: req.body.batchCode,
    });
    if (findBatch) {
      return res.status(400).json({ messgae: "BatchCode already registered" });
    }

    // creation of new batch
    let newBatch = await BatchModel.create({
      ...req.body,
      addStudents: [...addstudents],
    });

    // adding batchcode to trainers and trackers
    await AuthModel.updateMany(
      { username: { $in: [newBatch.trainer, newBatch.tracker] } },
      { $push: { batchCode: newBatch._id } }
    );

    // adding students to the schema
    addstudents?.forEach(async student => {
      // finding existing student
      let existingStudent = await StudentModel.findOne({
        email: student.email,
      });
      if (existingStudent) {
        await StudentModel.findByIdAndUpdate(existingStudent._id, {
          $push: { batchCode: newBatch._id },
        });
      } else {
        // creation of students
        await StudentModel.create({ ...student, batchCode: [newBatch._id] });
      }
    });
    res.status(200).json({ message: "Students added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// PUT Request
const updateAuth = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = hashingPassword(req.body.password);
    }
    const updatedAuth = await AuthModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(updatedAuth);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE REQUEST
const deleteAuth = async (req, res) => {
  try {
    await AuthModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// batchList
const BatchlistController = async (req, res) => {
  let batchData = await BatchModel.find({});
  res.status(201).json({ batchData });
};

// individual batch list
const individualBatchListController = async (req, res) => {
  let batchData = await BatchModel.find({ batchCode: req.params.batchCode });
  res.status(201).json({ batchData });
};
module.exports = {
  updateAuth,
  deleteAuth,
  addBatch,
  BatchlistController,
  individualBatchListController,
};

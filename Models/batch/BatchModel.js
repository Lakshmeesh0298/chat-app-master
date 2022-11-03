const { model, Schema } = require("mongoose");

const BatchSchema = new Schema({
    batchCode: { type: String, required: true, },
    subject: { type: String, required: true },
    course: { type: String, required: true },
    branch: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    trainer: { type: String, required: true },
    tracker: { type: String, required: true },
    addStudents: { type: Array, required: true },
},
    { timestamps: true }
)

module.exports = model('batches', BatchSchema)
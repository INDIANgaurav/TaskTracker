const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low"
    },
    status: {
        type: String,
        enum: ["yetToStart", "inProgress", "completed"],
        default: "yetToStart"
    },
    project: {
        type: String,
         
        required: true
    },
    completedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });


module.exports = mongoose.model("Task" , taskSchema)

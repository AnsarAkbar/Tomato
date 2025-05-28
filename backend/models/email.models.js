const { default: mongoose } = require("mongoose");

const emailSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["sent", "received", "draft"],
        default: "sent",
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Email", emailSchema);
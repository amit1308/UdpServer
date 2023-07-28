const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const detailsSchema = new Schema(
    {
        idCompany: { type: String },
        actionid: { type: String },
        token: { type: String },
        detection_time: { type: String },
        lon: { type: String },
        years: { type: String },
        device_event_type: { type: String },
        device_event_type_value: { type: String },
        information_quality:{ type: String },

    },
    {
        timestamps: true,
        toJSON: { getters: true },
    }
);

module.exports = mongoose.model("Details", detailsSchema, "details");
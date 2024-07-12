const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');




const prescriptionSchema = mongoose.Schema(
  {
    patient: {
      type: String,
      required: true,
      trim: true,
    },
    doctor: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    signature: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    office: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
prescriptionSchema.plugin(toJSON);
prescriptionSchema.plugin(paginate);

/**
 * @typedef Prescription
 */
const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;

const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPrescription = {
  body: Joi.object().keys({
    patient: Joi.string().required(),
    doctor: Joi.string().required(),
    description: Joi.string().required(),
    signature: Joi.string().required(), // Assuming signature is a string representing an image URL or base64 string
    date: Joi.date().required(),
    office: Joi.string().required(),
  }),
};

const getPrescriptions = {
  query: Joi.object().keys({
    patient: Joi.string(),
    doctor: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPrescription = {
  params: Joi.object().keys({
    prescriptionId: Joi.string().custom(objectId),
  }),
};

const updatePrescription = {
  params: Joi.object().keys({
    prescriptionId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      patient: Joi.string(),
      doctor: Joi.string(),
      description: Joi.string(),
      signature: Joi.string(), // Assuming signature is a string representing an image URL or base64 string
      date: Joi.date(),
      office: Joi.string(),
    })
    .min(1),
};

const deletePrescription = {
  params: Joi.object().keys({
    prescriptionId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPrescription,
  getPrescriptions,
  getPrescription,
  updatePrescription,
  deletePrescription,
};

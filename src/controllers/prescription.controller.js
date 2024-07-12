//Un module qui fournit des codes de statut HTTP.
const httpStatus = require('http-status');
const pick = require('../utils/pick');
//Une classe personnalisée pour gérer les erreurs API.
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { prescriptionService } = require('../services');

const createPrescription = catchAsync(async (req, res) => {
  const prescription = await prescriptionService.createPrescription(req.body);
  res.status(httpStatus.CREATED).send(prescription);
});

const getPrescriptions = catchAsync(async (req, res) => {
  console.log(req.query)
  const filter = pick(req.query, ['patient', 'doctor', 'date', 'office']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await prescriptionService.queryPrescriptions(filter, options);
  res.send(result);
});

const getPrescription = catchAsync(async (req, res) => {
  const prescription = await prescriptionService.getPrescriptionById(req.params.prescriptionId);
  if (!prescription) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Prescription not found');
  }
  res.send(prescription);
});

const updatePrescription = catchAsync(async (req, res) => {
  const prescription = await prescriptionService.updatePrescriptionById(req.params.prescriptionId, req.body);
  res.send(prescription);
});

const deletePrescription = catchAsync(async (req, res) => {
  await prescriptionService.deletePrescriptionById(req.params.prescriptionId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPrescription,
  getPrescriptions,
  getPrescription,
  updatePrescription,
  deletePrescription,
};

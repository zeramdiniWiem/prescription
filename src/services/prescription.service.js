//Un module qui fournit des codes de statut HTTP
const httpStatus = require('http-status');
//Une classe personnalisée pour gérer les erreurs API
const ApiError = require('../utils/ApiError');
//Le modèle de prescription Mongoose
const { Prescription } = require('../models');

/**
 * Create a Prescription
 * @param {Object} prescriptionBody
 * @returns {Promise<Prescription>}
 */
const createPrescription = async (prescriptionBody) => {
  return Prescription.create(prescriptionBody);
};
/**
 * Query for prescriptions
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const queryPrescriptions = async (filter, options) => {
  const prescriptions = await Prescription.paginate(filter, options);
  return prescriptions;
};

/**
 * Get prescription by id
 * @param {ObjectId} id
 * @returns {Promise<Prescription>}
 */
const getPrescriptionById = async (id) => {
  return Prescription.findById(id);
};

/**
 * Update prescription by id
 * @param {ObjectId} prescriptionId
 * @param {Object} updateBody
 * @returns {Promise<Prescription>}
 */
const updatePrescriptionById = async (prescriptionId, updateBody) => {
  const prescription = await getPrescriptionById(prescriptionId);
  if (!prescription) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Prescription not found');
  }
  Object.assign(prescription, updateBody);
  await prescription.save();
  return prescription;
};


/**
 * Delete prescription by id
 * @param {ObjectId} prescriptionId
 * @returns {Promise<Prescription>}
 */
const deletePrescriptionById = async (prescriptionId) => {
  const prescription = await getPrescriptionById(prescriptionId);
  if (!prescription) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Prescription not found');
  }
  await prescription.remove();
  return prescription;
};

module.exports = {
  createPrescription,
  queryPrescriptions,
  getPrescriptionById,
  updatePrescriptionById,
  deletePrescriptionById,
};

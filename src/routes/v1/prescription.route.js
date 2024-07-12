const express = require('express');
const prescriptionController = require('../../controllers/prescription.controller');

const router = express.Router();

// Route pour créer une prescription
router.post('/', prescriptionController.createPrescription);

// Route pour obtenir toutes les prescriptions
router.get('/', prescriptionController.getPrescriptions);

// Route pour obtenir une prescription par ID
router.get('/:prescriptionId', prescriptionController.getPrescription);

// Route pour mettre à jour une prescription par ID
router.patch('/:prescriptionId', prescriptionController.updatePrescription);

// Route pour supprimer une prescription par ID
router.delete('/:prescriptionId', prescriptionController.deletePrescription);

module.exports = router;

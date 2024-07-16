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

/**
 * @swagger
 * tags:
 *   name: Prescriptions
 *   description: Prescription management and retrieval
 */

/**
 * @swagger
 * /prescriptions:
 *   post:
 *     summary: Create a prescription
 *     description: Only doctors can create prescriptions.
 *     tags: [Prescriptions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patient
 *               - doctor
 *               - description
 *               - signature
 *               - date
 *               - office
 *             properties:
 *               patient:
 *                 type: string
 *               doctor:
 *                 type: string
 *               description:
 *                 type: string
 *               signature:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               office:
 *                 type: string
 *             example:
 *               patient: John Doe
 *               doctor: Dr. Smith
 *               description: Take one tablet daily
 *               signature: Dr. Smith
 *               date: 2023-07-16
 *               office: Office 1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Prescription'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *
 *   get:
 *     summary: Get all prescriptions
 *     description: Retrieve all prescriptions.
 *     tags: [Prescriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: patient
 *         schema:
 *           type: string
 *         description: Patient's name
 *       - in: query
 *         name: doctor
 *         schema:
 *           type: string
 *         description: Doctor's name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by query in the form of field:desc/asc (ex. date:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of prescriptions
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Prescription'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /prescriptions/{id}:
 *   get:
 *     summary: Get a prescription
 *     description: Logged in users can fetch their own prescriptions. Only admins can fetch other users' prescriptions.
 *     tags: [Prescriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Prescription id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Prescription'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a prescription
 *     description: Only doctors can update prescriptions.
 *     tags: [Prescriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Prescription id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patient:
 *                 type: string
 *               doctor:
 *                 type: string
 *               description:
 *                 type: string
 *               signature:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               office:
 *                 type: string
 *             example:
 *               patient: John Doe
 *               doctor: Dr. Smith
 *               description: Take one tablet daily
 *               signature: Dr. Smith
 *               date: 2023-07-16
 *               office: Office 1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Prescription'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a prescription
 *     description: Only doctors can delete prescriptions.
 *     tags: [Prescriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Prescription id
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

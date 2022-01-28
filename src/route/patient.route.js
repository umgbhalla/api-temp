import express from 'express'
import {
  getPatients,
  createPatient,
  getPatient,
  deletePatient,
  updatePatient,
} from '../controller/patient.controller.js'

const patientRouts = express.Router()
patientRouts.route('/').get(getPatients).post(createPatient)

patientRouts
  .route('/:id')
  .get(getPatient)
  .put(updatePatient)
  .delete(deletePatient)

export default patientRouts

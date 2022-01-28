import database from '../config/mysql.config.js'
import { Response, HttpStatus } from '../domain/reposnse.js'
import logger from '../util/logger.js'
import QUERY from '../query/patient.query.js'

export const getPatients = (req, res) => {
  logger.info(`${req.method} ${req.orignalurl}, fetching patients`)
  database.query(QUERY.SELECT_PATIENTS, (error, results) => {
    if (!results) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            `No patients found`
          )
        )
    } else {
      res.status(HttpStatus.OK.code).send(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          `Patients retrieved`,
          {
            patients: results,
          }
        )
      )
    }
  })
}

export const createPatient = (req, res) => {
  logger.info(`${req.method} ${req.orignalurl}, creating patient`)
  database.query(
    QUERY.CREATE_PATIENT,
    Object.values(req.body),
    (error, results) => {
      if (!results) {
        logger.error(error.message)
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(
            new Response(
              HttpStatus.INTERNAL_SERVER_ERROR.code,
              HttpStatus.INTERNAL_SERVER_ERROR.status,
              `Error occured, Patient not added`
            )
          )
      } else {
        const patient = {
          id: results.insertedId,
          ...req.body,
          created_at: new Date(),
        }
        res
          .status(HttpStatus.CREATED.code)
          .send(
            new Response(
              HttpStatus.CREATED.code,
              HttpStatus.CREATED.status,
              `Patient Created`,
              { patient }
            )
          )
      }
    }
  )
}

export const getPatient = (req, res) => {
  logger.info(`${req.method} ${req.orignalurl}, fetching patient`)
  database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Patient by id ${req.params.id} not found`
          )
        )
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            `Patient retrieved`,
            results[0]
          )
        )
    }
  })
}

export const updatePatient = (req, res) => {
  logger.info(`${req.method} ${req.orignalurl}, fetching patient`)
  database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Patient by id ${req.params.id} not found`
          )
        )
    } else {
      logger.info(`${req.method} ${req.orignalurl}, updating patient`)
      database.query(
        QUERY.UPDATE_PATIENT,
        [...Object.values(req.body), req.params.id],
        (error, results) => {
          if (!error) {
            logger.info(`${req.method} ${req.orignalurl}, updated patient`)
            res
              .status(HttpStatus.OK.code)
              .send(
                new Response(
                  HttpStatus.OK.code,
                  HttpStatus.OK.status,
                  `Patient Updated`,
                  { id: req.params.id, ...req.body }
                )
              )
          } else {
            logger.error(error.message)
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
              .send(
                new Response(
                  HttpStatus.INTERNAL_SERVER_ERROR.code,
                  HttpStatus.INTERNAL_SERVER_ERROR.status,
                  `error occured`
                )
              )
          }
        }
      )
    }
  })
}

export const deletePatients = (req, res) => {
  logger.info(`${req.method} ${req.orignalurl}, deleting patients`)
  database.query(QUERY.DELETE_PATIENT, (error, results) => {
    if (results.affectedRows > 0) {
      res.status(HttpStatus.OK.code).send(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          `Patients retrieved`,
          {
            patients: results[0],
          }
        )
      )
    } else {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Patient by id ${req.params.id} not found`
          )
        )
    }
  })
}

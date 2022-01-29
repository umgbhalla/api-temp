import dotenv from 'dotenv'
import express from 'express'
import ip from 'ip'
import cors from 'cors'
import Response from './domain/reposnse.js'
// import HttpStatus from './domain/reposnse.js'
import patientRouts from './route/patient.route.js'
import logger from './util/logger.js'
import bodyParser from 'body-parser'
dotenv.config()
const PORT = process.env.SERVER_PORT || 3000
const app = express()
//
//  // create application/json parser
// let jsonParser = bodyParser.json()
//  // create application/x-www-form-urlencoded parser
// let urlencodedParser = bodyParser.urlencoded({ extended: false })
//

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({ origin: '*' })) // not recommended
// app.use(cors({origin: /* array of allowed urls */ })) //  recommended
app.use('/patients', patientRouts)
const HttpStatus = {
  OK: { code: 200, status: 'OK' },
  CREATED: { code: 201, status: 'CREATED' },
  NO_CONTENT: { code: 204, status: 'NO_CONTENT' },
  BAD_REQUEST: { code: 400, status: 'BAD_REQUEST' },
  NOT_FOUND: { code: 404, status: 'NOT_FOUND' },
  INTERNAL_SERVER_ERROR: { code: 500, status: 'INTERNAL_SERVER_ERROR' },
}

console.log(HttpStatus.OK.code)
app.get('/', (req, res) =>
  res.send(
    new Response(
      HttpStatus.OK.code,
      HttpStatus.OK.status,
      `Patient API v ${process.env.npm_package_version} \n All Systems GOOD`
    )
  )
)

app.all('*', (req, res) =>
  res.status(
    new Response(
      HttpStatus.NOT_FOUND.code,
      HttpStatus.NOT_FOUND.status,
      `Route does not exist in current version`
    )
  )
)

// console.log(process.env)

app.listen(PORT, () =>
  logger.info(`server running on: http://${ip.address()}:${PORT}`)
)

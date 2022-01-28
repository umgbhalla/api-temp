import dotenv from 'dotenv'
import express from 'express'
import ip from 'ip'
import cors from 'cors'
import Response from './domain/reposnse.js'
import HttpStatus from './domain/reposnse.js'
import patientRouts from './route/patient.route.js'
import logger from './util/logger.js'
dotenv.config()
const PORT = process.env.SERVER_PORT || 3000
const app = express()
app.use(cors({ origin: '*' })) // not recommended
// app.use(cors({origin: /* array of allowed urls */ })) //  recommended
app.use('/patients', patientRouts)

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

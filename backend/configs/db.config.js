const mongoose = require("mongoose")
const app_name = require("../package.json").name
require('dotenv').config()

const MONDOGB_URI = process.env.MONDOGB_URI || `mongodb://localhost/${app_name}`

mongoose
    .connect(MONDOGB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(x => {
        console.log(`Connected to Mongo! DB name: "${x.connections[0].name}"`)
    })
    .catch(err => {
        console.error("Error connecting to mongo", err)
        process.exit(1)
    })
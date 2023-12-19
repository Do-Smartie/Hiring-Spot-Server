const mongoose = require('mongoose');

const con = mongoose.createConnection('mongodb://localhost:27017')
const db = con.useDb('SECE_PLACEMENTS')

module.exports = { db }

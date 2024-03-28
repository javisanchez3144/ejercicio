const NODE_ENV = process.env.NODE_ENV || 'development'
require("dotenv").config({ path: `env.${NODE_ENV}` });

const PRODUCTION = require("./production");
const DEVELOPMENT = require("./development");
const QA = require("./qa");

let currentEnv = DEVELOPMENT;

if (NODE_ENV === "production") {
    currentEnv = PRODUCTION;
} else if (NODE_ENV === "qa") {
    currentEnv = QA;
}

module.exports = currentEnv;
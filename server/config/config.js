const Joi = require('@hapi/joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  SERVER_PORT: Joi.number()
    .default(4040),
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    }),
  REDIS_SESSION_SECRET: Joi.string().required()
    .description('Redis Secret required to sign'),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number()
    .default(27017),
  AUTH_INTERACT_EMAIL_ADDRESS:Joi.string().required()
  .description('AUTH_INTERACT_EMAIL_ADDRESS required to communicate with users during auth activities like pass reset, etc.'),
  AUTH_INTERACT_EMAIL_PASSWORD:Joi.string().required()
  .description('AUTH_INTERACT_EMAIL_PASSWORD required to be able to use the respective email'),
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.SERVER_PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  redisSessionSecret: envVars.REDIS_SESSION_SECRET,
  frontend: envVars.MEAN_FRONTEND || 'angular',
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT
  },
  authInteract:{
    email: envVars.AUTH_INTERACT_EMAIL_ADDRESS,
    password: envVars.AUTH_INTERACT_EMAIL_PASSWORD
  }
};

module.exports = config;

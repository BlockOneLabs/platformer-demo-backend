const Redis = require("ioredis");

const REDIS_KEY = process.env.REDIS_KEY
const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PORT = process.env.REDIS_PORT
const connectionString = `redis://:${REDIS_KEY}@${REDIS_HOST}:${REDIS_PORT}`
let client = new Redis(connectionString);


export default client;


require('dotenv').config({path: 'variables.env'});
const createServer = require('./createServer');
const cookieParser = require('cookie-parser');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser());
server.express.use((req, res, next) => {
    const { token } = req.cookies;
    console.log(token);
    next();
})

server.start(
    {
        cors: {
            credentials: true,
            origin: process.env.FRONTEND_URL
        }
    },
    details => {
        console.log(`The Server is now running on http://localhost:${details.port}`);
    }
)

import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import passport from 'passport';

import mainRouter from './routes/async.router.js';
import { connectDatabase, commitDatabase, rollbackDatabase } from './lib/database.middleware.js';

import './utils/passport.config.js';

//config
const app = express();
const PORT = process.env.process || 3000;

app.use(express.json());
app.use(cors());
app.use(connectDatabase);
app.use(passport.initialize());
app.use(mainRouter());
app.use(commitDatabase);
app.use(rollbackDatabase);

app.listen(PORT, () => {
    console.info(`Express server runing at http://localhost:${PORT}`);
});

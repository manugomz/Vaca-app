import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import passport from 'passport';

import mainRouter from './routes/async.router.js';
import './utils/passport.config.js';

//config
const app = express();
const PORT = process.env.process || 3000;

app.use(express.json());
app.use(passport.initialize());
app.use(cors());
app.use(mainRouter());

app.listen(PORT, () => {
    console.info(`Express server runing at http://localhost:${PORT}`);
});

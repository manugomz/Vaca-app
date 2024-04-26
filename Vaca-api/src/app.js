import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mainRouter from './routes/async.router.js';

//config
const app = express();
const PORT = process.env.process || 3000;

app.use(express.json());
app.use(cors());
app.use(mainRouter())

app.listen(PORT, () => {
  console.info(`Express server runing at http://localhost:${PORT}`);
});

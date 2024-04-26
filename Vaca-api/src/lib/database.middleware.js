import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  // same as
  // user: process.env.PGUSER,
  // host: process.env.PGHOST,
  // database: process.env.PGDATABLASE,
  // password: process.env.PGPASSWORD,
  // port: process.env.PGPORT,
});

const requireTransactionMap = {
  POST: true,
  PUT: true,
};

const connectDatabase = async (req, res, next) => {
  //resolve DB client
  let dbClient = null;
  try {
    dbClient = await pool.connect();
    req.dbClient = dbClient;
    req.doTransaction = requireTransactionMap[req.method] === true;

    if (req.doTransaction) {
      await req.dbClient.query("BEGIN");
    }
    console.info('database connected');
    next();
  } catch (err) {
      res.status(503).end();
      next(err);
  }
};

const commitDatabase = async (req, rest, next) => {
  if (req.doTransaction){
    await req.dbClient.query('COMMIT');
  }
  req.dbClient.release();
  req.dbClient=undefined;
  req.doTransaction=undefined;
  console.info('database disconnected');
  next();
};

const rollbackDatabase = async (err, req, rest, next) => {
  if(req.doTransaction && req.dbClient){
    console.log('rollback transaction ');
    await req.dbClient.query('ROLLBACK');
    req.dbClient.release();
    req.dbClient=undefined;
    req.doTransaction=undefined;
  }
  console.info('---ERROR---');
  console.error(err);
  //TODO: Need a way to detect app error from system error
  let errorCode=500;
  if(err.isApplicationError=== true){
    errorCode= err.errorCode;
  }
  res.status(errorCode).json({
    error:err.message||`can't process your request`,
  })
  next();
};

export{ connectDatabase, commitDatabase, rollbackDatabase}
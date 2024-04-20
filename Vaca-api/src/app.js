const express = require("express");
const cors = require("cors");
const groupRouter = require("./routes/groups");

//config
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use(groupRouter);



app.listen(PORT, () => {
  console.info(`Express server runing at http://localhost:${PORT}`);
});

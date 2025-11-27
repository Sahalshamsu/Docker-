const express = require("express");
const cors = require("cors");
const connectDBS = require("./config/dbs");
const projectroutes = require('./Routes/Project')

const Studentroutes = require("./Routes/Student");

const app = express();
const PORT = 5000;
connectDBS();

app.use(express.json());
app.use(cors());


app.use("/api", Studentroutes);


app.use('/api/pro',projectroutes)




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
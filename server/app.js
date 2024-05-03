const express = require("express") ;
const  dotenv = require("dotenv");
const cors = require("cors")
const {errorHandler} = require("./utils/utility");
const { connectDB } = require("./utils/dbconnection");
const router = require("./routes/routes");


const app = express();

// Connect Env
dotenv.config();

// Handle Cors Request
app.use(cors())

// Connect DB Connection
connectDB(process.env.DB_URI);



app.use(express.json());

app.use("/api/v1/contact",router);
app.get("/",(req,res)=>{
  res.send("run server")
})

app.use(errorHandler);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});

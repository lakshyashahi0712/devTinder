// Load environment variables FIRST
require("dotenv").config();

const express = require("express");
const { connectDB } = require("./config/database");
// const { User } = require("./models/user");
// const {userAuth} = require("./middleware/auth")
// const {validateSignUpData} = require("./utils/validate")
//const bcrypt = require("bcrypt")

const cookieParser = require("cookie-parser");
//const jwt = require("jsonwebtoken")
const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const uploadRouter = require("./routes/upload");
const cors = require("cors")
//require("./utils/cronjob")


const app = express();
console.log("✅ App instance created");


app.use(cors({ origin: "http://localhost:5173", credentials: true, }) )


app.use(express.json());
app.use(cookieParser());
console.log("✅ Middleware added");

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)
app.use("/",uploadRouter)


console.log("🧠 Connecting to DB...");
connectDB()
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 3000, () => {
      console.log("🚀 Server started on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });

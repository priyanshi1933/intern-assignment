import express from "express";
import dotenv from "dotenv";
import router from "./routes/route";
import mongoose from "mongoose";
import cors,{CorsOptions} from "cors"

dotenv.config({ path: '.env.local' }); 
const app = express();
const corsOptions:CorsOptions={
  origin:"http://localhost:5173",
  methods:['GET','POST','DELETE'],
  allowedHeaders:['Content-Type','Authorization'],
  credentials:true
};
const PORT = process.env.PORT || 5001;
const connectionString = process.env.MONGO_URI || "";
if (!connectionString) {
    console.error("MONGO_URI is not defined in .env file");
}

mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.error("Connection err: ", err));

app.use(express.json());
app.use(cors(corsOptions));
app.use(router);

app.use((err: any, req: any, res: any, next: any) => {
  // if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
  //   return res.status(400).json({ message: "Invalid JSON payload" });
  // }
  next(err);
});

console.log(process.env.MONGO_URI);
app.get("/", (req, res) => {
  console.log("This is root page");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

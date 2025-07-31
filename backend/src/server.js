import dotenv from "dotenv"
import express from "express"

const app = express();
const PORT = 3500;

app.listen(PORT, ()=>{
  console.log(`SERVER LISTENING ON PORT ${PORT}`)
});
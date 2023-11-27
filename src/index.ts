const express = require("express");
import { config } from "dotenv";
config();
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Aberto em ${PORT}`);
});

app.get("/", (req: any, res: any) => {
  res.send("Hello Word");
});

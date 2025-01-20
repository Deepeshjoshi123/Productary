import express from "express";
import connectDb from "./config/db.js";
import productRouter from "./router/product.router.js";

const app = express();
app.use(express.json());

app.use("/api/products", productRouter);

app.listen(8000, () => {
  connectDb();
  console.log("App is listening at port 8000");
});

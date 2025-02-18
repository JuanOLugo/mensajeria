import mongoose from "mongoose";

export const dbconnect = () =>
  mongoose
    .connect("mongodb://juano:21950524@localhost:27017/mensajeria?authSource=admin")
    .then((_) => console.log("DB IS UP"))
    .catch((err) => console.log(err));

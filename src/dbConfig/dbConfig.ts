import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongDb connected succesfully");
    });
    connection.on("error", (err) => {
      console.log(
        "MongDb connection error. make sure mongodb is running" + err
      );
      process.exit();
    });
  } catch (error) {
    console.log();
  }
};

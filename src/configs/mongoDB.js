// ---------------------------------------------Imports------------------------------------------
import chalk from "chalk";
import mongoose from "mongoose";
// ----------------------------------------------------------------------------------------------

// mongoConnect - function to connect the mongo database of the provided mongo url string
export const mongoConnect = async() => {
  try {
    await mongoose.connect(process.env.MONGO_DB_DATABASE_URL);
    console.log(
      chalk.bold.italic.bgHex("#FF69B4")("Mongo Database Connection Successful                                                                             ")
    );
  } catch (error) {
    console.log(
      error.message
        ? `Mongo Database Connection Failed ${error.message}`
        : `Mongo Database Connection Failed`
    );
  }
};

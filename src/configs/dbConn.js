import mongoose from "mongoose";

const connect = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);
    if (connection.readyState === 1) {
      console.log("Database connected successfully");
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connect;

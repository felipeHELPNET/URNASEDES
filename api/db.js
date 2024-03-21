import mongoose from "mongoose";

export async function connectToDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://urnasedes:sedes030145@cluster0.bcizinl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Conectado ao MongoDB");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
}

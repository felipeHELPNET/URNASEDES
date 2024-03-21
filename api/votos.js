// api/votos.js
import { connectToDB } from "./db.js";
import mongoose from "mongoose";

const VotoSchema = new mongoose.Schema({
  numero: String,
  chapa: String,
});

const Voto = mongoose.model("Voto", VotoSchema);

module.exports = async (req, res) => {
  await connectToDB();

  const { numero, chapa } = req.body;
  try {
    await Voto.create({ numero, chapa });
    console.log("Voto salvo no DB:", numero, chapa);
    res.status(200).send({ message: "Voto salvo com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar voto no DB:", error);
    res.status(500).send({ message: "Erro ao salvar voto no DB" });
  }
};

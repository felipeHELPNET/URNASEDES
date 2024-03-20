import express from "express";
import mongoose from "mongoose";
import { connectToDB } from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;

connectToDB();

const VotoSchema = new mongoose.Schema({
  numero: String,
  chapa: String,
});

const Voto = mongoose.model("Voto", VotoSchema);

app.use(express.static("public"));
app.use(express.json());

app.post("/api/votos", async (req, res) => {
  const { numero, chapa } = req.body;
  try {
    await Voto.create({ numero, chapa });
    console.log("Voto salvo no DB:", numero, chapa);
    res.status(200).send({ message: "Voto salvo com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar voto no DB:", error);
    res.status(500).send({ message: "Erro ao salvar voto no DB" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

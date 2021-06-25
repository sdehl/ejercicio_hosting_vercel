const express = require("express");
const app = express();

app,
  get("./ejemplo", (req, res) => {
    res.end("Llegaste a ejemplo");
  });

app.get("/usuarios", (req, res) => {
  res.end("Llegaste a usuarios");
});

app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000!"));

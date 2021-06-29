require("dotenv").config();
const path = require("path");
const express = require("express");
const routes = require("./routes");
const app = express();
const nunjucks = require("nunjucks");
const { sequelize } = require("./models");
const PORT = process.env.APP_PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
app.set("view engine", "njk");
app.use(express.static(path.join(__dirname, 'public')))
app.use(routes);

// sequelize.sync({ force: true }).then(async () => {
//   await require("./seeders")();
// });

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}!`));

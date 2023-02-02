import express, { json, urlencoded } from "express";
import { engine } from "express-handlebars";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));

const server = express();
const PORT = process.env.PORT;
dotenv.config();
//handlebars
server.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: join(__dirname, "public/views/layouts/main.hbs"),
    layoutsDir: join(__dirname, "public/views/layouts"),
    partialsDir: join(__dirname, "public/views/partials"),
  })
);
server.set("view engine", "hbs");
server.set("views", join(__dirname, "public/views"));

//servir contenido estatico
server.use(express.static("public"));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.render("home", {
    name: "emanuel palacio",
    tittle: "aprendiendo node",
  });
});
server.get("/generic", (req, res) => {
  res.render("generic");
});
server.get("/elements", (req, res) => {
  res.render("elements");
});

server.listen(PORT, () => {
  console.log("iniciado con exito");
});

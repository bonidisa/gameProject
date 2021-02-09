let express = require("express");
let bodyparser = require("body-parser");
let app = express();
let port = 3000;

//Préparation du serveur
app.set("view engine", "ejs");

app.use("/", express.static(__dirname + "/www")); // redirect root

app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js")); // redirect bootstrap JS
app.use("/js", express.static(__dirname + "/node_modules/jquery/dist")); // redirect JS jQuery
app.use("/js", express.static(__dirname + "/node_modules/popper.js/dist/umd")); // redirect popper
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css")); // redirect bootstrap CSS
app.use("/views", express.static(__dirname + "/views")); // redirect ejs
app.use("/www", express.static(__dirname + "/www"));

// Body parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.listen(port, () => {
  console.log("Le serveur est en route");
  console.log(`Serveur listening at http://localhost:${port}`);
});

let monobjet = {
  nom: "monobjet",
  valeur: 10,
};

app.get("/", (req, res, next) => {
  /* Envoyer un message */
  //res.send('Bonjour Mathis !');
  /* Envoyer un fichier */
  //res.sendFile('www/index.html');
  /* Envoyer un fichier avec ejs */
  res.render("index.ejs", { monobjet: monobjet });
});

app.get("/form", (req, res, next) => {
  /* Envoyer une autre page avec ejs */
  res.render("form.ejs");
});

app.use((req, res, next) => {
  // Implémentation page 404
  res.status(404).render("error.ejs");
});

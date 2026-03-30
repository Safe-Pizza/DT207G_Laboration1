/*Laboration 1 DT207G*/

const express = require("express");
const app = express();
const port = 3000;

//view-engine
app.set("view engine", "ejs");

//statiska filer i katalog public
app.use(express.static("public"));

//Route
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/add", (req, res) => {
    res.render("add");
});

app.get("/about", (req, res) => {
    res.render("about");
});

//Starta
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
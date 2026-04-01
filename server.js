/*Laboration 1 DT207G*/

const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

//view-engine
app.set("view engine", "ejs");

//statiska filer i katalog public
app.use(express.static("public"));

//formulärdata
app.use(express.urlencoded({ extended: true }));

//Route
app.get("/", async (req, res) => {
    res.render("index");
});

app.get("/add", async (req, res) => {
    res.render("add", {
        errors: [],
        courseCode: "",
        courseName: "",
        progression: "",
        syllabus: ""
    });
});

app.post("/add", async (req, res) => {
    //lagra formulärdata
    const courseCode = req.body.coursecode;
    const courseName = req.body.coursename;
    const progression = req.body.courseprogression;
    const syllabus = req.body.coursesyllabus;

    let errors = [];

    //validera formulärdata
    if (courseCode === "") {
        errors.push("Du måste ange kurskod");
    };
    if (courseName === "") {
        errors.push("Du måste ange kursnamn");
    };
    if (progression === "") {
        errors.push("Du måste ange progression");
    }; if (syllabus === "") {
        errors.push("Du måste ange webbadress");
    };

    res.render("add", {
        errors: errors,
        courseCode: courseCode,
        courseName: courseName,
        progression: progression,
        syllabus: syllabus
    });

});

app.get("/about", async (req, res) => {
    res.render("about");
});

//Starta
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
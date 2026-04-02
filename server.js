/*Laboration 1 DT207G*/

const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

//Anslutning databas
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/courses.db");

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
    let courseCode = req.body.coursecode;
    let courseName = req.body.coursename;
    let progression = req.body.courseprogression;
    let syllabus = req.body.coursesyllabus;

    //tom array för felmeddelanden
    let errors = [];

    //funktion för kontroll av korrekt url
    function isUrlValid(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    };

    //validera formulärdata
    if (courseCode === "") {
        errors.push("Du måste ange kurskod");
    };
    if (courseName === "") {
        errors.push("Du måste ange kursnamn");
    };
    if (progression === "") {
        errors.push("Du måste ange progression");
    };
    if (progression.toUpperCase() !== "A" && progression.toUpperCase() !== "B" && progression.toUpperCase() !== "C") {
        errors.push("Progression kan endast vara A, B eller C");
    };
    if (syllabus === "") {
        errors.push("Du måste ange webbadress");
    };

    if (isUrlValid(syllabus) === false) {
        errors.push("Webbadressen är inte giltig");
    };

    if (errors.length === 0) {
        //SQL-fråga
        const dbInput = db.prepare(`INSERT INTO course(course_code, course_name, course_progression, course_syllabus)VALUES(?,?,?,?);`);
        dbInput.run(courseCode, courseName, progression, syllabus);
        dbInput.finalize();

        db.close();

        //Nollställ formulärdata
        courseCode = "";
        courseName = "";
        progression = "";
        syllabus = "";
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
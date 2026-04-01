"use strict";

document.addEventListener("DOMContentLoaded", () => {

    //Eventlyssnare för hamburgermeny
    document.querySelector("#hamburger-menu").addEventListener("click", toggleMenu);

    //kontroll och switch för page-indicator
    const pathName = window.location.pathname;

    switch(pathName) {
        case "/":
            document.querySelector(".index-page").classList.add("current-page");
            break;
        case "/add":
            document.querySelector(".add-page").classList.add("current-page");
            break;
        case "/about":
            document.querySelector(".about-page").classList.add("current-page");
            break;
        default:
            console.log("Något gick fel");
    }

});

//togglefunktion för hamburgermeny
function toggleMenu() {
    const mainNavEl = document.querySelector("#main-nav");
    const hamMenuEl = document.querySelector("#hamburger-menu");

    if (mainNavEl.style.display === "block") {
        mainNavEl.style.display = "none";
        hamMenuEl.classList.remove("change");
    } else {
        mainNavEl.style.display = "block";
        hamMenuEl.classList.add("change");
    }
}
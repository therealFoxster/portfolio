//
//  appearance.js
//  portfolio
//
//  Created by Foxster on 2022-09-23.
//  Copyright (c) 2022 Foxster. All rights reserved.
//

import { $, $$ } from "./lib.js";

const navBar = $("#navbar");
const navBarTogglerBreadCrusts = $$("#navbar .navbar-toggler-bread-crust");
const blurBackgroundElements = $$(".bg-blur");
const lightOutlineButtons = $$(".btn-outline-light");
const matteLightTexts = $$(".text-matte-light");
const miscelllaneousElements = $$("#main-container, body, footer");

// Toggles
$("#light-appearance").addEventListener("click", () => setPreferredAppearance("light"));
$("#dark-appearance").addEventListener("click", () => setPreferredAppearance("dark"));
$("#auto-appearance").addEventListener("click", () => setPreferredAppearance("auto"));

NodeList.prototype.setBackgroundColor = function(s) {
    this.forEach(element => element.style.backgroundColor = s);
}
NodeList.prototype.addClass = function(c) {
    this.forEach(element => element.classList.add(c));
}
NodeList.prototype.removeClass = function(c) {
    this.forEach(element => element.classList.remove(c));
}

const lightAppearance = () => {
    navBar.classList.remove("navbar-dark");
    navBarTogglerBreadCrusts.setBackgroundColor("var(--dark-bg-color)");
    blurBackgroundElements.setBackgroundColor("var(--nav-background)");
    lightOutlineButtons.removeClass("btn-outline-light");
    lightOutlineButtons.addClass("btn-outline-primary");
    matteLightTexts.addClass("text-matte-dark");
    miscelllaneousElements.setBackgroundColor("var(--light-bg-color)");
    
    $$(".text-light").addClass("text-dark");
    $$(".bg-white").removeClass("bg-off-black");
    $$(".bg-off-white, .bg-off-white2").removeClass("bg-black");
    $$(".app-icon").removeClass("dark");
};

const darkAppearance = () => {
    navBar.classList.add("navbar-dark");
    navBarTogglerBreadCrusts.setBackgroundColor("var(--light-bg-color)");
    blurBackgroundElements.setBackgroundColor("var(--nav-background-dark)");
    lightOutlineButtons.removeClass("btn-outline-primary");
    lightOutlineButtons.addClass("btn-outline-light");
    matteLightTexts.removeClass("text-matte-dark");
    miscelllaneousElements.setBackgroundColor("var(--dark-bg-color)");
    
    $$(".text-light").removeClass("text-dark");
    $$(".bg-white").addClass("bg-off-black");
    $$(".bg-off-white, .bg-off-white2").addClass("bg-black");
    $$(".app-icon").addClass("dark");
};

const autoAppearance = () => {
    const darkModeEnabled = window.matchMedia("(prefers-color-scheme: dark)");
    // System appearance change listener (for "auto" only)
    darkModeEnabled.addEventListener("change", event => {
        if (getPreferredAppearance() == "auto")
            event.matches ? darkAppearance() : lightAppearance()
    });
    // Set page appearance (one-time)
    darkModeEnabled.matches ? darkAppearance() : lightAppearance();
}

function getPreferredAppearance() {
    return window.localStorage.getItem("appearance") ?? "auto";
}

function setPreferredAppearance(appearance) {
    const preferredAppearance = appearance.toLowerCase();
    
    switch (preferredAppearance) {
    case "light":
        lightAppearance();
        break;
    case "dark":
        darkAppearance();
        break;
    case "auto":
    default:
        autoAppearance();
        break;
    }

    // Set active appearance toggle
    $$('#appearance-toggle .nav li a.active').removeClass("active");
    $(`#${preferredAppearance}-appearance`).classList.add('active');

    // Save preference to local storage
    window.localStorage.setItem("appearance", preferredAppearance);
}

export function refreshAppearance() {
    setPreferredAppearance(getPreferredAppearance());
}

refreshAppearance();

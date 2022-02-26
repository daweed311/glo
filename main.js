"use strict";

const DomElement = function (selector = "", style = {}) {
  this.selector = selector || "";

  if (!("height" in style)) {
    style.height = "0px";
  }
  if (!("width" in style)) {
    style.width = "0px";
  }
  if (!("bg" in style || "background" in style)) {
    style.bg = "rgba(0, 0, 0, 0)";
  }
  if (!("fontSize" in style)) {
    style.fontSize = "1rem";
  }

  for (let key in style) {
    this[key === "background" ? "bg" : key] = style[key];
  }
};

DomElement.prototype.addInPage = function () {
  const idTag = (this.selector + "").trim()[0];
  const nameAttr = (this.selector + "").trim().slice(1);
  const symbols = {
    ".": { tag: "div", attr: "class" },
    "#": { tag: "p", attr: "id" },
  };
  let element = null;

  if (idTag in symbols) {
    const toCSS = (s) => s.replace(/[A-Z]/g, "-" + "$&").toLowerCase();

    let cssText = "";

    element = document.createElement(symbols[idTag].tag);
    element.setAttribute(symbols[idTag].attr, nameAttr);

    Object.keys(this)
      .filter((key) => key !== "selector")
      .forEach((key) => {
        cssText += `${toCSS(key === "bg" ? "background" : key)}: ${
          this[key]
        }; `;
      });
    element.style.cssText = cssText;

    document.addEventListener("DOMContentLoaded", function (event) {
      document.querySelector("body").append(element);
    });
  }
  return element;
};

const mySquareId = new DomElement("#mySquareId", {
  height: "100px",
  width: "100px",
  bg: "red",
  fontSize: "10px",
});
const myDiv = new DomElement(".myDiv", {
  height: "120px",
  width: "100px",
  bg: "blue",
  fontSize: "10px",
});

mySquareId.addInPage().textContent = "any text";
myDiv.addInPage().textContent = "any text";

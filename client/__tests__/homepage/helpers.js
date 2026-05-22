const path = require("path");
const fs = require("fs").promises;
const { JSDOM } = require("jsdom");


const renderDOM = async (htmlFile, jsFile = null) => {
  
  const htmlPath = path.join(__dirname, "../.." ,htmlFile);
  const html = await fs.readFile(htmlPath, "utf8");

  // create DOM from the HTML string
  const dom = new JSDOM(html, {
    runScripts: "dangerously",
    resources: "usable",
    pretendToBeVisual: true,
    url: "http://localhost"
  });

  if (global.localStorage){
    dom.window.localStorage = global.localStorage
  }

  // read js file
  if (jsFile) {
    const jsPath = path.join(__dirname, "../..", jsFile);
    const js = await fs.readFile(jsPath, "utf8");
    dom.window.eval(js);
  }

  return new Promise((resolve) => {
    dom.window.document.addEventListener("DOMContentLoaded", () => {
      resolve(dom);
    });
  });
};

module.exports = { renderDOM };
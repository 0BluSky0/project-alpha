const { TextEncoder, TextDecoder } = require("util");
if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

const path = require("path");
const fs = require("fs").promises;
const { JSDOM } = require("jsdom");

const CLIENT_DIR = path.join(__dirname, "../client");

const renderDOM = async (htmlFile, jsFile = null) => {
  try {
    const htmlPath = path.join(CLIENT_DIR, htmlFile);
    const html = await fs.readFile(htmlPath, "utf8");

    const dom = new JSDOM(html, {
      runScripts: "dangerously",
      pretendToBeVisual: true,
      url: "http://localhost",
    });

    dom.window.getComputedStyle = (element) => {
      const style = element.style;
      return {
        filter: style.filter || "none",
        opacity: style.opacity || "1",
      };
    };

    if (global.localStorage) {
      dom.window.localStorage = global.localStorage;
    }

    if (jsFile) {
      const jsPath = path.join(CLIENT_DIR, jsFile);
      const js = await fs.readFile(jsPath, "utf8");
      try {
        dom.window.eval(js);
      } catch (error) {
        console.error(`Error evaluating ${jsFile}:`, error.message);
        throw error;
      }
    }

    return new Promise((resolve) => {
      console.log("Waiting for DOMContentLoaded..."); // debug
      dom.window.document.addEventListener("DOMContentLoaded", () => {
        console.log("DOMContentLoaded fired!"); // debug
        resolve(dom);
      });

      //fallback
      setTimeout(() => {
        console.warn("DOMContentLoaded did not fire; resolving manually.");
        resolve(dom);
      }, 1000);
    });
  } catch (error) {
    console.error("Error in renderDOM:", error);
    throw error;
  }
};

module.exports = { renderDOM };

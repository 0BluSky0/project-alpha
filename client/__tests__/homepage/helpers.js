const path = require("path");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const renderDOM = async (htmlFile, jsFile = null) => {
	const filePath = path.join(process.cwd(), htmlFile);
	const dom = await JSDOM.fromFile(filePath, {
		runScripts: "dangerously",
		resources: "usable",
	});

    const jsPath = path.join(process.cwd(), jsFile);
    const script = await dom.window.fetch(jsPath).then(res => res.text());
    dom.window.eval(script);

	return new Promise((resolve, _) => {
		dom.window.document.addEventListener("DOMContentLoaded", () => {
			resolve(dom);
		});
	});
};

module.exports = {
	renderDOM,
};
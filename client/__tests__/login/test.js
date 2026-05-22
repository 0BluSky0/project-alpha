const { renderDOM } = require("../homepage/helpers");

let dom;
let document;

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

describe("login/index.html", () => {
  beforeEach(async () => {
    global.localStorage = localStorageMock;
    dom = await renderDOM("login/index.html", "login/index.js");
    document = await dom.window.document;
});

  afterEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  it("displays a login form", () => {
    const form = document.getElementById("login-form");
    expect(form).toBeTruthy();
  });

  it("has an email input field", () => {
    const emailInput = document.getElementById("email");
    expect(emailInput).toBeTruthy();
  });

  it("has a password input field", () => {
    const passwordInput = document.getElementById("password");
    expect(passwordInput).toBeTruthy();
  });

  it("has a link to the signup page", () => {
    const signupLink = document.getElementById("signupLink");
    expect(signupLink).toBeTruthy();
    expect(signupLink.getAttribute("href")).toContain("signup");
  });

  it("applies default theme if no theme is saved", () => {
    localStorageMock.removeItem("theme");
    const htmlElement = document.documentElement;
    dom.window.setTheme("light");
    expect(htmlElement.getAttribute("data-theme")).toBe("light");
  });

});
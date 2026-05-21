const { renderDOM } = require("./helpers");

let dom;
let document;

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

describe("homepage/index.html", () => {
  beforeEach(async () => {
    global.localStorage = localStorageMock;
    dom = await renderDOM("homepage/index.html", "homepage/index.js");
    document = await dom.window.document;
    dom.window.localStorage = localStorageMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  it("displays default welcome message if no username is saved", () => {
    localStorageMock.removeItem("username");
    dom.window.displayWelcomeMessage();
    const welcomeMessage = document.getElementById("welcome-message");
    expect(welcomeMessage).toBeTruthy();
    expect(welcomeMessage.textContent).toBe("Welcome to Eureka!");
  });

  // it("includes username in welcome message if user is logged in", () => {
  //     localStorageMock.setItem("username", "Ella")
  //     dom.window.localStorage = localStorageMock
  //     const welcomeMessage = document.getElementById("welcome-message")
  //     welcomeMessage.textContent = ""
  //     dom.window.displayWelcomeMessage()

  //     expect(welcomeMessage).toBeTruthy()
  //     expect(welcomeMessage.textContent).toBe("Welcome to Eureka, Ella!")
  // });

  it("applies default theme if no theme is saved", () => {
    localStorageMock.removeItem("theme");
    const htmlElement = document.documentElement;
    expect(htmlElement.getAttribute("data-theme")).toBe("light");
  });

  it("applies the user's saved theme to the page", () => {
    localStorageMock.setItem("theme", "dark");
    const htmlElement = document.documentElement;
    dom.window.setTheme("dark");
    expect(htmlElement.getAttribute("data-theme")).toBe("dark");
  });

  it("has a button to navigate to the challenge page", () => {
    const challengeButton = document.querySelector(".challenge");
    expect(challengeButton).toBeTruthy();
    expect(challengeButton.textContent).toContain("Challenge");
  });

  it("displays a navbar with profile and leaderboard", () => {
    const navbar = document.querySelector("#navbar");
    expect(navbar).toBeTruthy();
    expect(navbar.innerHTML).toContain("Profile");
    expect(navbar.innerHTML).toContain("Leaderboard");
  });

it("has a logout button",() => {
    const logoutBtn = document.querySelector("logout");
    expect(logoutButton).toBeTruthy();
})


});

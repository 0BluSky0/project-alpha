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

  it("displays a navbar with profile and leaderboard written", () => {
    const navbar = document.querySelector("#navbar");
    expect(navbar).toBeTruthy();
    expect(navbar.innerHTML).toContain("Profile");
    expect(navbar.innerHTML).toContain("Leaderboard");
  });

  it("navbar has profile and leaderboard links", () => {
    const navbar = document.querySelector("#navbar");
    expect(navbar).toBeTruthy();

    const profileLink = document.querySelector("#navbar a[href*='#']");
    expect(profileLink).toBeTruthy();

    const leaderboardLink = document.querySelector(
      "#navbar a[href*='leaderboard']",
    );
    expect(leaderboardLink).toBeTruthy();
  });

  it("has a logout button", () => {
    const logoutButton = document.querySelector("#logout");
    expect(logoutButton).toBeTruthy();
  });

  it("displays a streak",()=> {
    const streak = document.querySelector("#streak")
    expect(streak).toBeTruthy()
  })

  it("displays locked topics grayed out and disabled", () => {
  const lockedTopic = document.querySelector("#topic-3");
  expect(lockedTopic).toBeTruthy();

  const iconContainer = lockedTopic.querySelector(".icon-container");
  expect(iconContainer.style.filter).toBe("grayscale(100%)");
  expect(iconContainer.style.opacity).toBe("0.5");

  const buttons = lockedTopic.querySelectorAll("button");
  buttons.forEach((button) => {
    expect(button.disabled).toBe(true);
    expect(button.style.opacity).toBe("0.5");
    expect(button.style.cursor).toBe("not-allowed");
  });
});

it("displays unlocked topics as active", () => {
  const unlockedTopic = document.querySelector("#topic-1");
  expect(unlockedTopic).toBeTruthy();

  const buttons = unlockedTopic.querySelectorAll("button");
  buttons.forEach((button) => {
    expect(button.disabled).toBe(false);
  });
});
});

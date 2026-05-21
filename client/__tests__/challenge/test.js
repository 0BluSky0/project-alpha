const { renderDOM } = require("./helpers");

let dom;
let document;

describe("challenge/index.html", () => {
  beforeEach(async () => {
    dom = await renderDOM("challenge/index.html", "challenge/index.js");
    document = await dom.window.document;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("has a back button", () => {
    const backButton = document.querySelector("#back");
    expect(backButton).toBeTruthy();
    expect(backButton.textContent).toBe("Back");
  });
  it("has a next question button", () => {
    const nextButton = document.querySelector("#next-btn");
    expect(nextButton).toBeTruthy();
    expect(nextButton.textContent).toBe("Next");
  });
  it("has a previous question button", () => {
    const prevButton = document.querySelector("#prev-btn");
    expect(prevButton).toBeTruthy();
    expect(prevButton.textContent).toBe("Previous");
  });
  it("has a submit button", () => {
    const submitButton = document.querySelector("#submit-btn");
    expect(submitButton).toBeTruthy();
    expect(submitButton.textContent).toContain("Submit");
  });

  it("displays the topic or the word challenge in the title", () => {
    const title = document.querySelector("#topic-title");
    expect(title).toBeTruthy();
    expect(title.textContent).toBe("Challenge");
  });

  it("disables the previous button initially", () => {
    const prevButton = document.querySelector("#prev-btn");
    expect(prevButton).toBeTruthy();
    expect(prevButton.disabled).toBe(true);
  });

  it("enables the next button initially", () => {
    const nextButton = document.querySelector("#next-btn");
    expect(nextButton).toBeTruthy();
    expect(nextButton.disabled).toBe(false);
  });

  it("has a container for the current question", () => {
  const questionContainer = document.querySelector("#current-question-container");
  expect(questionContainer).toBeTruthy();
});

it("loads the canvas-confetti library", () => {
  const confettiScript = document.querySelector('script[src*="canvas-confetti"]');
  expect(confettiScript).toBeTruthy();
});

it("applies the saved theme to the page", () => {

  const localStorageMock = {
    getItem: jest.fn((key) => {
      if (key === "theme") return "dark";
      return null;
    }),
  };
  global.localStorage = localStorageMock;
  dom.window.localStorage = localStorageMock;

  dom.window.setTheme("dark");
  document = dom.window.document;

  const htmlElement = document.documentElement;
  expect(htmlElement.getAttribute("data-theme")).toBe("dark");
});
});

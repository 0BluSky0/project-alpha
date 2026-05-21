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
  })
  it("has a back button",()=>{
    const backButton = document.querySelector("#back")
    expect(backButton).toBeTruthy()
    expect(backButton.textContent).toBe("Back")
  })
  it("has a next question button",()=>{
    const nextButton = document.querySelector("#next-btn")
    expect(nextButton).toBeTruthy()
    expect(nextButton.textContent).toBe("Next")
  })
  it("has a previous question button",()=>{
    const prevButton = document.querySelector("#prev-btn")
    expect(prevButton).toBeTruthy()
    expect(prevButton.textContent).toBe("Previous")
  })
  it("has a submit button",()=>{
    const submitButton = document.querySelector("#submit-btn")
    expect(submitButton).toBeTruthy()
    expect(submitButton.textContent).toBe("Submit")
  })
})
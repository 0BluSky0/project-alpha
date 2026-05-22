
const { renderDOM } = require("../../helpers");

let dom;
let document;

describe("leaderboard/index.html", () => {
  beforeEach(async () => {
    dom = await renderDOM("leaderboard/index.html", "leaderboard/index.js");
    document = await dom.window.document;
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it("has a back button", ()=>{
    const backButton = document.querySelector("#backButton")
    expect(backButton).toBeTruthy()
    expect(backButton.textContent).toBe("Back")
  })

  it("has a heading",()=>{
    const heading = document.querySelector("h1")
    expect(heading).toBeTruthy()
    expect(heading.textContent).toBe("Top Students")
  })

  it("has a leaderboard section", ()=> {
    const leaderboard = document.querySelector("#leaderboardList")
    expect(leaderboard).toBeTruthy()
  })
})
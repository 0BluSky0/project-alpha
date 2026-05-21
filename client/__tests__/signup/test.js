const { renderDOM } = require("./helpers");

let dom;
let document;

describe("signup/index.html", () => {
  beforeEach(async () => {
    dom = await renderDOM("signup/index.html", "signup/index.js");
    document = await dom.window.document;
  });

  afterEach(() => {
    jest.clearAllMocks();
  })
  it("displays a header with an intro message", ()=>{
    const intro = document.querySelector("h1")
    expect(intro).toBeTruthy()
    expect(intro.textContent).toBe("Let's set up your account!")
  })
  it("has a username input field",()=>{
    const username = document.querySelector("#username")
    expect(username).toBeTruthy()
    expect(username.type).toBe("text")
  })
  it("has a password input field",()=>{
    const password = document.querySelector("#password")
    expect(password).toBeTruthy()
    expect(password.type).toBe("password")
  })
  it("has an email input field",()=>{
    const email = document.querySelector("#email")
    expect(email).toBeTruthy()
    expect(email.type).toBe("text")
  })
})
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
    expect(email.type).toBe("email")
  })
  it("shows the login button", ()=>{
    const loginButton = document.querySelector("#login-btn")
    expect(loginButton).toBeTruthy()
    expect(loginButton.textContent).toBe("Log in")
  })
  it("displays theme options", ()=>{
    const options = document.querySelector(".colour-options")
    const theme = document.querySelector(".colour-options button")
    expect(options).toBeTruthy()
    expect(theme).toBeTruthy()
  })
  
  it("displays light button",()=>{
    const light = document.querySelector("#light-btn")
    expect(light).toBeTruthy()
    expect(light.textContent).toBe("Light")
  })
  it("displays dark button",()=>{
    const dark = document.querySelector("#dark-btn")
    expect(dark).toBeTruthy()
    expect(dark.textContent).toBe("Dark")
  })
  it("displays ocean button",()=>{
    const ocean = document.querySelector("#ocean-btn")
    expect(ocean).toBeTruthy()
    expect(ocean.textContent).toBe("Ocean")
  })
  it("displays forest button",()=>{
    const forest = document.querySelector("#forest-btn")
    expect(forest).toBeTruthy()
    expect(forest.textContent).toBe("Forest")
  })
  it("displays sunset button",()=>{
    const sunset = document.querySelector("#sunset-btn")
    expect(sunset).toBeTruthy()
    expect(sunset.textContent).toBe("Sunset")
  })
  it("displays finish button",()=>{
    const finish = document.querySelector("#finish-btn")
    expect(finish).toBeTruthy()
    expect(finish.textContent).toBe("Finish!")
  })
})
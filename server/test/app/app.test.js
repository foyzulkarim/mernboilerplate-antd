const app = require("../../src/app");

it("App Environment", () => {
  expect(app.settings.env).toEqual("test");
});

it("App Base Path", () => {
  expect(app.mountpath).toEqual("/");
});

const app = require("../../src/app");

test("App Environment", () => {
  expect(app.settings.env).toEqual("test");
});

test("App Base Path", () => {
  expect(app.mountpath).toEqual("/");
});

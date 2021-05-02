const { returnAOne } = require("../sample");

describe("This will test our returnAOne function", () => {
  it("returnAOne returns a one", () => {
    expect(returnAOne()).toEqual(1);
  });
});

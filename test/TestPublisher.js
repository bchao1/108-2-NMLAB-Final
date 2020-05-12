const Publisher = artifacts.require("./Publisher.sol");

contract("Publisher", accounts => {
  it("UploadTest", async () => {
    const instance = await Publisher.deployed();

  });
});

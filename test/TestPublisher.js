const Publisher = artifacts.require("./Publisher.sol");

contract("Publisher", accounts => {
  it("Test Upload and GetMyUpload", async () => {
    const instance = await Publisher.deployed();
    var status = await instance.Upload([
      "filename.txt",
      "main_hash",
      "preview_hash",
      100,
      accounts[0],
    ]);

    var myUpload = await instance.GetMyUpload.call();
    assert(myUpload.length == 1, "Not Uploaded");
  });
  
  it("Test BuyBook and GetMyCollect", async () => {
    const instance = await Publisher.deployed();
    await instance.Upload([
      "filename.txt",
      "main_hash",
      "preview_hash",
      100,
      accounts[0],
    ]);
  }) 

  it("Test GetRandom", async () => {
    const instance = await Publisher.deployed();
    const num = 10;
    for (let i = 0; i < num * 3; i++) {
      await instance.Upload([
        `filename_${i}.txt`,
        `main_hash_${i}`,
        `preview_hash_${i}`,
        i + 100,
        accounts[0],
      ]);
    }

    var rand = await instance.GetRandom.call(num);
    assert(rand.length === num, `Should return ${num} items.`);
    // TODO
  })
});

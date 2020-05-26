const Publisher = artifacts.require("./Publisher.sol");

contract("Publisher", accounts => {
  it("Test Upload and GetMyUpload", async () => {
    const instance = await Publisher.deployed();
    var status = await instance.Upload([
      "filename.txt",
      "main_hash",
      "preview_hash",
      100,
      "author",
    ]);

    var myUpload = await instance.GetMyUpload.call();
    console.log(myUpload);
    assert(myUpload.indexOf("main_hash") !== -1, "Not Uploaded");
  });

  it("Test GetRandom", async () => {
    const instance = await Publisher.deployed();
    const num = 10;
    for (let i = 0; i < num * 3; i++) {
      await instance.Upload([
        `filename_${i}.txt`,
        `main_hash_${i}`,
        `preview_hash_${i}`,
        i + 100,
        `author_${i}`,
      ]);
    }

    var rand = await instance.GetRandom.call(num);
    assert(rand.length === num, `Should return ${num} items.`);
    // TODO
  })
});
